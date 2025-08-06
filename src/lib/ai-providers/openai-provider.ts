import OpenAI from 'openai'
import type { AIProvider, AnalysisContext, AdvisorResponse, ProviderConfig } from './types'

export class OpenAIProvider implements AIProvider {
  private client: OpenAI | null = null
  private config: ProviderConfig

  constructor(config: ProviderConfig) {
    this.config = config
    if (config.apiKey) {
      this.client = new OpenAI({
        apiKey: config.apiKey,
        dangerouslyAllowBrowser: true // For client-side usage
      })
    }
  }

  get name(): string {
    return 'OpenAI GPT-4'
  }

  isAvailable(): boolean {
    return this.client !== null && !!this.config.apiKey
  }

  getCost(): string {
    return '$$' // GPT-4 is more expensive
  }

  async analyzeNeed(userInput: string, context: AnalysisContext): Promise<AdvisorResponse> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized')
    }

    const prompt = this.buildPrompt(userInput, context)
    
    try {
      const response = await this.client.chat.completions.create({
        model: this.config.model || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: `You are a strategic business advisor specializing in digital transformation and technology consulting. 
            Analyze the user's needs and provide strategic recommendations based on the available services.
            Focus on business value, strategic roadmaps, and implementation guidance.
            Do NOT provide cost estimates unless specifically requested.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: this.config.temperature || 0.7,
        max_tokens: this.config.maxTokens || 1500
      })

      const aiResponse = response.choices[0]?.message?.content || ''
      return this.parseAIResponse(aiResponse, context)
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to get AI response')
    }
  }

  private buildPrompt(userInput: string, context: AnalysisContext): string {
    const servicesList = context.services.map(s => 
      `- ${s.title}: ${s.description}`
    ).join('\n')

    return `
User Input: "${userInput}"

Available Services:
${servicesList}

User Context:
- Industry: ${context.userIndustry || 'Not specified'}
- Budget: ${context.userBudget || 'Not specified'}
- Timeline: ${context.userTimeline || 'Not specified'}

Please provide:
1. A strategic analysis of their needs
2. Specific service recommendations with relevance scores
3. A phased implementation roadmap
4. Strategic next steps
5. Business benefits and value proposition

Format your response as JSON with this structure:
{
  "message": "Strategic analysis...",
  "recommendations": [
    {
      "serviceId": "service-id",
      "title": "Service Name",
      "description": "Why this service fits",
      "relevance": 0.9,
      "roadmap": ["Phase 1: ...", "Phase 2: ..."],
      "timeline": "8-12 weeks"
    }
  ],
  "nextSteps": ["Step 1", "Step 2"],
  "confidence": 0.85,
  "roadmap": ["Phase 1: Discovery", "Phase 2: Design", "Phase 3: Development", "Phase 4: Launch"]
}
    `.trim()
  }

  private parseAIResponse(aiResponse: string, context: AnalysisContext): AdvisorResponse {
    try {
      // Try to parse JSON response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          ...parsed,
          provider: this.name,
          cost: this.getCost()
        }
      }
    } catch (error) {
      console.warn('Failed to parse AI response as JSON, using fallback')
    }

    // Fallback: return structured response
    return {
      message: aiResponse,
      recommendations: [],
      nextSteps: ['Schedule a consultation call'],
      confidence: 0.7,
      roadmap: ['Phase 1: Analysis', 'Phase 2: Strategy', 'Phase 3: Implementation'],
      provider: this.name,
      cost: this.getCost()
    }
  }
} 