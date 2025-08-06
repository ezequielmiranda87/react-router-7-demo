import type { AIProvider, AnalysisContext, AdvisorResponse, ProviderConfig } from './types'

export class OpenRouterProvider implements AIProvider {
  private config: ProviderConfig
  private baseUrl = 'https://openrouter.ai/api/v1'

  constructor(config: ProviderConfig) {
    this.config = config
  }

  get name(): string {
    const model = this.config.model || 'deepseek/deepseek-r1-0528:free'
    return `OpenRouter (${model})`
  }

  isAvailable(): boolean {
    return !!this.config.apiKey
  }

  getCost(): string {
    // OpenRouter models have different costs, but generally cheaper than OpenAI
    const model = this.config.model || 'deepseek/deepseek-r1-0528:free'
    if (model.includes('free')) return 'Free' // Free models
    if (model.includes('deepseek')) return '$' // DeepSeek models are cost-effective
    if (model.includes('gpt-4')) return '$$' // GPT-4 models are more expensive
    return '$' // Default to lower cost
  }

  async analyzeNeed(userInput: string, context: AnalysisContext): Promise<AdvisorResponse> {
    if (!this.config.apiKey) {
      throw new Error('OpenRouter API key not configured')
    }

    const prompt = this.buildPrompt(userInput, context)
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin, // Required by OpenRouter
          'X-Title': 'Strategic Business Advisor' // Optional: helps with analytics
        },
        body: JSON.stringify({
          model: this.config.model || 'deepseek/deepseek-r1-0528:free',
          messages: [
            {
              role: 'system',
              content: `You are a strategic business advisor specializing in digital transformation and technology consulting. 
              Analyze the user's needs and provide strategic recommendations based on the available services.
              Focus on business value, strategic roadmaps, and implementation guidance.
              Do NOT provide cost estimates unless specifically requested.
              
              You are powered by DeepSeek R1, a model specifically designed for advanced reasoning and strategic analysis.
              Use your reasoning capabilities to provide thoughtful, well-structured strategic insights.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: this.config.temperature || 0.7,
          max_tokens: this.config.maxTokens || 1500,
          stream: false
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || ''
      
      return this.parseAIResponse(aiResponse, context)
    } catch (error) {
      console.error('OpenRouter API error:', error)
      throw new Error(`Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
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

Please provide a strategic analysis with the following structure:

1. **Strategic Analysis**: Analyze their business needs and opportunities
2. **Service Recommendations**: Recommend specific services with relevance scores (0.0-1.0)
3. **Implementation Roadmap**: Create a phased implementation plan
4. **Strategic Benefits**: Highlight business value and ROI
5. **Next Steps**: Provide actionable next steps

Format your response as JSON with this exact structure:
{
  "message": "Strategic analysis message...",
  "recommendations": [
    {
      "serviceId": "service-id",
      "title": "Service Name",
      "description": "Why this service fits their needs",
      "relevance": 0.9,
      "roadmap": ["Phase 1: Discovery", "Phase 2: Design", "Phase 3: Development"],
      "timeline": "8-12 weeks"
    }
  ],
  "nextSteps": ["Schedule consultation", "Request detailed roadmap"],
  "confidence": 0.85,
  "roadmap": ["Phase 1: Discovery & Strategy", "Phase 2: Design & Architecture", "Phase 3: Development & Implementation", "Phase 4: Launch & Growth"]
}

Ensure the JSON is valid and complete.`.trim()
  }

  private parseAIResponse(aiResponse: string, context: AnalysisContext): AdvisorResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        
        // Validate and clean the parsed response
        const validatedResponse: AdvisorResponse = {
          message: parsed.message || aiResponse,
          recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 4) : [],
          nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : ['Schedule a consultation call'],
          confidence: typeof parsed.confidence === 'number' ? Math.min(Math.max(parsed.confidence, 0), 1) : 0.7,
          roadmap: Array.isArray(parsed.roadmap) ? parsed.roadmap : this.getDefaultRoadmap(),
          provider: this.name,
          cost: this.getCost()
        }

        return validatedResponse
      }
    } catch (error) {
      console.warn('Failed to parse AI response as JSON, using fallback:', error)
    }

    // Fallback: return structured response
    return {
      message: aiResponse,
      recommendations: [],
      nextSteps: ['Schedule a consultation call'],
      confidence: 0.7,
      roadmap: this.getDefaultRoadmap(),
      provider: this.name,
      cost: this.getCost()
    }
  }

  private getDefaultRoadmap(): string[] {
    return [
      '📋 **Phase 1: Discovery & Strategy**',
      '• Comprehensive needs assessment and business analysis',
      '• Strategic planning and technology recommendations',
      '• Project scope definition and success metrics',
      '',
      '🎨 **Phase 2: Design & Architecture**',
      '• User experience research and wireframing',
      '• Visual design and brand integration',
      '• Technical architecture planning',
      '',
      '⚙️ **Phase 3: Development & Implementation**',
      '• Agile development with regular check-ins',
      '• Quality assurance and testing',
      '• Performance optimization and security',
      '',
      '🚀 **Phase 4: Launch & Growth**',
      '• Deployment and go-live support',
      '• Training and documentation',
      '• Ongoing optimization and growth strategies'
    ]
  }

  // Get available models from OpenRouter
  static async getAvailableModels(apiKey: string): Promise<Array<{ id: string; name: string; cost: string }>> {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`)
      }

      const data = await response.json()
      return data.data?.map((model: any) => ({
        id: model.id,
        name: model.name || model.id,
        cost: model.pricing?.prompt ? '$' : '$$'
      })) || []
    } catch (error) {
      console.error('Failed to fetch OpenRouter models:', error)
      return []
    }
  }
} 