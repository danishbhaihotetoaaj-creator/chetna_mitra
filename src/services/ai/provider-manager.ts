import { prisma } from '@/config/database';
import { getRedisClient } from '@/config/redis';
import { AIProvider, HealthStatus, RequestStatus } from '@prisma/client';
import OpenAI from 'openai';
import axios from 'axios';
import { performance } from 'perf_hooks';

export interface AIProviderConfig {
  id: string;
  name: string;
  type: string;
  apiKey: string;
  baseUrl?: string;
  priority: number;
  region?: string;
  costPerToken: number;
  rateLimit: number;
}

export interface AIRequest {
  model: string;
  messages: any[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface AIResponse {
  content: string;
  tokensUsed: number;
  cost: number;
  latency: number;
  provider: string;
}

export class AIProviderManager {
  private providers: Map<string, AIProviderConfig> = new Map();
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private redis = getRedisClient();

  constructor() {
    this.initializeProviders();
    this.startHealthChecks();
  }

  private async initializeProviders() {
    try {
      const dbProviders = await prisma.aIProvider.findMany({
        where: { isActive: true },
        orderBy: { priority: 'asc' }
      });

      for (const provider of dbProviders) {
        this.providers.set(provider.id, {
          id: provider.id,
          name: provider.name,
          type: provider.type,
          apiKey: provider.apiKey,
          baseUrl: provider.baseUrl || undefined,
          priority: provider.priority,
          region: provider.region || undefined,
          costPerToken: provider.costPerToken || 0,
          rateLimit: provider.rateLimit || 1000
        });
      }

      console.log(`✅ Initialized ${this.providers.size} AI providers`);
    } catch (error) {
      console.error('❌ Failed to initialize AI providers:', error);
    }
  }

  private startHealthChecks() {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthChecks();
    }, 60000); // Check every minute
  }

  private async performHealthChecks() {
    const healthChecks = Array.from(this.providers.values()).map(async (provider) => {
      try {
        const startTime = performance.now();
        const isHealthy = await this.checkProviderHealth(provider);
        const latency = performance.now() - startTime;

        await this.updateProviderHealth(provider.id, isHealthy ? 'HEALTHY' : 'UNHEALTHY', latency);

        if (!isHealthy) {
          console.warn(`⚠️ Provider ${provider.name} is unhealthy`);
        }
      } catch (error) {
        console.error(`❌ Health check failed for ${provider.name}:`, error);
        await this.updateProviderHealth(provider.id, 'OFFLINE', 0);
      }
    });

    await Promise.allSettled(healthChecks);
  }

  private async checkProviderHealth(provider: AIProviderConfig): Promise<boolean> {
    try {
      switch (provider.type) {
        case 'OPENAI':
          const openai = new OpenAI({ apiKey: provider.apiKey });
          await openai.models.list();
          return true;

        case 'OPENROUTER':
          const response = await axios.get('https://openrouter.ai/api/v1/models', {
            headers: { Authorization: `Bearer ${provider.apiKey}` },
            timeout: 5000
          });
          return response.status === 200;

        case 'A4F':
          const a4fResponse = await axios.get('https://api.a4f.co/v1/models', {
            headers: { Authorization: `Bearer ${provider.apiKey}` },
            timeout: 5000
          });
          return a4fResponse.status === 200;

        default:
          return true;
      }
    } catch (error) {
      return false;
    }
  }

  private async updateProviderHealth(providerId: string, status: HealthStatus, latency: number) {
    try {
      await prisma.aIProvider.update({
        where: { id: providerId },
        data: {
          healthStatus: status,
          lastHealthCheck: new Date()
        }
      });
    } catch (error) {
      console.error('❌ Failed to update provider health:', error);
    }
  }

  public async selectProvider(request: AIRequest, userId?: string): Promise<AIProviderConfig> {
    const availableProviders = Array.from(this.providers.values())
      .filter(provider => provider.healthStatus !== 'OFFLINE')
      .sort((a, b) => {
        // Priority-based sorting with health status consideration
        if (a.healthStatus === 'HEALTHY' && b.healthStatus !== 'HEALTHY') return -1;
        if (b.healthStatus === 'HEALTHY' && a.healthStatus !== 'HEALTHY') return 1;
        return a.priority - b.priority;
      });

    if (availableProviders.length === 0) {
      throw new Error('No healthy AI providers available');
    }

    // Check rate limits
    const rateLimitedProviders = await this.checkRateLimits(availableProviders, userId);
    const eligibleProviders = availableProviders.filter(p => !rateLimitedProviders.includes(p.id));

    if (eligibleProviders.length === 0) {
      throw new Error('All providers are rate limited');
    }

    // Select provider based on cost, latency, and availability
    return this.selectOptimalProvider(eligibleProviders, request);
  }

