import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { aiProviderManager } from '@/services/ai/provider-manager';
import { rateLimiter } from '@/middleware/rate-limiter';
import { logger } from '@/utils/logger';
import { validateRequest } from '@/utils/validation';
import { z } from 'zod';

const chatRequestSchema = z.object({
  model: z.string().min(1),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1)
  })).min(1),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(1).max(4000).optional(),
  stream: z.boolean().optional()
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiter.check(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      );
    }

    // Authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validationResult = validateRequest(chatRequestSchema, body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.errors },
        { status: 400 }
      );
    }

    const { model, messages, temperature, maxTokens, stream } = validationResult.data;

    // Log the request
    logger.info('AI chat request', {
      userId,
      model,
      messageCount: messages.length,
      stream
    });

    // Make AI request
    const aiResponse = await aiProviderManager.makeRequest({
      model,
      messages,
      temperature,
      maxTokens,
      stream
    }, userId);

    // Log successful response
    logger.info('AI chat response', {
      userId,
      model,
      provider: aiResponse.provider,
      tokensUsed: aiResponse.tokensUsed,
      cost: aiResponse.cost,
      latency: aiResponse.latency
    });

    // Return response
    return NextResponse.json({
      success: true,
      data: {
        content: aiResponse.content,
        provider: aiResponse.provider,
        usage: {
          tokensUsed: aiResponse.tokensUsed,
          cost: aiResponse.cost
        },
        performance: {
          latency: aiResponse.latency
        }
      }
    });

  } catch (error) {
    logger.error('AI chat error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}