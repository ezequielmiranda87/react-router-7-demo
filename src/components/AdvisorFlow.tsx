import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { advisorAgent } from '../lib/advisor-agent'
import type { AdvisorResponse } from '../lib/advisor-types'
import { ArrowRight, ArrowLeft, Bot, CheckCircle, Sparkles, Clock, DollarSign, Users } from 'lucide-react'

type FlowStep = 'welcome' | 'needs' | 'industry' | 'budget' | 'timeline' | 'results'

interface FlowState {
  currentStep: FlowStep
  needs: string
  industry: string
  budget: string
  timeline: string
  results: AdvisorResponse | null
  isLoading: boolean
}

const industries = [
  'Restaurant & Hospitality',
  'E-commerce & Retail',
  'Healthcare & Wellness',
  'Professional Services',
  'Technology & SaaS',
  'Education & Training',
  'Real Estate',
  'Manufacturing',
  'Other'
]

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
  'Not sure yet'
]

const timelineOptions = [
  'ASAP (1-2 weeks)',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Not sure yet'
]

export function AdvisorFlow() {
  const [state, setState] = useState<FlowState>({
    currentStep: 'welcome',
    needs: '',
    industry: '',
    budget: '',
    timeline: '',
    results: null,
    isLoading: false
  })

  const nextStep = () => {
    const steps: FlowStep[] = ['welcome', 'needs', 'industry', 'budget', 'timeline', 'results']
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex < steps.length - 1) {
      setState(prev => ({ ...prev, currentStep: steps[currentIndex + 1] }))
    }
  }

  const prevStep = () => {
    const steps: FlowStep[] = ['welcome', 'needs', 'industry', 'budget', 'timeline', 'results']
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex > 0) {
      setState(prev => ({ ...prev, currentStep: steps[currentIndex - 1] }))
    }
  }

  const handleSubmit = async () => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      const fullDescription = `Industry: ${state.industry}. Budget: ${state.budget}. Timeline: ${state.timeline}. Needs: ${state.needs}`
      const response = await advisorAgent.analyzeNeed(fullDescription)
      setState(prev => ({ ...prev, results: response, currentStep: 'results' }))
    } catch (error) {
      console.error('Advisor error:', error)
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const resetFlow = () => {
    setState({
      currentStep: 'welcome',
      needs: '',
      industry: '',
      budget: '',
      timeline: '',
      results: null,
      isLoading: false
    })
  }

  const getStepProgress = () => {
    const steps = ['welcome', 'needs', 'industry', 'budget', 'timeline', 'results']
    const currentIndex = steps.indexOf(state.currentStep)
    return ((currentIndex + 1) / steps.length) * 100
  }

  const renderWelcomeStep = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="p-4 bg-primary/10 rounded-full">
          <Bot className="h-12 w-12 text-primary" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          How Can We Help You?
        </h2>
        <p className="text-muted-foreground text-lg">
          Let's find the perfect solutions for your project. This will only take 2 minutes!
        </p>
      </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 sm:mt-8">
         <div className="text-center p-4">
           <Sparkles className="h-8 w-8 mx-auto text-primary mb-2" />
           <h3 className="font-semibold">Strategic Roadmaps</h3>
           <p className="text-sm text-muted-foreground">Get customized implementation plans</p>
         </div>
         <div className="text-center p-4">
           <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
           <h3 className="font-semibold">Business-Focused</h3>
           <p className="text-sm text-muted-foreground">Aligned with your objectives</p>
         </div>
         <div className="text-center p-4">
           <Users className="h-8 w-8 mx-auto text-primary mb-2" />
           <h3 className="font-semibold">Expert Guidance</h3>
           <p className="text-sm text-muted-foreground">Strategic consultation and support</p>
         </div>
       </div>
    </div>
  )

  const renderNeedsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What do you need help with?
        </h2>
        <p className="text-muted-foreground">
          Describe your project, idea, or challenge in detail
        </p>
      </div>
      <div className="space-y-2">
        <Textarea
          value={state.needs}
          onChange={(e) => setState(prev => ({ ...prev, needs: e.target.value }))}
          placeholder="Tell us about your project... For example: I need a mobile app for my restaurant to handle online orders, or I want to redesign my website to improve conversions..."
          className="min-h-[120px] text-base"
          rows={5}
        />
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {state.needs.trim().length >= 5 ? '✅ Ready to continue' : 'Please provide more details (at least 5 characters)'}
          </span>
          <span className={`text-xs ${state.needs.trim().length >= 5 ? 'text-green-600' : 'text-muted-foreground'}`}>
            {state.needs.trim().length}/5 characters
          </span>
        </div>
      </div>
    </div>
  )

  const renderIndustryStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What industry are you in?
        </h2>
        <p className="text-muted-foreground">
          This helps us provide more relevant recommendations
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {industries.map((industry) => (
          <Button
            key={industry}
            variant={state.industry === industry ? 'default' : 'outline'}
            onClick={() => setState(prev => ({ ...prev, industry }))}
            className="justify-start h-auto p-4 text-left"
          >
            {industry}
          </Button>
        ))}
      </div>
    </div>
  )

  const renderBudgetStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What's your budget range?
        </h2>
        <p className="text-muted-foreground">
          This helps us recommend solutions within your investment range
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {budgetRanges.map((budget) => (
          <Button
            key={budget}
            variant={state.budget === budget ? 'default' : 'outline'}
            onClick={() => setState(prev => ({ ...prev, budget }))}
            className="justify-start h-auto p-4 text-left"
          >
            {budget}
          </Button>
        ))}
      </div>
    </div>
  )

  const renderTimelineStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          When do you need this completed?
        </h2>
        <p className="text-muted-foreground">
          This helps us plan the project timeline
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {timelineOptions.map((timeline) => (
          <Button
            key={timeline}
            variant={state.timeline === timeline ? 'default' : 'outline'}
            onClick={() => setState(prev => ({ ...prev, timeline }))}
            className="justify-start h-auto p-4 text-left"
          >
            {timeline}
          </Button>
        ))}
      </div>
    </div>
  )

  const renderResultsStep = () => {
    if (!state.results) return null

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Here's How We Can Help!
          </h2>
          <p className="text-muted-foreground">
            Based on your requirements, here are our recommendations
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {state.results.message}
          </div>
        </div>

                 {state.results.recommendations && state.results.recommendations.length > 0 && (
           <div className="space-y-4">
             <h3 className="text-lg font-semibold">Strategic Services:</h3>
             <div className="grid gap-4">
               {state.results.recommendations.map((rec, index) => (
                 <Card key={index} className="border-primary/20">
                   <CardHeader className="pb-3">
                     <CardTitle className="text-base">{rec.title}</CardTitle>
                     <CardDescription>{rec.description}</CardDescription>
                   </CardHeader>
                   <CardContent className="pt-0">
                     <div className="space-y-3">
                       {rec.timeline && (
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                           <Clock className="h-4 w-4" />
                           <span>Timeline: {rec.timeline}</span>
                         </div>
                       )}
                       {rec.roadmap && rec.roadmap.length > 0 && (
                         <div className="space-y-2">
                           <h4 className="text-sm font-medium text-foreground">Implementation Roadmap:</h4>
                           <div className="space-y-1">
                             {rec.roadmap.map((step, stepIndex) => (
                               <div key={stepIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                                 <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                 <span>{step}</span>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}
                     </div>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </div>
         )}

         {state.results.roadmap && state.results.roadmap.length > 0 && (
           <div className="space-y-4">
             <h3 className="text-lg font-semibold">Strategic Roadmap:</h3>
             <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
               <div className="space-y-4">
                 {state.results.roadmap.map((phase, index) => (
                   <div key={index} className="space-y-2">
                     {phase.startsWith('📋') || phase.startsWith('🎨') || phase.startsWith('⚙️') || phase.startsWith('🚀') ? (
                       <h4 className="font-semibold text-foreground">{phase}</h4>
                     ) : phase.startsWith('•') ? (
                       <div className="flex items-start gap-2 text-sm text-muted-foreground ml-4">
                         <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                         <span>{phase.substring(2)}</span>
                       </div>
                     ) : phase === '' ? (
                       <div className="h-2"></div>
                     ) : (
                       <p className="text-sm text-muted-foreground">{phase}</p>
                     )}
                   </div>
                 ))}
               </div>
             </div>
           </div>
         )}

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2">Next Steps:</h4>
          <div className="space-y-2">
            {state.results.nextSteps?.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={resetFlow} variant="outline" className="flex-1">
            Start Over
          </Button>
          <Button className="flex-1">
            Schedule Consultation
          </Button>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 'welcome':
        return renderWelcomeStep()
      case 'needs':
        return renderNeedsStep()
      case 'industry':
        return renderIndustryStep()
      case 'budget':
        return renderBudgetStep()
      case 'timeline':
        return renderTimelineStep()
      case 'results':
        return renderResultsStep()
      default:
        return renderWelcomeStep()
    }
  }

  const canProceed = () => {
    switch (state.currentStep) {
      case 'welcome':
        return true
      case 'needs':
        return state.needs.trim().length >= 5 // Reduced from 10 to 5 characters
      case 'industry':
        return state.industry !== ''
      case 'budget':
        return state.budget !== ''
      case 'timeline':
        return state.timeline !== ''
      default:
        return true
    }
  }

  const isLastStep = state.currentStep === 'timeline'
  const isResultsStep = state.currentStep === 'results'

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Business Advisor</CardTitle>
                <CardDescription className="text-sm">
                  Step {['welcome', 'needs', 'industry', 'budget', 'timeline', 'results'].indexOf(state.currentStep) + 1} of 6
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <span className="text-xs sm:text-sm text-muted-foreground">2 min</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          {!isResultsStep && (
            <div className="flex justify-between mt-6 sm:mt-8 gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={state.currentStep === 'welcome'}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Back</span>
              </Button>

              {isLastStep ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || state.isLoading}
                  className="flex items-center gap-2 flex-1 sm:flex-none"
                >
                  {state.isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">Analyzing...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Get Recommendations</span>
                      <span className="sm:hidden">Get Results</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 flex-1 sm:flex-none"
                  title={!canProceed() ? `Please complete the current step to continue` : ''}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 