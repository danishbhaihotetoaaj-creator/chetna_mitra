'use client';

import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const { isSignedIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      title: 'AI Chat & Completions',
      description: 'Multi-provider AI routing with intelligent load balancing and failover',
      icon: '🤖',
      href: '/chat',
      color: 'bg-blue-500'
    },
    {
      title: 'Document Processing',
      description: 'Upload and process PDFs, DOCX, Excel files with AI-powered analysis',
      icon: '📄',
      href: '/documents',
      color: 'bg-green-500'
    },
    {
      title: 'Conversation Management',
      description: 'Organize and search through your AI conversations with semantic search',
      icon: '💬',
      href: '/conversations',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Monitor AI usage, costs, and performance metrics in real-time',
      icon: '📊',
      href: '/analytics',
      color: 'bg-orange-500'
    },
    {
      title: 'Community & Sharing',
      description: 'Share conversations and collaborate with other users',
      icon: '👥',
      href: '/community',
      color: 'bg-pink-500'
    },
    {
      title: 'API Management',
      description: 'Manage API keys and monitor usage for integrations',
      icon: '🔑',
      href: '/api-keys',
      color: 'bg-indigo-500'
    }
  ];

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              AI Microservices Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enterprise-grade AI platform with intelligent routing, document processing, and advanced analytics
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 mx-auto`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔌 Multi-Provider AI Routing</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• OpenAI, OpenRouter, A4F.co integration</li>
                  <li>• Intelligent load balancing & failover</li>
                  <li>• Health monitoring & alerting</li>
                  <li>• Cost optimization & rate limiting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📊 Advanced Analytics</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Real-time performance monitoring</li>
                  <li>• Usage analytics & cost tracking</li>
                  <li>• Sentry integration for error tracking</li>
                  <li>• Custom dashboards & reporting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔐 Enterprise Security</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Clerk authentication & authorization</li>
                  <li>• Role-based access control</li>
                  <li>• GDPR compliance & data privacy</li>
                  <li>• Audit logging & monitoring</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📁 Document Intelligence</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• PDF, DOCX, Excel processing</li>
                  <li>• ChromaDB vector embeddings</li>
                  <li>• Semantic search & retrieval</li>
                  <li>• Cloud storage integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
          </h1>
          <p className="text-gray-600">
            Your AI platform dashboard - manage conversations, documents, and analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI chat session completed</span>
                <span className="text-gray-400">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Document uploaded and processed</span>
                <span className="text-gray-400">15 min ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>New conversation created</span>
                <span className="text-gray-400">1 hour ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24</div>
                <div className="text-sm text-gray-600">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-gray-600">AI Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">$12.45</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}