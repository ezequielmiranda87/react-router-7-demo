import { client } from './sanity'

// Utility function to handle Sanity queries with error handling
export async function fetchSanityData<T>(
  query: string,
  fallback?: T
): Promise<T | null> {
  try {
    const data = await client.fetch<T>(query)
    return data
  } catch (error) {
    console.error('Error fetching data from Sanity:', error)
    return fallback || null
  }
}

// Utility function to check if Sanity is configured
export function isSanityConfigured(): boolean {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
  const dataset = import.meta.env.VITE_SANITY_DATASET
  
  return !!(projectId && dataset && projectId !== 'your-project-id')
}

// Utility function to get image URL with fallback
export function getImageUrl(image: any, fallback?: string): string {
  if (!image) return fallback || ''
  
  try {
    const { urlFor } = require('./sanity')
    return urlFor(image).url()
  } catch (error) {
    console.error('Error generating image URL:', error)
    return fallback || ''
  }
}

// Utility function to format Sanity block content
export function formatBlockContent(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  return blocks
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child: any) => child.text || '')
          .join('')
      }
      return ''
    })
    .join('\n')
    .trim()
} 