// Simple OpenRouter test for browser console
// Copy and paste this into your browser console on http://localhost:5177/

const testOpenRouter = async () => {
  console.log('🧪 Testing OpenRouter integration...')
  
  // Check if environment variables are loaded
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'deepseek/deepseek-r1-0528:free'
  
  console.log('🔑 API Key:', apiKey ? 'Found' : 'Missing')
  console.log('🤖 Model:', model)
  
  if (!apiKey) {
    console.log('❌ No API key found! Check your .env.local file')
    return
  }
  
  try {
    console.log('\n💬 Testing simple chat...')
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Simple Test'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: 'Hello! Can you help me with a business strategy question?'
          }
        ],
        max_tokens: 100
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.log('❌ API Error:', response.status, error)
      return
    }
    
    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'No response'
    
    console.log('✅ OpenRouter working!')
    console.log('🤖 Response:', aiResponse)
    console.log('💰 Model:', model, '(FREE!)')
    
    // Test the advisor agent
    console.log('\n🎯 Testing advisor agent...')
    const { advisorAgent } = await import('/src/lib/ai-providers/index.js')
    const result = await advisorAgent.analyzeNeed('I need help with mobile app development')
    
    console.log('✅ Advisor agent working!')
    console.log('📊 Result:', {
      provider: result.provider,
      cost: result.cost,
      recommendations: result.recommendations?.length || 0,
      roadmap: result.roadmap?.length || 0
    })
    
    console.log('\n🎉 All tests passed! Your integration is working!')
    
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

// Run the test
testOpenRouter() 