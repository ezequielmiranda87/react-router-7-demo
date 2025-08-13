import type { AIProvider, ProviderConfig, ProviderType } from './types'
import { OpenAIProvider } from './openai-provider'
import { MockProvider } from './mock-provider'
import { OpenRouterProvider } from './openrouter-provider'

export class AIProviderFactory {
  private static providers = new Map<ProviderType, new (config: ProviderConfig) => AIProvider>()

  static {
    // Register available providers
    this.providers.set('openai', OpenAIProvider)
    this.providers.set('openrouter', OpenRouterProvider)
    this.providers.set('mock', MockProvider)
    // Add more providers here as needed
    // this.providers.set('anthropic', AnthropicProvider)
    // this.providers.set('groq', GroqProvider)
  }

  static createProvider(config: ProviderConfig): AIProvider {
    const ProviderClass = this.providers.get(config.type)
    
    if (!ProviderClass) {
      console.warn(`Provider type '${config.type}' not found, falling back to mock`)
      return new MockProvider({ type: 'mock' })
    }

    return new ProviderClass(config)
  }

  static getAvailableProviders(): Array<{ type: ProviderType; name: string; cost: string }> {
    return Array.from(this.providers.entries()).map(([type, ProviderClass]) => {
      const provider = new ProviderClass({ type })
      return {
        type,
        name: provider.name,
        cost: provider.getCost()
      }
    })
  }

  static getDefaultProvider(): ProviderConfig {
    // Check environment variables for default provider
    const envProvider = import.meta.env.VITE_AI_PROVIDER as ProviderType
    
    if (envProvider && this.providers.has(envProvider)) {
      // Handle OpenRouter specifically (it uses OPENROUTER_ prefix)
      const prefix = envProvider === 'openrouter' ? 'OPENROUTER' : envProvider.toUpperCase()
      
      return {
        type: envProvider,
        apiKey: import.meta.env[`VITE_${prefix}_API_KEY`],
        model: import.meta.env[`VITE_${prefix}_MODEL`],
        temperature: parseFloat(import.meta.env[`VITE_${prefix}_TEMPERATURE`] || '0.7'),
        maxTokens: parseInt(import.meta.env[`VITE_${prefix}_MAX_TOKENS`] || '1500')
      }
    }

    // Fallback to mock provider
    return { type: 'mock' }
  }
} 