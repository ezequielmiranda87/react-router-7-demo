// Browser-based OpenRouter test
// Copy and paste this into your browser console on your site

const testOpenRouterInBrowser = async () => {
  console.log('🧪 Testing OpenRouter in Browser...')
  
  // Get API key from environment (should be available in Vite)
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  
  if (!apiKey) {
    console.log('❌ No API key found!')
    console.log('💡 Make sure VITE_OPENROUTER_API_KEY is set in .env.local')
    return
  }
  
  console.log('✅ API key found:', apiKey.substring(0, 10) + '...')
  
  try {
    // Test 1: Simple chat completion with free model
    console.log('\n💬 Testing chat completion with free model...')
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Browser Test'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'user',
            content: 'Hello! Can you give me a brief strategic analysis for a business looking to digitize their operations? Keep it under 100 words.'
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Chat API failed: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }
    
    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'No response'
    
    console.log('✅ Chat API working!')
    console.log('🤖 Response:', aiResponse)
    console.log('💰 Model: deepseek/deepseek-r1-0528:free (FREE!)')
    
    // Test 2: Test with your advisor agent
    console.log('\n🎯 Testing with your advisor agent...')
    
    // Import the advisor agent
    const { advisorAgent } = await import('/src/lib/ai-providers/index.js')
    
    const result = await advisorAgent.analyzeNeed('I need help with mobile app development for my startup')
    
    console.log('✅ Advisor agent working!')
    console.log('📊 Result:', {
      provider: result.provider,
      cost: result.cost,
      confidence: result.confidence,
      recommendations: result.recommendations?.length || 0,
      message: result.message.substring(0, 100) + '...'
    })
    
    console.log('\n🎉 All tests passed! Your OpenRouter integration is working perfectly!')
    console.log('🚀 You can now use the advisor on your website with the free DeepSeek R1 model.')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    
    if (error.message.includes('401')) {
      console.log('💡 This usually means:')
      console.log('   - Invalid API key')
      console.log('   - API key doesn\'t start with "sk-or-"')
      console.log('   - Account has no credits (but free model should work)')
    } else if (error.message.includes('429')) {
      console.log('💡 Rate limit exceeded. Try again in a moment.')
    } else if (error.message.includes('404')) {
      console.log('💡 Model not found. Check if the model name is correct.')
    }
  }
}

// Run the test
testOpenRouterInBrowser() 