  private async checkRateLimits(providers: AIProviderConfig[], userId?: string): Promise<string[]> {
    const rateLimited: string[] = [];

    for (const provider of providers) {
      const key = `rate_limit:${provider.id}:${userId || 'anonymous'}`;
      const currentCount = await this.redis.get(key);
      
      if (currentCount && parseInt(currentCount) >= provider.rateLimit) {
        rateLimited.push(provider.id);
      }
    }

    return rateLimited;
  }

  private selectOptimalProvider(providers: AIProviderConfig[], request: AIRequest): AIProviderConfig {
    // Simple selection logic - can be enhanced with ML-based optimization
    return providers[0];
  }

  public async makeRequest(request: AIRequest, userId?: string): Promise<AIResponse> {
    const provider = await this.selectProvider(request, userId);
    const startTime = performance.now();

    try {
      const response = await this.executeRequest(provider, request);
      const latency = performance.now() - startTime;

      // Log the request
      await this.logAIRequest(provider.id, request, response, latency, userId);

      // Update rate limit
      await this.updateRateLimit(provider.id, userId);

      return {
        content: response.content,
        tokensUsed: response.tokensUsed || 0,
        cost: this.calculateCost(provider, response.tokensUsed || 0),
        latency,
        provider: provider.name
      };
    } catch (error) {
      // Log failed request
      await this.logAIRequest(provider.id, request, null, performance.now() - startTime, userId, error as Error);

      // Try fallback provider if available
      return this.handleFallback(request, userId, error as Error);
    }
  }

  private async executeRequest(provider: AIProviderConfig, request: AIRequest): Promise<any> {
    switch (provider.type) {
      case 'OPENAI':
        const openai = new OpenAI({ apiKey: provider.apiKey });
        const completion = await openai.chat.completions.create({
          model: request.model,
          messages: request.messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          stream: request.stream
        });
        return {
          content: completion.choices[0]?.message?.content || '',
          tokensUsed: completion.usage?.total_tokens || 0
        };

      case 'OPENROUTER':
        const openrouterResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: request.model,
          messages: request.messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          stream: request.stream
        }, {
          headers: { Authorization: `Bearer ${provider.apiKey}` }
        });
        return {
          content: openrouterResponse.data.choices[0]?.message?.content || '',
          tokensUsed: openrouterResponse.data.usage?.total_tokens || 0
        };

      case 'A4F':
        const a4fResponse = await axios.post('https://api.a4f.co/v1/chat/completions', {
          model: request.model,
          messages: request.messages,
          temperature: request.temperature,
          max_tokens: request.maxTokens,
          stream: request.stream
        }, {
          headers: { Authorization: `Bearer ${provider.apiKey}` }
        });
        return {
          content: a4fResponse.data.choices[0]?.message?.content || '',
          tokensUsed: a4fResponse.data.usage?.total_tokens || 0
        };

      default:
        throw new Error(`Unsupported provider type: ${provider.type}`);
    }
  }

  private async handleFallback(request: AIRequest, userId?: string, originalError?: Error): Promise<AIResponse> {
    const fallbackProviders = Array.from(this.providers.values())
      .filter(p => p.id !== request.providerId && p.healthStatus === 'HEALTHY');

    if (fallbackProviders.length === 0) {
      throw new Error(`All providers failed. Original error: ${originalError?.message}`);
    }

    console.log(`🔄 Attempting fallback with ${fallbackProviders[0].name}`);
    return this.makeRequest(request, userId);
  }

  private calculateCost(provider: AIProviderConfig, tokensUsed: number): number {
    return (tokensUsed / 1000) * provider.costPerToken;
  }

  private async logAIRequest(
    providerId: string,
    request: AIRequest,
    response: any,
    latency: number,
    userId?: string,
    error?: Error
  ) {
    try {
      await prisma.aIRequest.create({
        data: {
          providerId,
          userId,
          endpoint: 'chat/completions',
          requestData: request,
          responseData: response,
          status: error ? 'FAILED' : 'COMPLETED',
          latency: Math.round(latency),
          tokensUsed: response?.tokensUsed || 0,
          cost: response ? this.calculateCost(this.providers.get(providerId)!, response.tokensUsed || 0) : 0,
          error: error?.message
        }
      });
    } catch (logError) {
      console.error('❌ Failed to log AI request:', logError);
    }
  }

  private async updateRateLimit(providerId: string, userId?: string) {
    const key = `rate_limit:${providerId}:${userId || 'anonymous'}`;
    const windowMs = 15 * 60 * 1000; // 15 minutes

    await this.redis.multi()
      .incr(key)
      .expire(key, Math.floor(windowMs / 1000))
      .exec();
  }

  public async getProviderStats(): Promise<any> {
    const stats = await prisma.aIRequest.groupBy({
      by: ['providerId', 'status'],
      _count: { id: true },
      _sum: { latency: true, tokensUsed: true, cost: true }
    });

    return stats;
  }

  public stop() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }
}

export const aiProviderManager = new AIProviderManager();