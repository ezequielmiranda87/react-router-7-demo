export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

export interface AdvisorResponse {
  message: string
  recommendations?: ServiceRecommendation[]
  nextSteps?: string[]
  confidence?: number
  roadmap?: string[]
}

export interface ServiceRecommendation {
  serviceId: string
  title: string
  description: string
  relevance: number
  roadmap?: string[]
  timeline?: string
}

export interface AdvisorState {
  isOpen: boolean
  isExpanded: boolean
  isLoading: boolean
  messages: ChatMessage[]
  sessionId: string
}

export interface AdvisorConfig {
  welcomeMessage: string
  placeholderText: string
  maxMessages: number
  responseTimeout: number
} 