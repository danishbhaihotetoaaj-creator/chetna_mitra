import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
import webpush from 'web-push';
import twilio from 'twilio';
import { NotificationType } from '@prisma/client';

export interface NotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: Record<string, any>;
  channels?: NotificationChannel[];
  priority?: 'low' | 'normal' | 'high';
  scheduledAt?: Date;
}

export interface NotificationChannel {
  type: 'email' | 'push' | 'sms' | 'in_app';
  config?: Record<string, any>;
}

export interface NotificationTemplate {
  id: string;
  subject?: string;
  title: string;
  message: string;
  emailTemplate?: string;
  pushTemplate?: string;
  smsTemplate?: string;
}

export class NotificationService {
  private emailTransporter: nodemailer.Transporter;
  private firebaseApp: admin.app.App;
  private twilioClient: twilio.Twilio;
  private webpushVapidKeys: webpush.VapidKeys;

  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    // Initialize email service
    this.emailTransporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Initialize Firebase
    if (process.env.FIREBASE_PROJECT_ID) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      });
    }

    // Initialize Twilio
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    // Initialize WebPush
    this.webpushVapidKeys = webpush.generateVAPIDKeys();
  }

  async sendNotification(data: NotificationData): Promise<boolean> {
    try {
      logger.info('Sending notification', { userId: data.userId, type: data.type });

      // Store notification in database
      const notification = await this.storeNotification(data);

      // Send through specified channels or default channels
      const channels = data.channels || this.getDefaultChannels(data.type);
      const results = await Promise.allSettled(
        channels.map(channel => this.sendThroughChannel(channel, data, notification.id))
      );

      // Log results
      const successCount = results.filter(r => r.status === 'fulfilled').length;
      logger.info('Notification sent', {
        notificationId: notification.id,
        successCount,
        totalChannels: channels.length
      });

      return successCount > 0;
    } catch (error) {
      logger.error('Failed to send notification', {
        userId: data.userId,
        type: data.type,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  private async storeNotification(data: NotificationData) {
    return await prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        metadata: data.metadata || {},
        createdAt: data.scheduledAt || new Date()
      }
    });
  }

  private getDefaultChannels(type: NotificationType): NotificationChannel[] {
    switch (type) {
      case 'INFO':
        return [{ type: 'in_app' }, { type: 'email' }];
      case 'WARNING':
        return [{ type: 'in_app' }, { type: 'email' }, { type: 'push' }];
      case 'ERROR':
        return [{ type: 'in_app' }, { type: 'email' }, { type: 'push' }, { type: 'sms' }];
      case 'SUCCESS':
        return [{ type: 'in_app' }, { type: 'email' }];
      default:
        return [{ type: 'in_app' }];
    }
  }

  private async sendThroughChannel(
    channel: NotificationChannel,
    data: NotificationData,
    notificationId: string
  ): Promise<boolean> {
    try {
      switch (channel.type) {
        case 'email':
          return await this.sendEmail(data, channel.config);
        case 'push':
          return await this.sendPushNotification(data, channel.config);
        case 'sms':
          return await this.sendSMS(data, channel.config);
        case 'in_app':
          return true; // Already stored in database
        default:
          logger.warn('Unknown notification channel', { channel: channel.type });
          return false;
      }
    } catch (error) {
      logger.error('Failed to send through channel', {
        channel: channel.type,
        notificationId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  private async sendEmail(data: NotificationData, config?: Record<string, any>): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: data.userId },
        select: { email: true, firstName: true, lastName: true }
      });

      if (!user?.email) {
        logger.warn('User email not found', { userId: data.userId });
        return false;
      }

      const emailContent = this.generateEmailContent(data, user);
      
      await this.emailTransporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text
      });

      logger.info('Email notification sent', { userId: data.userId, email: user.email });
      return true;
    } catch (error) {
      logger.error('Failed to send email notification', {
        userId: data.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  private generateEmailContent(data: NotificationData, user: any) {
    const template = this.getEmailTemplate(data.type);
    
    return {
      subject: template.subject || data.title,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 5px; }
            .content { padding: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${data.title}</h2>
            </div>
            <div class="content">
              <p>Hello ${user.firstName || 'there'},</p>
              <p>${data.message}</p>
              ${data.metadata?.actionUrl ? `<p><a href="${data.metadata.actionUrl}">Take Action</a></p>` : ''}
            </div>
            <div class="footer">
              <p>This is an automated notification from AI Microservices Platform</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hello ${user.firstName || 'there'},\n\n${data.message}\n\n${data.metadata?.actionUrl ? `Take Action: ${data.metadata.actionUrl}` : ''}`
    };
  }

  private getEmailTemplate(type: NotificationType) {
    const templates: Record<NotificationType, { subject: string }> = {
      INFO: { subject: 'Information Update' },
      WARNING: { subject: 'Important Notice' },
      ERROR: { subject: 'Action Required' },
      SUCCESS: { subject: 'Success Notification' }
    };
    
    return templates[type] || { subject: 'Notification' };
  }

  private async sendPushNotification(data: NotificationData, config?: Record<string, any>): Promise<boolean> {
    try {
      if (!this.firebaseApp) {
        logger.warn('Firebase not configured for push notifications');
        return false;
      }

      // Get user's FCM token from database or config
      const fcmToken = config?.fcmToken || await this.getUserFCMToken(data.userId);
      
      if (!fcmToken) {
        logger.warn('FCM token not found for user', { userId: data.userId });
        return false;
      }

      const message = {
        notification: {
          title: data.title,
          body: data.message
        },
        data: {
          notificationId: data.metadata?.notificationId || '',
          type: data.type,
          actionUrl: data.metadata?.actionUrl || '',
          ...data.metadata
        },
        token: fcmToken,
        priority: data.priority === 'high' ? 'high' : 'normal'
      };

      const response = await this.firebaseApp.messaging().send(message);
      
      logger.info('Push notification sent', { userId: data.userId, messageId: response });
      return true;
    } catch (error) {
      logger.error('Failed to send push notification', {
        userId: data.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  private async getUserFCMToken(userId: string): Promise<string | null> {
    // In a real implementation, you'd store FCM tokens in the database
    // For now, return null
    return null;
  }

  private async sendSMS(data: NotificationData, config?: Record<string, any>): Promise<boolean> {
    try {
      if (!this.twilioClient) {
        logger.warn('Twilio not configured for SMS notifications');
        return false;
      }

      const phoneNumber = config?.phoneNumber || await this.getUserPhoneNumber(data.userId);
      
      if (!phoneNumber) {
        logger.warn('Phone number not found for user', { userId: data.userId });
        return false;
      }

      const message = await this.twilioClient.messages.create({
        body: `${data.title}: ${data.message}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      logger.info('SMS notification sent', { userId: data.userId, messageId: message.sid });
      return true;
    } catch (error) {
      logger.error('Failed to send SMS notification', {
        userId: data.userId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  private async getUserPhoneNumber(userId: string): Promise<string | null> {
    // In a real implementation, you'd store phone numbers in the database
    // For now, return null
    return null;
  }

  async getNotifications(userId: string, limit: number = 20, offset: number = 0) {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      });

      return notifications;
    } catch (error) {
      logger.error('Failed to fetch notifications', { userId, error });
      return [];
    }
  }

  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    try {
      await prisma.notification.update({
        where: { id: notificationId, userId },
        data: { isRead: true }
      });

      return true;
    } catch (error) {
      logger.error('Failed to mark notification as read', { notificationId, userId, error });
      return false;
    }
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    try {
      await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true }
      });

      return true;
    } catch (error) {
      logger.error('Failed to mark all notifications as read', { userId, error });
      return false;
    }
  }

  async deleteNotification(notificationId: string, userId: string): Promise<boolean> {
    try {
      await prisma.notification.delete({
        where: { id: notificationId, userId }
      });

      return true;
    } catch (error) {
      logger.error('Failed to delete notification', { notificationId, userId, error });
      return false;
    }
  }

  async getUnreadCount(userId: string): Promise<number> {
    try {
      const count = await prisma.notification.count({
        where: { userId, isRead: false }
      });

      return count;
    } catch (error) {
      logger.error('Failed to get unread count', { userId, error });
      return 0;
    }
  }

  async sendBulkNotifications(
    userIds: string[],
    data: Omit<NotificationData, 'userId'>
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    const promises = userIds.map(async (userId) => {
      try {
        const result = await this.sendNotification({
          ...data,
          userId
        });
        
        if (result) {
          success++;
        } else {
          failed++;
        }
      } catch (error) {
        failed++;
        logger.error('Bulk notification failed for user', { userId, error });
      }
    });

    await Promise.all(promises);

    logger.info('Bulk notifications completed', { success, failed, total: userIds.length });

    return { success, failed };
  }

  // WebPush subscription management
  async subscribeToPushNotifications(userId: string, subscription: any): Promise<boolean> {
    try {
      // Store subscription in database
      // This is a simplified implementation
      logger.info('User subscribed to push notifications', { userId });
      return true;
    } catch (error) {
      logger.error('Failed to subscribe to push notifications', { userId, error });
      return false;
    }
  }

  async unsubscribeFromPushNotifications(userId: string): Promise<boolean> {
    try {
      // Remove subscription from database
      logger.info('User unsubscribed from push notifications', { userId });
      return true;
    } catch (error) {
      logger.error('Failed to unsubscribe from push notifications', { userId, error });
      return false;
    }
  }

  // Get VAPID keys for WebPush
  getVapidKeys() {
    return {
      publicKey: this.webpushVapidKeys.publicKey,
      privateKey: this.webpushVapidKeys.privateKey
    };
  }
}

export const notificationService = new NotificationService();