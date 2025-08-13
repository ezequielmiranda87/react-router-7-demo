# React Router 7 + Sanity CMS

A modern website built with React Router 7 and Sanity CMS, featuring dynamic content management with real-time updates.

## 🚀 Quick Start

### Prerequisites

1. **Node.js 18+** installed
2. **Sanity account** at [sanity.io](https://sanity.io)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Sanity project details
   ```

3. **Create content:**
   ```bash
   npm run sanity:create-content
   ```

4. **Start development:**
   ```bash
   # Terminal 1: Start Sanity Studio
   npm run sanity:studio
   
   # Terminal 2: Start React app
   npm run dev
   ```

### Static Site Generation

This project now supports static site generation with content pre-fetched from Sanity CMS:

```bash
# Build static site with CMS data
npm run build:static

# Test static build with Vite preview
npm run preview:static

# Test static build with serve (lightweight server)
npm run serve:static

# Test static build (automated)
npm run test:static
```

See [STATIC_GENERATION.md](./STATIC_GENERATION.md) for detailed documentation.

## 📦 Available Scripts

```bash
# Development
npm run dev                    # Start React development server
npm run build                  # Build for production
npm run preview                # Preview production build

# Static Generation
npm run build:static           # Build static site
npm run preview:static         # Preview static build (Vite)
npm run serve:static           # Serve static build (lightweight)
npm run test:static            # Test static build (automated)
```

# Sanity CMS
npm run sanity:studio          # Start Sanity Studio
npm run sanity:deploy          # Deploy Sanity Studio
npm run sanity:create-content  # Create sample content
npm run sanity:test-content    # Check content status

# Code Quality
npm run lint                   # Run ESLint
```

## 🏗️ Project Structure

```
react-router-7/
├── src/
│   ├── components/           # React components
│   ├── routes/              # Page components (Home, Services, About, Contact)
│   ├── lib/
│   │   ├── sanity.ts        # Sanity client configuration
│   │   ├── sanity-queries.ts # GROQ queries
│   │   └── sanity-utils.ts  # Utility functions
│   └── App.tsx              # Main app with routing
├── scripts/
│   ├── create-content.js    # Content creation script
│   └── test-content.js      # Content testing script
├── sanity-studio/           # Sanity Studio (CMS interface)
└── SANITY_INTEGRATION_GUIDE.md # Complete integration guide
```

## 🎯 Features

- ✅ **React Router 7** - Latest routing with dynamic data loading
- ✅ **Sanity CMS** - Headless CMS for content management
- ✅ **Static Site Generation** - Build-time content pre-fetching
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **ShadCN UI** - Beautiful component library from [TweakCN](https://tweakcn.com/)
- ✅ **Real-time Updates** - Content changes reflect immediately
- ✅ **Error Handling** - Robust error states and loading indicators
- ✅ **Sample Content** - Ready-to-use content structure
- ✅ **SEO Optimized** - Static generation for better search engine visibility

## 🌐 Content Types

- **Home Page** - Hero section with CTA
- **Services** - Service offerings with icons
- **About Page** - Company information
- **Contact Page** - Contact form and information
- **Site Settings** - Global site configuration

## 🔧 Environment Variables

Create a `.env.local` file:

```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your-token-here
```

## 🚀 Deployment

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy Sanity Studio
npm run sanity:deploy

# Deploy your React app to your preferred platform
```

## 📚 Documentation

- [SANITY_INTEGRATION_GUIDE.md](./SANITY_INTEGRATION_GUIDE.md) - Complete integration guide
- [React Router 7 Docs](https://reactrouter.com/)
- [Sanity Documentation](https://www.sanity.io/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details. 