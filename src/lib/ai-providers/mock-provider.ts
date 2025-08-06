import type { AIProvider, AnalysisContext, AdvisorResponse, ProviderConfig } from './types'

export class MockProvider implements AIProvider {
  private config: ProviderConfig

  constructor(config: ProviderConfig) {
    this.config = config
  }

  get name(): string {
    return 'Mock AI (Demo)'
  }

  isAvailable(): boolean {
    return true // Always available
  }

  getCost(): string {
    return 'Free'
  }

  async analyzeNeed(userInput: string, context: AnalysisContext): Promise<AdvisorResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const input = userInput.toLowerCase()
    const strategicCategories = {
      'mobile strategy': ['Mobile App Development', 'Cross-platform Solutions'],
      'web presence': ['Website Development', 'E-commerce Solutions'],
      'ecommerce growth': ['E-commerce Development', 'Digital Marketing'],
      'api & integration': ['API Development', 'System Integration'],
      'digital transformation': ['Digital Strategy', 'Technology Consulting'],
      'business strategy': ['Business Consulting', 'Strategic Planning'],
      'design & ux': ['UI/UX Design', 'Brand Design'],
      'marketing': ['Digital Marketing', 'SEO Optimization'],
      'analytics': ['Data Analytics', 'Business Intelligence'],
      'automation': ['Process Automation', 'Workflow Optimization']
    }

    const matchedServices: any[] = []
    const roadmap = this.generateRoadmap(input, strategicCategories)

    // Find relevant services
    for (const [category, services] of Object.entries(strategicCategories)) {
      if (input.includes(category) || services.some(service => input.includes(service.toLowerCase()))) {
        const relevantServices = context.services.filter(service => 
          services.some(s => service.title.toLowerCase().includes(s.toLowerCase()))
        )
        
        relevantServices.forEach(service => {
          matchedServices.push({
            serviceId: service._id,
            title: service.title,
            description: `Perfect for your ${category} needs`,
            relevance: 0.9,
            roadmap: this.getServiceRoadmap(service.title, category),
            timeline: this.getStrategicTimeline(service.title, category)
          })
        })
      }
    }

    // If no specific matches, recommend general services
    if (matchedServices.length === 0) {
      context.services.slice(0, 3).forEach(service => {
        matchedServices.push({
          serviceId: service._id,
          title: service.title,
          description: 'Could be valuable for your business transformation',
          relevance: 0.7,
          roadmap: this.getServiceRoadmap(service.title, 'general'),
          timeline: '8-12 weeks'
        })
      })
    }

    const response = this.generateStrategicResponse(userInput, matchedServices, roadmap)

    return {
      message: response,
      recommendations: matchedServices.slice(0, 4),
      nextSteps: this.getStrategicNextSteps(matchedServices.length > 0, roadmap),
      confidence: matchedServices.length > 0 ? 0.9 : 0.6,
      roadmap: roadmap,
      provider: this.name,
      cost: this.getCost()
    }
  }

  private generateRoadmap(input: string, categories: Record<string, string[]>): string[] {
    const roadmap: string[] = []
    roadmap.push('📋 **Phase 1: Discovery & Strategy**')
    roadmap.push('• Comprehensive needs assessment and business analysis')
    roadmap.push('• Strategic planning and technology recommendations')
    roadmap.push('• Project scope definition and success metrics')

    if (input.includes('design') || input.includes('ui') || input.includes('ux')) {
      roadmap.push('')
      roadmap.push('🎨 **Phase 2: Design & Architecture**')
      roadmap.push('• User experience research and wireframing')
      roadmap.push('• Visual design and brand integration')
      roadmap.push('• Technical architecture planning')
    }

    if (input.includes('app') || input.includes('website') || input.includes('api')) {
      roadmap.push('')
      roadmap.push('⚙️ **Phase 3: Development & Implementation**')
      roadmap.push('• Agile development with regular check-ins')
      roadmap.push('• Quality assurance and testing')
      roadmap.push('• Performance optimization and security')
    }

    roadmap.push('')
    roadmap.push('🚀 **Phase 4: Launch & Growth**')
    roadmap.push('• Deployment and go-live support')
    roadmap.push('• Training and documentation')
    roadmap.push('• Ongoing optimization and growth strategies')

    return roadmap
  }

  private generateStrategicResponse(userInput: string, services: any[], roadmap: string[]): string {
    if (services.length === 0) {
      return `Based on your description of "${userInput}", I recommend starting with a comprehensive business strategy session. This will help us identify the most impactful digital transformation opportunities for your organization.

Our strategic approach focuses on:
• Understanding your current business challenges
• Identifying technology gaps and opportunities
• Creating a phased implementation roadmap
• Measuring success and ROI

Let's schedule a strategic consultation to dive deeper into your specific needs and create a customized roadmap.`
    }

    return `Excellent! Based on your needs around "${userInput}", I've identified several strategic opportunities for your business transformation.

🎯 **Strategic Services:**
${services.map(s => `• ${s.title} - ${s.description}`).join('\n')}

${roadmap.join('\n')}

💡 **Strategic Benefits:**
• Aligned with your business objectives
• Scalable and future-proof solutions
• Measurable success metrics
• Ongoing optimization and support

🚀 **Next Steps:**
Let's schedule a strategic consultation to create your customized roadmap and discuss implementation strategies.`
  }

  private getServiceRoadmap(serviceTitle: string, category: string): string[] {
    const roadmaps: Record<string, string[]> = {
      'mobile strategy': [
        'User research and persona development',
        'Platform strategy (iOS/Android/Cross-platform)',
        'UX/UI design and prototyping',
        'Development and testing',
        'App store optimization and launch'
      ],
      'web presence': [
        'Brand analysis and positioning',
        'Information architecture planning',
        'Design and development',
        'Content strategy and SEO',
        'Launch and ongoing optimization'
      ],
      'ecommerce growth': [
        'Market analysis and competitive research',
        'Platform selection and architecture',
        'Design and user experience optimization',
        'Payment and security integration',
        'Launch and growth marketing'
      ],
      'api & integration': [
        'System analysis and requirements gathering',
        'API design and architecture planning',
        'Development and testing',
        'Documentation and training',
        'Deployment and monitoring'
      ]
    }

    return roadmaps[category] || [
      'Strategic planning and analysis',
      'Solution design and architecture',
      'Implementation and development',
      'Testing and quality assurance',
      'Launch and ongoing support'
    ]
  }

  private getStrategicTimeline(serviceTitle: string, category: string): string {
    const timelineMap: Record<string, string> = {
      'mobile strategy': '12-16 weeks',
      'web presence': '8-12 weeks',
      'ecommerce growth': '16-20 weeks',
      'api & integration': '10-14 weeks',
      'digital transformation': '20-24 weeks',
      'business strategy': '4-8 weeks'
    }

    return timelineMap[category] || '8-12 weeks'
  }

  private getStrategicNextSteps(hasRecommendations: boolean, roadmap: string[]): string[] {
    if (hasRecommendations) {
      return [
        'Schedule a strategic consultation call',
        'Request a detailed project roadmap',
        'View our strategic case studies',
        'Download our digital transformation guide'
      ]
    }
    
    return [
      'Schedule a business strategy session',
      'Request a technology assessment',
      'Download our strategic planning toolkit',
      'Join our digital transformation webinar'
    ]
  }
} 