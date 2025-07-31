#!/usr/bin/env node

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local')
let envVars = {}
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      envVars[key.trim()] = value.trim()
    }
  })
}

const client = createClient({
  projectId: envVars.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
  dataset: envVars.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: envVars.VITE_SANITY_TOKEN || process.env.VITE_SANITY_TOKEN,
})

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warning: '\x1b[33m'  // Yellow
  }
  const reset = '\x1b[0m'
  console.log(`${colors[type]}${message}${reset}`)
}

async function main() {
  try {
    log('🔍 Checking content in Sanity...', 'info')
    
    // Check for different document types
    const documentTypes = ['homePage', 'service', 'aboutPage', 'contactPage', 'siteSettings']
    
    for (const docType of documentTypes) {
      try {
        const query = `*[_type == "${docType}"]`
        const documents = await client.fetch(query)
        log(`📄 ${docType}: ${documents.length} documents found`, documents.length > 0 ? 'success' : 'warning')
        
        if (documents.length > 0) {
          documents.forEach(doc => {
            log(`  - ${doc.title || doc._id}`, 'info')
          })
        }
      } catch (error) {
        log(`❌ Error checking ${docType}: ${error.message}`, 'error')
      }
    }
    
    log('\n🎉 Content check completed!', 'success')
    
  } catch (error) {
    log(`❌ Error checking content: ${error.message}`, 'error')
    process.exit(1)
  }
}

main() 