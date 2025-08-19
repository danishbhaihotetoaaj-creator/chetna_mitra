# AI Microservices Platform

A comprehensive, enterprise-grade AI platform built with Next.js, featuring multi-provider AI routing, intelligent load balancing, document processing, and advanced analytics.

## 🚀 Features

### Core AI Services
- **Multi-Provider AI Routing**: OpenAI, OpenRouter, A4F.co integration
- **Intelligent Load Balancing**: Based on latency, uptime, and cost
- **Automatic Failover**: Health checks and provider monitoring
- **Rate Limiting**: IP and user-based rate limiting with Redis
- **Cost Optimization**: Token usage tracking and cost analysis

### Authentication & Security
- **Clerk Integration**: Multi-tier authentication system
- **Role-Based Access Control**: Admin, Moderator, User, Enterprise roles
- **GDPR Compliance**: Data privacy and consent management
- **Audit Logging**: Comprehensive activity tracking
- **API Key Management**: Secure API access control

### Document Intelligence
- **Multi-Format Support**: PDF, DOCX, Excel, TXT processing
- **AI-Powered Analysis**: Text extraction, language detection, keyword extraction
- **Vector Embeddings**: ChromaDB integration for semantic search
- **Cloud Storage**: AWS S3 and Google Cloud Storage support
- **Real-time Processing**: Async document processing with status tracking

### Advanced Features
- **Real-time Notifications**: Email, Push, SMS, and in-app notifications
- **Community Features**: Social sharing and collaboration tools
- **Analytics Dashboard**: Real-time metrics and performance monitoring
- **WebSocket Support**: Real-time communication and updates
- **Background Jobs**: Queue management with Bull and Redis

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   AI Providers  │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (OpenAI, etc) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Clerk Auth    │    │   Rate Limiter  │    │   Health Monitor│
│   (External)    │    │   (Redis)       │    │   (Custom)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │   ChromaDB      │    │   Cloud Storage │
│   (Prisma)      │    │   (Vectors)     │    │   (S3/GCS)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Redis Cache   │    │   Sentry        │    │   Monitoring    │
│   (Upstash)     │    │   (Error Track) │    │   (Grafana)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend & API
- **Next.js 14**: React framework with API routes
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Clerk**: Authentication and user management

### Backend Services
- **Prisma**: Database ORM and migrations
- **PostgreSQL**: Primary database
- **Redis/Upstash**: Caching and rate limiting
- **ChromaDB**: Vector database for embeddings

### AI & ML
- **OpenAI API**: GPT models and embeddings
- **OpenRouter**: Alternative AI provider
- **A4F.co**: Additional AI provider
- **Custom Models**: Support for custom AI endpoints

### Infrastructure
- **AWS S3**: File storage
- **Google Cloud Storage**: Alternative storage
- **Vercel**: Deployment platform
- **Docker**: Containerization support

### Monitoring & Analytics
- **Sentry**: Error tracking and monitoring
- **Winston**: Logging framework
- **Grafana**: Metrics visualization
- **Prometheus**: Metrics collection

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- Redis 6+
- ChromaDB (optional, for vector search)
- Clerk account for authentication
- AI provider API keys (OpenAI, OpenRouter, A4F.co)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-microservices-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_platform?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# AI Providers
OPENAI_API_KEY=your_openai_key
OPENROUTER_API_KEY=your_openrouter_key
A4F_API_KEY=your_a4f_key

# Redis
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_bucket_name
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🗄️ Database Schema

The platform uses a comprehensive database schema with the following main entities:

- **Users**: Authentication, roles, and profile information
- **Conversations**: AI chat sessions and message history
- **Documents**: File metadata and processing status
- **Embeddings**: Vector representations for semantic search
- **AI Providers**: Provider configuration and health status
- **Notifications**: Multi-channel notification system
- **Audit Logs**: Security and compliance tracking

## 🔌 API Endpoints

### AI Services
- `POST /api/services/ai/chat` - AI chat completions
- `POST /api/services/ai/embeddings` - Generate embeddings
- `GET /api/services/ai/providers` - Provider status and health

### Document Management
- `POST /api/services/documents/upload` - Upload and process documents
- `GET /api/services/documents/search` - Semantic document search
- `DELETE /api/services/documents/:id` - Delete documents

### User Management
- `GET /api/services/auth/profile` - User profile information
- `PUT /api/services/auth/profile` - Update user profile
- `GET /api/services/auth/api-keys` - Manage API keys

### Notifications
- `POST /api/services/notifications/send` - Send notifications
- `GET /api/services/notifications` - Get user notifications
- `PUT /api/services/notifications/:id/read` - Mark as read

## 🔧 Configuration

### AI Provider Configuration

Configure AI providers in the database or environment:

```typescript
// Example provider configuration
{
  name: "OpenAI",
  type: "OPENAI",
  apiKey: process.env.OPENAI_API_KEY,
  priority: 1,
  region: "us-east-1",
  costPerToken: 0.002,
  rateLimit: 1000
}
```

### Rate Limiting

Configure rate limiting in your environment:

```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # Max requests per window
```

### Storage Configuration

Configure cloud storage providers:

```env
# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your_bucket

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your_project
GOOGLE_CLOUD_PRIVATE_KEY=your_key
GOOGLE_CLOUD_CLIENT_EMAIL=your_email
```

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment

```bash
# Build the image
docker build -t ai-platform .

# Run the container
docker run -p 3000:3000 --env-file .env ai-platform
```

### AWS Deployment

1. Use AWS Elastic Beanstalk or ECS
2. Configure RDS for PostgreSQL
3. Use ElastiCache for Redis
4. Configure S3 for file storage

## 📊 Monitoring & Analytics

### Health Checks

The platform includes comprehensive health monitoring:

- AI provider health status
- Database connection monitoring
- Redis connectivity checks
- External service availability

### Metrics Collection

- Request latency and throughput
- Error rates and types
- AI provider usage and costs
- User activity patterns

### Alerting

- Provider downtime notifications
- High error rate alerts
- Cost threshold warnings
- Performance degradation alerts

## 🔒 Security Features

### Authentication & Authorization
- Multi-factor authentication support
- Role-based access control
- Session management
- API key authentication

### Data Protection
- Encryption at rest and in transit
- GDPR compliance tools
- Data anonymization options
- Audit trail logging

### API Security
- Rate limiting and throttling
- Input validation and sanitization
- CORS configuration
- Security headers

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test suites
npm test -- --grep "AI Provider"
```

## 📈 Performance Optimization

### Caching Strategy
- Redis caching for frequently accessed data
- Database query optimization
- Static asset optimization
- CDN integration support

### Scaling Considerations
- Horizontal scaling with load balancers
- Database connection pooling
- Background job processing
- Microservices architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@aiplatform.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Clerk team for authentication solutions
- OpenAI, OpenRouter, and A4F.co for AI services

---

**Built with ❤️ by the AI Platform Team**