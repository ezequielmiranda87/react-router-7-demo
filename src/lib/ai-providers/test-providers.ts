import { AIProviderFactory } from './provider-factory'
import { advisorAgent } from './index'

// Test the provider system
export async function testProviders() {
  console.log('🧪 Testing AI Provider System...')
  
  // Test available providers
  const providers = AIProviderFactory.getAvailableProviders()
  console.log('Available providers:', providers)
  
  // Test default provider
  const defaultConfig = AIProviderFactory.getDefaultProvider()
  console.log('Default provider config:', defaultConfig)
  
  // Test current provider
  const currentProvider = advisorAgent.getCurrentProvider()
  console.log('Current provider:', currentProvider)
  
  // Test analysis
  try {
    const result = await advisorAgent.analyzeNeed('I need help with mobile app development')
    console.log('Analysis result:', {
      message: result.message.substring(0, 100) + '...',
      recommendations: result.recommendations?.length || 0,
      provider: result.provider,
      cost: result.cost
    })
  } catch (error) {
    console.error('Analysis failed:', error)
  }
}

// Run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testProviders()
} 