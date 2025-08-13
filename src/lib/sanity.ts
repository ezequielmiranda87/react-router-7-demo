import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'ip6waw2s',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
  token: import.meta.env.VITE_SANITY_TOKEN, // Only needed for write operations
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Type definitions for Sanity content
export type HomePage = {
  _id: string
  title: string
  subtitle: string
  description: string
  heroImage?: any
  ctaText?: string
  ctaLink?: string
}

export type Service = {
  _id: string
  title: string
  description: string
  icon?: string
  image?: any
  slug: { current: string }
}

export type AboutPage = {
  _id: string
  title: string
  content: any[]
  image?: any
}

export type ContactPage = {
  _id: string
  title: string
  content: any[]
  email?: string
  phone?: string
  address?: string
} 