# 🤖 AI Provider System

## Overview

The AI Provider System allows you to easily switch between different AI providers (OpenAI, Anthropic, Groq, etc.) without changing your application code. This provides flexibility, cost control, and the ability to use different AI models for different use cases.

## 🏗️ Architecture

```
src/lib/ai-providers/
├── types.ts              # TypeScript interfaces
├── provider-factory.ts   # Factory pattern for creating providers
├── openai-provider.ts    # OpenAI implementation
├── mock-provider.ts      # Mock provider for testing
├── index.ts             # Main export and advisor agent
└── test-providers.ts    # Testing utilities
```

## 🚀 Quick Start

### 1. Environment Configuration

Create a `.env` file based on `env.example`:

```bash
# Choose your AI provider
VITE_AI_PROVIDER=openai  # or 'anthropic', 'groq', 'mock'

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-api-key
VITE_OPENAI_MODEL=gpt-4-turbo-preview
VITE_OPENAI_TEMPERATURE=0.7
VITE_OPENAI_MAX_TOKENS=1500
```

### 2. Usage in Your Code

```typescript
import { advisorAgent } from '@/lib/ai-providers'

// Analyze user needs
const result = await advisorAgent.analyzeNeed('I need a mobile app', {
  userIndustry: 'Healthcare',
  userBudget: '$50k-100k',
  userTimeline: '6 months'
})

console.log(result.message)
console.log(result.recommendations)
console.log(result.roadmap)
```

## 🔧 Available Providers

### 1. OpenAI (GPT-4)
- **Cost**: $$ (Higher cost, high quality)
- **Best for**: Complex strategic analysis
- **Setup**: Requires OpenAI API key

### 2. Mock Provider
- **Cost**: Free
- **Best for**: Development and testing
- **Setup**: No API key required

### 3. Future Providers
- **Anthropic (Claude)**: High reasoning capabilities
- **Groq**: Fast inference, lower cost
- **Local Models**: Privacy-focused, no API calls

## 🔄 Switching Providers

### Environment-Based Switching
```bash
# Switch to OpenAI
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-...

# Switch to Mock
VITE_AI_PROVIDER=mock
```

### Runtime Switching
```typescript
import { advisorAgent } from '@/lib/ai-providers'

// Switch provider at runtime
advisorAgent.switchProvider('openai')

// Check current provider
const provider = advisorAgent.getCurrentProvider()
console.log(provider.name, provider.cost)
```

## 📊 Provider Comparison

| Provider | Cost | Speed | Quality | Use Case |
|----------|------|-------|---------|----------|
| Mock | Free | Fast | Basic | Development |
| OpenAI | $$ | Medium | High | Production |
| Anthropic | $$ | Medium | High | Reasoning |
| Groq | $ | Fast | Good | Real-time |

## 🛠️ Adding New Providers

### 1. Create Provider Class
```typescript
// src/lib/ai-providers/anthropic-provider.ts
import type { AIProvider, AnalysisContext, AdvisorResponse, ProviderConfig } from './types'

export class AnthropicProvider implements AIProvider {
  constructor(config: ProviderConfig) {
    // Initialize Anthropic client
  }

  get name(): string {
    return 'Anthropic Claude'
  }

  isAvailable(): boolean {
    return !!this.config.apiKey
  }

  getCost(): string {
    return '$$'
  }

  async analyzeNeed(userInput: string, context: AnalysisContext): Promise<AdvisorResponse> {
    // Implement Anthropic API call
  }
}
```

### 2. Register in Factory
```typescript
// src/lib/ai-providers/provider-factory.ts
import { AnthropicProvider } from './anthropic-provider'

static {
  this.providers.set('anthropic', AnthropicProvider)
}
```

### 3. Add Environment Variables
```bash
# .env
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

## 🧪 Testing

### Test Provider System
```typescript
import { testProviders } from '@/lib/ai-providers/test-providers'

// Run tests
await testProviders()
```

### Test Individual Provider
```typescript
import { AIProviderFactory } from '@/lib/ai-providers'

const provider = AIProviderFactory.createProvider({ type: 'mock' })
const result = await provider.analyzeNeed('test input', { services: [] })
```

## 🔒 Security Considerations

### API Key Management
- Never commit API keys to version control
- Use environment variables for all API keys
- Consider using a backend proxy for production

### Rate Limiting
- Implement rate limiting for API calls
- Add retry logic with exponential backoff
- Monitor API usage and costs

### Error Handling
```typescript
try {
  const result = await advisorAgent.analyzeNeed(userInput)
} catch (error) {
  // Fallback to mock provider
  advisorAgent.switchProvider('mock')
  const fallbackResult = await advisorAgent.analyzeNeed(userInput)
}
```

## 📈 Performance Optimization

### Caching
- Cache responses for similar inputs
- Use Redis or similar for distributed caching
- Implement TTL for cached responses

### Streaming
- Implement streaming responses for better UX
- Show partial results as they arrive
- Handle streaming errors gracefully

### Cost Optimization
- Use cheaper models for simple queries
- Implement token counting and limits
- Monitor and optimize prompt length

## 🚀 Production Deployment

### Environment Setup
```bash
# Production .env
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=${OPENAI_API_KEY}
VITE_OPENAI_MODEL=gpt-4-turbo-preview
```

### Monitoring
- Log provider usage and costs
- Monitor response times and quality
- Set up alerts for API failures

### Fallback Strategy
```typescript
// Automatic fallback on failure
const providers = ['openai', 'anthropic', 'mock']
let result = null

for (const provider of providers) {
  try {
    advisorAgent.switchProvider(provider)
    result = await advisorAgent.analyzeNeed(userInput)
    break
  } catch (error) {
    console.warn(`${provider} failed, trying next...`)
  }
}
```

## 🔮 Future Enhancements

### Planned Features
- **Multi-provider responses**: Compare responses from multiple providers
- **Provider-specific prompts**: Optimize prompts for each provider
- **A/B testing**: Test different providers with real users
- **Cost tracking**: Real-time cost monitoring and alerts
- **Custom models**: Support for fine-tuned models

### Integration Ideas
- **Vector databases**: For better context and memory
- **Web search**: Real-time information integration
- **File analysis**: Document and image analysis
- **Voice integration**: Speech-to-text and text-to-speech

## 📚 API Reference

### AdvisorAgent Methods
- `analyzeNeed(input, context?)`: Analyze user needs
- `switchProvider(type)`: Switch AI provider
- `getCurrentProvider()`: Get current provider info
- `getAvailableProviders()`: List all available providers

### Response Structure
```typescript
interface AdvisorResponse {
  message: string
  recommendations?: ServiceRecommendation[]
  nextSteps?: string[]
  confidence?: number
  roadmap?: string[]
  provider?: string
  cost?: string
}
```

## 🤝 Contributing

To add a new AI provider:

1. Create provider class implementing `AIProvider` interface
2. Add to provider factory
3. Add environment variables
4. Write tests
5. Update documentation

## 📞 Support

For questions or issues:
- Check the test files for examples
- Review the TypeScript interfaces
- Test with mock provider first
- Monitor console logs for debugging info 