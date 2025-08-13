// Simple test for advisor agent functionality
import { advisorAgent } from './advisor-agent'

// Test cases for different user inputs
const testCases = [
  {
    input: "I need help building a mobile app for my restaurant",
    expectedKeywords: ['mobile', 'app', 'restaurant'],
    description: "Mobile app development request"
  },
  {
    input: "Looking for website design and development",
    expectedKeywords: ['website', 'design', 'development'],
    description: "Website development request"
  },
  {
    input: "Need ecommerce solution for online store",
    expectedKeywords: ['ecommerce', 'online store'],
    description: "Ecommerce request"
  },
  {
    input: "Want to integrate payment processing",
    expectedKeywords: ['integration', 'payment'],
    description: "API integration request"
  }
]

export async function testAdvisorAgent() {
  console.log('🧪 Testing Advisor Agent...')
  
  for (const testCase of testCases) {
    try {
      const response = await advisorAgent.analyzeNeed(testCase.input)
      
      console.log(`\n✅ ${testCase.description}`)
      console.log(`Input: "${testCase.input}"`)
      console.log(`Response: ${response.message.substring(0, 100)}...`)
      console.log(`Confidence: ${response.confidence}`)
      console.log(`Recommendations: ${response.recommendations?.length || 0}`)
      
      // Check if response contains expected keywords
      const hasExpectedKeywords = testCase.expectedKeywords.some(keyword => 
        response.message.toLowerCase().includes(keyword)
      )
      
      if (hasExpectedKeywords) {
        console.log('✅ Response contains relevant keywords')
      } else {
        console.log('⚠️ Response may not be relevant')
      }
      
    } catch (error) {
      console.error(`❌ Test failed for "${testCase.description}":`, error)
    }
  }
  
  console.log('\n🎉 Advisor Agent testing completed!')
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - can be called from console
  (window as any).testAdvisorAgent = testAdvisorAgent
} 