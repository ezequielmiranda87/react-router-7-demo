export interface AIProvider {
  name: string
  analyzeNeed(userInput: string, context: AnalysisContext): Promise<AdvisorResponse>
  isAvailable(): boolean
  getCost(): string
}

export interface AnalysisContext {
  services: any[]
  userIndustry?: string
  userBudget?: string
  userTimeline?: string
  previousResponses?: string[]
}

export interface AdvisorResponse {
  message: string
  recommendations?: ServiceRecommendation[]
  nextSteps?: string[]
  confidence?: number
  roadmap?: string[]
  provider?: string
  cost?: string
}

export interface ServiceRecommendation {
  serviceId: string
  title: string
  description: string
  relevance: number
  roadmap?: string[]
  timeline?: string
}

export type ProviderType = 'openai' | 'anthropic' | 'groq' | 'openrouter' | 'local' | 'mock'

export interface ProviderConfig {
  type: ProviderType
  apiKey?: string
  model?: string
  temperature?: number
  maxTokens?: number
} 