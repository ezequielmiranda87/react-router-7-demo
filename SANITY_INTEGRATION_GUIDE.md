# Sanity CMS Integration Guide

This document outlines the complete integration of Sanity CMS with a React Router 7 project.

## 📋 Overview

The integration transforms a static React Router 7 website into a dynamic content management system where content is fetched from Sanity CMS and displayed in real-time.

## 🏗️ Architecture

- **Frontend**: React Router 7 + TypeScript + Vite
- **CMS**: Sanity (Headless CMS)
- **Content**: Dynamic fetching via Sanity Client
- **Styling**: Tailwind CSS + ShadCN UI

## 📁 Project Structure

```
react-router-7/
├── src/
│   ├── lib/
│   │   ├── sanity.ts          # Sanity client configuration
│   │   ├── sanity-queries.ts  # GROQ queries for content
│   │   └── sanity-utils.ts    # Utility functions
│   ├── routes/
│   │   ├── Home.tsx           # Updated to fetch from Sanity
│   │   ├── Services.tsx       # Updated to fetch from Sanity
│   │   ├── About.tsx          # Updated to fetch from Sanity
│   │   └── Contact.tsx        # Updated to fetch from Sanity
│   └── App.tsx                # Updated routing
├── sanity-studio/             # Sanity Studio (CMS interface)
│   ├── sanity.config.js       # Studio configuration
│   ├── schemas/               # Content schemas
│   └── .env                   # Studio environment variables
├── scripts/                   # Automation scripts
├── .env.local                 # Environment variables
└── package.json               # Updated dependencies
```

## 🔧 Integration Steps

### 1. Dependencies Installation

```bash
npm install @sanity/client @sanity/image-url next-sanity
```

### 2. Sanity Project Setup

**Manual Setup (Recommended):**
1. Go to [sanity.io](https://sanity.io)
2. Create new project: "React Router 7 CMS"
3. Note Project ID: `ip6waw2s`
4. Create API token with read/write permissions

**Local Studio Setup:**
```bash
# Create sanity-studio directory structure
mkdir sanity-studio
cd sanity-studio
npm init -y
npm install sanity @sanity/vision styled-components
```

### 3. Environment Configuration

**Create `.env.local`:**
```env
VITE_SANITY_PROJECT_ID=ip6waw2s
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your-token-here
```

**Create `sanity-studio/.env`:**
```env
SANITY_STUDIO_PROJECT_ID=ip6waw2s
SANITY_STUDIO_DATASET=production
```

### 4. Sanity Client Configuration

**`src/lib/sanity.ts`:**
```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'ip6waw2s',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

### 5. Content Schemas

**`sanity-studio/schemas/index.js`:**
```javascript
import homePage from './homePage'
import service from './service'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import siteSettings from './siteSettings'

export const schemaTypes = [
  homePage,
  service,
  aboutPage,
  contactPage,
  siteSettings
]
```

### 6. Content Queries

**`src/lib/sanity-queries.ts`:**
```typescript
import { client } from './sanity'

export const getHomePage = async () => {
  return await client.fetch(`*[_type == "homePage"][0]`)
}

export const getServices = async () => {
  return await client.fetch(`*[_type == "service"]`)
}

export const getAboutPage = async () => {
  return await client.fetch(`*[_type == "aboutPage"][0]`)
}

export const getContactPage = async () => {
  return await client.fetch(`*[_type == "contactPage"][0]`)
}
```

### 7. Component Updates

**Example: `src/routes/Home.tsx`:**
```typescript
import { useEffect, useState } from 'react'
import { getHomePage } from '../lib/sanity-queries'
import type { HomePage } from '../lib/sanity'

export default function Home() {
  const [homePage, setHomePage] = useState<HomePage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomePage()
        setHomePage(data)
      } catch (err) {
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!homePage) return <div>No content found</div>

  return (
    <div>
      <h1>{homePage.title}</h1>
      <p>{homePage.subtitle}</p>
      {/* Render content */}
    </div>
  )
}
```

### 8. Content Creation

**Automated Content Creation:**
```bash
npm run sanity:create-content
```

**Manual Content Creation:**
1. Start Sanity Studio: `cd sanity-studio && npm run dev`
2. Open http://localhost:3333
3. Create documents manually using the schemas

## 🚀 Usage

### Development

```bash
# Start Sanity Studio
cd sanity-studio && npm run dev

# Start React app (in another terminal)
npm run dev
```

### Content Management

1. **Edit Content**: Use Sanity Studio at http://localhost:3333
2. **View Changes**: Refresh React app at http://localhost:5174
3. **Real-time Updates**: Content changes are reflected immediately

### Available Scripts

```bash
npm run sanity:create-content    # Create sample content
npm run sanity:test-content      # Check content status
npm run sanity:studio            # Start Sanity Studio
npm run sanity:deploy            # Deploy Sanity Studio
```

## 🔍 Content Types

### HomePage
- `title`: Main heading
- `subtitle`: Subheading
- `heroText`: Hero section text
- `ctaText`: Call-to-action button text
- `ctaLink`: Call-to-action link
- `features`: Array of feature objects

### Service
- `title`: Service name
- `description`: Service description
- `icon`: Emoji icon
- `content`: Rich text content
- `features`: Array of features
- `price`: Service pricing
- `duration`: Service duration

### AboutPage
- `title`: Page title
- `subtitle`: Page subtitle
- `content`: Rich text content
- `team`: Array of team members
- `stats`: Array of statistics

### ContactPage
- `title`: Page title
- `subtitle`: Page subtitle
- `content`: Rich text content
- `contactInfo`: Contact details
- `socialLinks`: Social media links

### SiteSettings
- `title`: Site title
- `description`: Site description
- `navigation`: Navigation menu items
- `footer`: Footer information

## 🛠️ Troubleshooting

### Common Issues

1. **"process is not defined"**: Use `import.meta.env` instead of `process.env` in Vite
2. **"your-project-id" error**: Update project ID in configuration files
3. **Content not loading**: Check environment variables and API token
4. **Studio not starting**: Ensure `.env` file exists in sanity-studio directory

### Environment Variables

Make sure these are set correctly:
- `VITE_SANITY_PROJECT_ID`: Your Sanity project ID
- `VITE_SANITY_DATASET`: Dataset name (usually 'production')
- `VITE_SANITY_TOKEN`: API token for write operations

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [React Router 7 Documentation](https://reactrouter.com/)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Client](https://www.sanity.io/docs/js-client)

## ✅ Integration Complete

The integration is now complete with:
- ✅ Dynamic content fetching
- ✅ Real-time content updates
- ✅ Type-safe content management
- ✅ Automated content creation
- ✅ Error handling and loading states
- ✅ Responsive design maintained 