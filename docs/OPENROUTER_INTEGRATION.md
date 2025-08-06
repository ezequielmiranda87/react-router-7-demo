# 🚀 OpenRouter Integration with DeepSeek R1

## Overview

This project now includes **OpenRouter** as the default AI provider, using **DeepSeek R1** (deepseek-reasoner) as the primary model. OpenRouter provides access to multiple AI models through a single API, making it cost-effective and flexible.

## 🎯 Why OpenRouter + DeepSeek R1?

### **DeepSeek R1 Advantages**
- **Strong Reasoning**: Excellent for strategic business analysis
- **Cost-Effective**: Significantly cheaper than GPT-4
- **Fast**: Quick response times for better UX
- **Reliable**: Consistent performance across different tasks

### **OpenRouter Benefits**
- **Multiple Models**: Access to 100+ AI models
- **Unified API**: Single integration for multiple providers
- **Cost Optimization**: Choose the best model for your needs
- **Easy Switching**: Change models without code changes

## 🚀 Quick Setup

### 1. Get OpenRouter API Key
1. Visit [https://openrouter.ai/](https://openrouter.ai/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add credits to your account (DeepSeek models are very affordable)

### 2. Environment Configuration
```bash
# .env
VITE_AI_PROVIDER=openrouter
VITE_OPENROUTER_API_KEY=sk-or-your-api-key-here
VITE_OPENROUTER_MODEL=deepseek-reasoner
VITE_OPENROUTER_TEMPERATURE=0.7
VITE_OPENROUTER_MAX_TOKENS=1500
```

### 3. Test the Integration
```typescript
import { advisorAgent } from '@/lib/ai-providers'

// Test the OpenRouter provider
const result = await advisorAgent.analyzeNeed('I need help with digital transformation')
console.log(result.provider) // "OpenRouter (deepseek-reasoner)"
```

## 🔧 Available Models

### **Recommended Models**
| Model | Cost | Use Case | Reasoning |
|-------|------|----------|-----------|
| `deepseek-reasoner` | $ | Strategic analysis | ⭐⭐⭐⭐⭐ |
| `deepseek-chat` | $ | General conversation | ⭐⭐⭐⭐ |
| `gpt-4-turbo` | $$ | Complex tasks | ⭐⭐⭐⭐⭐ |
| `claude-3-sonnet` | $$ | Detailed analysis | ⭐⭐⭐⭐⭐ |
| `llama3-70b` | $ | Fast responses | ⭐⭐⭐ |

### **Model Comparison**
```typescript
// Switch models at runtime
advisorAgent.switchProvider('openrouter')

// Check available models
const models = await OpenRouterProvider.getAvailableModels(apiKey)
console.log(models)
```

## 💰 Cost Analysis

### **DeepSeek R1 Pricing**
- **Input**: $0.14 per 1M tokens
- **Output**: $0.28 per 1M tokens
- **Typical query**: ~$0.01-0.05 per analysis

### **Cost Comparison**
| Provider | Model | Cost per Query | Quality |
|----------|-------|----------------|---------|
| **OpenRouter** | DeepSeek R1 | ~$0.02 | High |
| **OpenAI** | GPT-4 Turbo | ~$0.10 | High |
| **Anthropic** | Claude 3 | ~$0.08 | High |
| **Mock** | None | Free | Basic |

## 🧪 Testing

### **Test OpenRouter Provider**
```typescript
import { testOpenRouter } from '@/lib/ai-providers/test-openrouter'

// Run comprehensive tests
await testOpenRouter()
```

### **Test Factory Integration**
```typescript
import { testFactoryWithOpenRouter } from '@/lib/ai-providers/test-openrouter'

// Test factory with OpenRouter
await testFactoryWithOpenRouter()
```

### **Manual Testing**
```bash
# Start dev server
npm run dev

# Visit your site and test the advisor
# Should show "OpenRouter (deepseek-reasoner)" as provider
```

## 🔄 Switching Models

### **Environment-Based Switching**
```bash
# Use DeepSeek R1 (default)
VITE_OPENROUTER_MODEL=deepseek-reasoner

# Switch to GPT-4
VITE_OPENROUTER_MODEL=gpt-4-turbo

# Switch to Claude
VITE_OPENROUTER_MODEL=claude-3-sonnet
```

### **Runtime Switching**
```typescript
import { advisorAgent } from '@/lib/ai-providers'

// Switch to different model
advisorAgent.switchProvider('openrouter')

// Check current configuration
const provider = advisorAgent.getCurrentProvider()
console.log(provider.name) // "OpenRouter (deepseek-reasoner)"
```

## 🛠️ Advanced Configuration

### **Custom Model Configuration**
```typescript
import { OpenRouterProvider } from '@/lib/ai-providers'

const customConfig = {
  type: 'openrouter' as const,
  apiKey: 'sk-or-your-key',
  model: 'gpt-4-turbo',
  temperature: 0.5,
  maxTokens: 2000
}

const provider = new OpenRouterProvider(customConfig)
```

### **Model-Specific Prompts**
```typescript
// The provider automatically adapts prompts for different models
const models = [
  'deepseek-reasoner', // Best for strategic analysis
  'gpt-4-turbo',       // Best for complex reasoning
  'claude-3-sonnet',   // Best for detailed explanations
  'llama3-70b'         // Best for fast responses
]
```

## 📊 Performance Monitoring

### **Response Quality**
- **DeepSeek R1**: Excellent strategic analysis
- **JSON Parsing**: Robust error handling
- **Fallback**: Automatic fallback to mock provider

### **Response Times**
- **DeepSeek R1**: ~2-5 seconds
- **GPT-4**: ~3-8 seconds
- **Claude**: ~4-10 seconds

### **Error Handling**
```typescript
try {
  const result = await advisorAgent.analyzeNeed(userInput)
} catch (error) {
  // Automatic fallback to mock provider
  console.log('OpenRouter failed, using mock provider')
  advisorAgent.switchProvider('mock')
  const fallbackResult = await advisorAgent.analyzeNeed(userInput)
}
```

## 🔒 Security & Best Practices

### **API Key Security**
- Never commit API keys to version control
- Use environment variables
- Consider using a backend proxy for production

### **Rate Limiting**
- OpenRouter has generous rate limits
- Implement retry logic for failed requests
- Monitor usage in OpenRouter dashboard

### **Error Handling**
```typescript
// The provider includes comprehensive error handling
const provider = new OpenRouterProvider(config)

if (!provider.isAvailable()) {
  console.log('OpenRouter not available, check API key')
}
```

## 🚀 Production Deployment

### **Environment Setup**
```bash
# Production .env
VITE_AI_PROVIDER=openrouter
VITE_OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
VITE_OPENROUTER_MODEL=deepseek-reasoner
VITE_OPENROUTER_TEMPERATURE=0.7
VITE_OPENROUTER_MAX_TOKENS=1500
```

### **Monitoring**
- Monitor API usage in OpenRouter dashboard
- Set up alerts for high usage
- Track response quality and user satisfaction

### **Scaling**
- OpenRouter can handle high traffic
- Consider caching responses for similar queries
- Implement request queuing for high load

## 🔮 Future Enhancements

### **Planned Features**
- **Model A/B Testing**: Compare different models
- **Cost Optimization**: Automatic model selection based on query complexity
- **Response Caching**: Cache similar queries
- **Streaming Responses**: Real-time response streaming

### **Integration Ideas**
- **Multi-Model Responses**: Get responses from multiple models
- **Model-Specific Prompts**: Optimize prompts for each model
- **Performance Analytics**: Track model performance
- **User Preferences**: Let users choose their preferred model

## 📚 API Reference

### **OpenRouterProvider Methods**
```typescript
class OpenRouterProvider {
  name: string                    // Provider name with model
  isAvailable(): boolean         // Check if API key is configured
  getCost(): string              // Get cost indicator ($, $$, etc.)
  analyzeNeed(input, context)    // Main analysis method
  static getAvailableModels()    // Get list of available models
}
```

### **Response Structure**
```typescript
interface AdvisorResponse {
  message: string                // Strategic analysis
  recommendations: ServiceRecommendation[]
  nextSteps: string[]
  confidence: number
  roadmap: string[]
  provider: string              // "OpenRouter (deepseek-reasoner)"
  cost: string                  // "$"
}
```

## 🤝 Support & Troubleshooting

### **Common Issues**
1. **API Key Not Working**
   - Check if key starts with `sk-or-`
   - Verify key in OpenRouter dashboard
   - Ensure account has credits

2. **Model Not Available**
   - Check model name spelling
   - Verify model is available in OpenRouter
   - Try alternative model

3. **Rate Limiting**
   - Check usage in OpenRouter dashboard
   - Implement retry logic
   - Consider upgrading plan

### **Getting Help**
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [DeepSeek Model Info](https://platform.deepseek.com/)
- [Project Issues](https://github.com/your-repo/issues)

## 🎉 Success Metrics

### **Expected Results**
- **Response Quality**: High-quality strategic analysis
- **Cost Savings**: 70-80% cost reduction vs OpenAI
- **Performance**: Fast response times
- **Reliability**: 99%+ uptime with fallback

### **User Experience**
- **Professional Responses**: Strategic business advice
- **Fast Turnaround**: Quick analysis and recommendations
- **Cost Transparency**: Clear cost indicators
- **Flexibility**: Easy model switching

---

**Ready to transform your business with AI-powered strategic insights! 🚀** 