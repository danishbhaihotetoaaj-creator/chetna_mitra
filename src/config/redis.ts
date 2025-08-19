import { Redis } from 'ioredis';

let redis: Redis;

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      connectTimeout: 10000,
      commandTimeout: 5000,
      retryDelayOnClusterDown: 300,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      connectTimeout: 10000,
      commandTimeout: 5000,
      retryDelayOnClusterDown: 300,
    });

    redis.on('error', (error) => {
      console.error('❌ Redis connection error:', error);
    });

    redis.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redis.on('ready', () => {
      console.log('✅ Redis ready for commands');
    });

    redis.on('close', () => {
      console.log('⚠️ Redis connection closed');
    });

    redis.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });
  }

  return redis;
}

export async function testRedisConnection(): Promise<boolean> {
  try {
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    console.error('❌ Redis connection test failed:', error);
    return false;
  }
}

export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    console.log('✅ Redis connection closed');
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeRedisConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeRedisConnection();
  process.exit(0);
});