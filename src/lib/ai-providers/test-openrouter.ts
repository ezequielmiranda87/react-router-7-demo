import { OpenRouterProvider } from './openrouter-provider'
import { AIProviderFactory } from './provider-factory'

// Test OpenRouter provider specifically
export async function testOpenRouter() {
  console.log('🧪 Testing OpenRouter Provider...')
  
  // Test provider creation
  const config = {
    type: 'openrouter' as const,
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    model: 'deepseek-reasoner',
    temperature: 0.7,
    maxTokens: 1500
  }
  
  const provider = new OpenRouterProvider(config)
  
  console.log('Provider info:', {
    name: provider.name,
    cost: provider.getCost(),
    isAvailable: provider.isAvailable()
  })
  
  // Test with mock services
  const mockServices = [
    {
      _id: 'service-1',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications'
    },
    {
      _id: 'service-2', 
      title: 'Web Development',
      description: 'Modern web applications and websites'
    },
    {
      _id: 'service-3',
      title: 'Digital Strategy',
      description: 'Business transformation and technology consulting'
    }
  ]
  
  const context = {
    services: mockServices,
    userIndustry: 'Healthcare',
    userBudget: '$50k-100k',
    userTimeline: '6 months'
  }
  
  try {
    console.log('Testing analysis...')
    const result = await provider.analyzeNeed('I need a mobile app for patient management', context)
    
    console.log('Analysis result:', {
      message: result.message.substring(0, 200) + '...',
      recommendations: result.recommendations?.length || 0,
      provider: result.provider,
      cost: result.cost,
      confidence: result.confidence
    })
    
    if (result.recommendations && result.recommendations.length > 0) {
      console.log('Top recommendation:', result.recommendations[0])
    }
    
  } catch (error) {
    console.error('Analysis failed:', error)
    
    if (error instanceof Error && error.message.includes('API key')) {
      console.log('💡 To test with real API:')
      console.log('1. Get OpenRouter API key from https://openrouter.ai/')
      console.log('2. Add VITE_OPENROUTER_API_KEY=sk-or-... to your .env file')
      console.log('3. Run this test again')
    }
  }
  
  // Test available models (if API key is available)
  if (config.apiKey) {
    try {
      console.log('Fetching available models...')
      const models = await OpenRouterProvider.getAvailableModels(config.apiKey)
      console.log('Available models:', models.slice(0, 5)) // Show first 5
    } catch (error) {
      console.error('Failed to fetch models:', error)
    }
  }
}

// Test the factory with OpenRouter
export async function testFactoryWithOpenRouter() {
  console.log('🏭 Testing Factory with OpenRouter...')
  
  const providers = AIProviderFactory.getAvailableProviders()
  console.log('Available providers:', providers)
  
  const defaultConfig = AIProviderFactory.getDefaultProvider()
  console.log('Default config:', defaultConfig)
  
  if (defaultConfig.type === 'openrouter') {
    console.log('✅ OpenRouter is set as default provider')
  } else {
    console.log('ℹ️  Current default provider:', defaultConfig.type)
    console.log('💡 To use OpenRouter as default, set VITE_AI_PROVIDER=openrouter in .env')
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testOpenRouter()
  testFactoryWithOpenRouter()
} 