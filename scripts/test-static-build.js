#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

console.log('🧪 Testing static build...')

try {
  // Step 1: Build the static site
  console.log('📦 Building static site...')
  execSync('npm run build:static', { cwd: projectRoot, stdio: 'inherit' })

  // Step 2: Check if dist folder exists
  const distPath = join(projectRoot, 'dist')
  if (!existsSync(distPath)) {
    throw new Error('dist folder not found after build')
  }

  // Step 3: Check if index.html exists
  const indexPath = join(distPath, 'index.html')
  if (!existsSync(indexPath)) {
    throw new Error('index.html not found in dist folder')
  }

  // Step 4: Check if assets folder exists
  const assetsPath = join(distPath, 'assets')
  if (!existsSync(assetsPath)) {
    throw new Error('assets folder not found in dist folder')
  }

  // Step 5: Read index.html to verify content
  const indexContent = readFileSync(indexPath, 'utf8')
  if (!indexContent.includes('<html')) {
    throw new Error('index.html does not contain valid HTML')
  }

  console.log('✅ Static build test passed!')
  console.log('📁 Build output: dist/')
  console.log('🌐 To preview: npm run preview:static')
  console.log('🚀 To serve: npm run serve:static')

} catch (error) {
  console.error('❌ Static build test failed:', error.message)
  process.exit(1)
} 