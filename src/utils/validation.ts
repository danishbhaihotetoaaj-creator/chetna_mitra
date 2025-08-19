import { z } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
}

export function validateRequest<T>(schema: z.ZodSchema<T>, data: any): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error
      };
    }
    
    return {
      success: false,
      errors: new z.ZodError([
        {
          code: 'custom',
          path: [],
          message: 'Validation failed'
        }
      ])
    };
  }
}

export function validatePartial<T>(schema: z.ZodSchema<T>, data: any): ValidationResult<T> {
  try {
    const validatedData = schema.partial().parse(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error
      };
    }
    
    return {
      success: false,
      errors: new z.ZodError([
        {
          code: 'custom',
          path: [],
          message: 'Partial validation failed'
        }
      ])
    };
  }
}

// Common validation schemas
export const commonSchemas = {
  id: z.string().cuid(),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  }),
  url: z.string().url(),
  uuid: z.string().uuid(),
  date: z.string().datetime(),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, {
    message: 'Invalid phone number format'
  }),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
  }),
  search: z.object({
    query: z.string().min(1),
    filters: z.record(z.any()).optional(),
    ...commonSchemas.pagination.shape
  })
};

// Sanitization functions
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

// Rate limiting validation
export const rateLimitSchema = z.object({
  windowMs: z.number().int().min(1000).max(3600000), // 1 second to 1 hour
  maxRequests: z.number().int().min(1).max(10000),
  skipSuccessfulRequests: z.boolean().default(false),
  skipFailedRequests: z.boolean().default(false)
});

// AI request validation
export const aiRequestSchema = z.object({
  model: z.string().min(1),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(10000)
  })).min(1).max(100),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().int().min(1).max(4000).optional(),
  stream: z.boolean().optional(),
  stop: z.array(z.string()).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional()
});

// Document validation
export const documentSchema = z.object({
  title: z.string().min(1).max(255),
  fileName: z.string().min(1).max(255),
  fileType: z.string().min(1).max(50),
  fileSize: z.number().int().min(1).max(100 * 1024 * 1024), // 100MB max
  metadata: z.record(z.any()).optional()
});

// User validation
export const userSchema = z.object({
  email: commonSchemas.email,
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: z.enum(['USER', 'MODERATOR', 'ADMIN', 'ENTERPRISE']).default('USER'),
  isActive: z.boolean().default(true)
});

// Conversation validation
export const conversationSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.record(z.any()),
  isPublic: z.boolean().default(false),
  isArchived: z.boolean().default(false)
});

// Message validation
export const messageSchema = z.object({
  content: z.string().min(1).max(10000),
  role: z.enum(['user', 'assistant', 'system']),
  metadata: z.record(z.any()).optional()
});

// Subscription validation
export const subscriptionSchema = z.object({
  planType: z.enum(['FREE', 'BASIC', 'PRO', 'ENTERPRISE']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELLED', 'PAST_DUE']).default('ACTIVE'),
  stripeId: z.string().optional(),
  currentPeriodStart: z.date().optional(),
  currentPeriodEnd: z.date().optional(),
  cancelAtPeriodEnd: z.boolean().default(false)
});

// API key validation
export const apiKeySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.record(z.boolean()),
  isActive: z.boolean().default(true)
});

// Community post validation
export const communityPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(10000),
  tags: z.array(z.string().min(1).max(50)).max(10),
  isPublished: z.boolean().default(true),
  isModerated: z.boolean().default(false)
});

// Notification validation
export const notificationSchema = z.object({
  type: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS']),
  title: z.string().min(1).max(255),
  message: z.string().min(1).max(1000),
  metadata: z.record(z.any()).optional()
});

// Export all schemas
export const schemas = {
  common: commonSchemas,
  aiRequest: aiRequestSchema,
  document: documentSchema,
  user: userSchema,
  conversation: conversationSchema,
  message: messageSchema,
  subscription: subscriptionSchema,
  apiKey: apiKeySchema,
  communityPost: communityPostSchema,
  notification: notificationSchema,
  rateLimit: rateLimitSchema
};