import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'React Router 7 CMS',
  
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ip6waw2s',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  
  plugins: [deskTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
}) 