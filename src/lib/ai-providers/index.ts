export * from './types'
export * from './provider-factory'
export * from './openai-provider'
export * from './openrouter-provider'
export * from './mock-provider'

// Main advisor agent that uses the provider system
import { AIProviderFactory } from './provider-factory'
import { getServices } from '../sanity-queries'
import type { AnalysisContext, AdvisorResponse } from './types'

class ConfigurableAdvisorAgent {
  private provider: any
  private services: any[] = []

  constructor() {
    const config = AIProviderFactory.getDefaultProvider()
    this.provider = AIProviderFactory.createProvider(config)
  }

  async initialize() {
    try {
      this.services = await getServices()
    } catch (error) {
      console.error('Failed to load services:', error)
      this.services = []
    }
  }

  async analyzeNeed(userInput: string, context?: Partial<AnalysisContext>): Promise<AdvisorResponse> {
    const analysisContext: AnalysisContext = {
      services: this.services,
      ...context
    }

    return this.provider.analyzeNeed(userInput, analysisContext)
  }

  // Method to switch providers dynamically
  switchProvider(providerType: string) {
    const config = { type: providerType as any }
    this.provider = AIProviderFactory.createProvider(config)
  }

  // Get current provider info
  getCurrentProvider() {
    return {
      name: this.provider.name,
      cost: this.provider.getCost(),
      isAvailable: this.provider.isAvailable()
    }
  }

  // Get all available providers
  getAvailableProviders() {
    return AIProviderFactory.getAvailableProviders()
  }
}

// Export singleton instance
export const advisorAgent = new ConfigurableAdvisorAgent()

// Initialize agent when module loads
advisorAgent.initialize() 