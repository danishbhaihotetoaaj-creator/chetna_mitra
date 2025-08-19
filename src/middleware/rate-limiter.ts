import { NextRequest } from 'next/server';
import { getRedisClient } from '@/config/redis';
import { prisma } from '@/config/database';

export interface RateLimitResult {
  success: boolean;
  headers: Record<string, string>;
  remaining: number;
  resetTime: number;
}

export class RateLimiter {
  private redis = getRedisClient();
  private readonly windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes
  private readonly maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');

  async check(request: NextRequest): Promise<RateLimitResult> {
    const ip = this.getClientIP(request);
    const userId = this.getUserId(request);
    
    const key = `rate_limit:${userId || ip}`;
    const now = Date.now();
    const windowStart = now - this.windowMs;

    try {
      // Get current count and reset time
      const [currentCount, resetTime] = await Promise.all([
        this.redis.get(key),
        this.redis.ttl(key)
      ]);

      const count = currentCount ? parseInt(currentCount) : 0;
      const remaining = Math.max(0, this.maxRequests - count);
      const resetTimeMs = resetTime > 0 ? (now + (resetTime * 1000)) : (now + this.windowMs);

      // Check if rate limit exceeded
      if (count >= this.maxRequests) {
        return {
          success: false,
          headers: {
            'X-RateLimit-Limit': this.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTimeMs.toString(),
            'Retry-After': Math.ceil(resetTime / 1000).toString()
          },
          remaining: 0,
          resetTime: resetTimeMs
        };
      }

      // Increment counter
      await this.redis.multi()
        .incr(key)
        .expire(key, Math.floor(this.windowMs / 1000))
        .exec();

      // Log rate limit usage
      await this.logRateLimitUsage(userId, ip, request.url);

      return {
        success: true,
        headers: {
          'X-RateLimit-Limit': this.maxRequests.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': resetTimeMs.toString()
        },
        remaining: remaining - 1,
        resetTime: resetTimeMs
      };

    } catch (error) {
      console.error('Rate limiting error:', error);
      // On Redis error, allow request but log the issue
      return {
        success: true,
        headers: {},
        remaining: this.maxRequests,
        resetTime: now + this.windowMs
      };
    }
  }

  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    if (forwarded) return forwarded.split(',')[0].trim();
    
    return 'unknown';
  }

  private getUserId(request: NextRequest): string | null {
    // Extract user ID from headers or cookies
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // You might want to decode JWT here to get user ID
      return null;
    }
    
    return null;
  }

  private async logRateLimitUsage(userId: string | null, ip: string, endpoint: string) {
    try {
      await prisma.rateLimit.create({
        data: {
          userId,
          ipAddress: ip,
          endpoint,
          count: 1,
          windowStart: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to log rate limit usage:', error);
    }
  }

  async getRateLimitInfo(userId?: string, ip?: string): Promise<any> {
    const key = `rate_limit:${userId || ip}`;
    
    try {
      const [count, ttl] = await Promise.all([
        this.redis.get(key),
        this.redis.ttl(key)
      ]);

      return {
        currentCount: count ? parseInt(count) : 0,
        maxRequests: this.maxRequests,
        remaining: Math.max(0, this.maxRequests - (count ? parseInt(count) : 0)),
        resetTime: ttl > 0 ? Date.now() + (ttl * 1000) : Date.now() + this.windowMs,
        windowMs: this.windowMs
      };
    } catch (error) {
      console.error('Failed to get rate limit info:', error);
      return null;
    }
  }

  async resetRateLimit(userId?: string, ip?: string): Promise<boolean> {
    const key = `rate_limit:${userId || ip}`;
    
    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      console.error('Failed to reset rate limit:', error);
      return false;
    }
  }
}

export const rateLimiter = new RateLimiter();