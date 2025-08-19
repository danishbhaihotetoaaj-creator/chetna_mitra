import winston from 'winston';
import * as Sentry from '@sentry/node';

// Initialize Sentry
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express(),
    ],
  });
}

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'ai-microservices-platform' },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // File transport for production
    ...(process.env.NODE_ENV === 'production' ? [
      new winston.transports.File({ 
        filename: 'logs/error.log', 
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5
      }),
      new winston.transports.File({ 
        filename: 'logs/combined.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5
      })
    ] : [])
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

// Add Sentry transport for error logging
if (process.env.SENTRY_DSN) {
  logger.add(new winston.transports.Stream({
    stream: {
      write: (message: string) => {
        try {
          const logData = JSON.parse(message);
          if (logData.level === 'error') {
            Sentry.captureException(new Error(logData.message), {
              extra: logData,
              tags: {
                level: logData.level,
                service: logData.service
              }
            });
          }
        } catch (error) {
          // If parsing fails, just send the raw message
          Sentry.captureMessage(message, 'error');
        }
      }
    }
  }));
}

// Log levels
export const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Custom logging methods
export const customLogger = {
  info: (message: string, meta?: any) => {
    logger.info(message, meta);
  },

  error: (message: string, meta?: any) => {
    logger.error(message, meta);
    
    // Send to Sentry if available
    if (process.env.SENTRY_DSN && meta?.error) {
      Sentry.captureException(meta.error, {
        extra: meta,
        tags: {
          level: 'error',
          service: 'ai-microservices-platform'
        }
      });
    }
  },

  warn: (message: string, meta?: any) => {
    logger.warn(message, meta);
  },

  debug: (message: string, meta?: any) => {
    logger.debug(message, meta);
  },

  http: (message: string, meta?: any) => {
    logger.http(message, meta);
  },

  // Performance logging
  performance: (operation: string, duration: number, meta?: any) => {
    logger.info(`Performance: ${operation}`, {
      ...meta,
      operation,
      duration,
      unit: 'ms'
    });
  },

  // Security logging
  security: (event: string, meta?: any) => {
    logger.warn(`Security: ${event}`, {
      ...meta,
      event,
      timestamp: new Date().toISOString(),
      level: 'security'
    });
  },

  // Audit logging
  audit: (action: string, userId: string, resource: string, meta?: any) => {
    logger.info(`Audit: ${action}`, {
      ...meta,
      action,
      userId,
      resource,
      timestamp: new Date().toISOString(),
      level: 'audit'
    });
  },

  // Business logic logging
  business: (event: string, meta?: any) => {
    logger.info(`Business: ${event}`, {
      ...meta,
      event,
      timestamp: new Date().toISOString(),
      level: 'business'
    });
  }
};

// Request logging middleware
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user?.id
    };

    if (res.statusCode >= 400) {
      customLogger.error('HTTP Request Error', logData);
    } else {
      customLogger.http('HTTP Request', logData);
    }

    // Log performance metrics
    customLogger.performance(`${req.method} ${req.url}`, duration, logData);
  });

  next();
};

// Error logging middleware
export const errorLogger = (error: Error, req: any, res: any, next: any) => {
  const logData = {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
    userId: req.user?.id
  };

  customLogger.error('Unhandled Error', logData);

  // Send to Sentry
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error, {
      req,
      extra: logData
    });
  }

  next(error);
};

// Export the main logger and custom methods
export { logger };
export default customLogger;