// Simple test script to verify OpenRouter API key
// Run with: node test-openrouter-key.js

// Load environment variables from .env.local
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local file
try {
  const envPath = join(__dirname, '.env.local')
  const envContent = readFileSync(envPath, 'utf8')
  
  // Parse environment variables
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim()
      if (value && !key.startsWith('#')) {
        process.env[key.trim()] = value.replace(/^["']|["']$/g, '')
      }
    }
  })
} catch (error) {
  console.log('⚠️  Could not load .env.local file:', error.message)
}

const testOpenRouterKey = async () => {
  console.log('🧪 Testing OpenRouter API Key...')
  
  // Get API key from environment (you'll need to set this)
  const apiKey = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY
  
  if (!apiKey) {
    console.log('❌ No API key found!')
    console.log('💡 Set your API key:')
    console.log('   export VITE_OPENROUTER_API_KEY=sk-or-your-key-here')
    console.log('   or add it to your .env file')
    return
  }
  
  console.log('✅ API key found:', apiKey.substring(0, 10) + '...')
  
  try {
    // Test 1: Fetch available models
    console.log('\n📋 Testing model list...')
    const modelsResponse = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000'
      }
    })
    
    if (!modelsResponse.ok) {
      throw new Error(`Models API failed: ${modelsResponse.status} - ${modelsResponse.statusText}`)
    }
    
    const modelsData = await modelsResponse.json()
    console.log('✅ Models API working!')
    console.log(`📊 Available models: ${modelsData.data?.length || 0}`)
    
    // Show some popular models
    const popularModels = modelsData.data?.filter(m => 
      m.id.includes('deepseek') || m.id.includes('gpt-4') || m.id.includes('claude')
    ).slice(0, 5)
    
    if (popularModels) {
      console.log('🎯 Popular models:')
      popularModels.forEach(m => console.log(`   - ${m.id}`))
    }
    
    // Test 2: Simple chat completion
    console.log('\n💬 Testing chat completion...')
    const chatResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'API Test'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'user',
            content: 'Hello! Can you give me a brief strategic analysis for a business looking to digitize their operations?'
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    })
    
    if (!chatResponse.ok) {
      const errorData = await chatResponse.json().catch(() => ({}))
      throw new Error(`Chat API failed: ${chatResponse.status} - ${errorData.error?.message || chatResponse.statusText}`)
    }
    
    const chatData = await chatResponse.json()
    const response = chatData.choices[0]?.message?.content || 'No response'
    
    console.log('✅ Chat API working!')
    console.log('🤖 Response preview:', response.substring(0, 100) + '...')
    
    // Test 3: Check usage/credits
    console.log('\n💰 Checking account status...')
    try {
      const usageResponse = await fetch('https://openrouter.ai/api/v1/auth/key', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:3000'
        }
      })
      
      if (usageResponse.ok) {
        const usageData = await usageResponse.json()
        console.log('✅ Account info retrieved!')
        if (usageData.data) {
          console.log(`   Credits: ${usageData.data.credits || 'Unknown'}`)
          console.log(`   Plan: ${usageData.data.plan || 'Unknown'}`)
        }
      }
    } catch (error) {
      console.log('⚠️  Could not check account status:', error.message)
    }
    
    console.log('\n🎉 All tests passed! Your OpenRouter API key is working correctly.')
    console.log('\n🚀 You can now use it in your application:')
    console.log('   VITE_AI_PROVIDER=openrouter')
    console.log('   VITE_OPENROUTER_API_KEY=sk-or-your-key-here')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    
    if (error.message.includes('401')) {
      console.log('💡 This usually means:')
      console.log('   - Invalid API key')
      console.log('   - API key doesn\'t start with "sk-or-"')
      console.log('   - Account has no credits')
    } else if (error.message.includes('429')) {
      console.log('💡 Rate limit exceeded. Try again in a moment.')
    }
  }
}

// Run the test
testOpenRouterKey().catch(console.error) 