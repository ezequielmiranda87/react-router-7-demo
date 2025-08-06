# Static Site Generation

This project now supports static site generation (SSG) with content pre-fetched from Sanity CMS at build time.

## 🚀 How It Works

### Build Process
1. **Data Fetching**: At app startup, all content is fetched from Sanity CMS
2. **Static Caching**: Content is cached in memory for subsequent loads
3. **Fallback Data**: If CMS is unavailable, fallback content is used
4. **Static Output**: Final build contains pre-fetched content

### Architecture
- **Hybrid Approach**: Static data with dynamic fallback
- **Runtime Fetching**: Content fetched at app startup
- **Memory Caching**: Data cached for faster subsequent loads
- **SEO Optimized**: Content available immediately for search engines

## 📦 Available Scripts

```bash
# Standard build (dynamic content)
npm run build

# Static generation build
npm run build:static

# Test static build
npm run preview:static    # Vite preview server
npm run serve:static      # Lightweight static server
```

## 🔧 Configuration

### Environment Variables
Ensure your `.env.local` file contains:
```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your-token-here
```

### Build Modes
- **Development**: Dynamic content fetching with hot reload
- **Production**: Standard build with dynamic content
- **Static Mode**: Pre-fetched content with caching

## 📁 Generated Files

After static build, you'll find:
```
dist/
├── index.html          # Static HTML
├── assets/             # Static assets
└── ...                 # Other static files
```

## 🎯 Benefits

### Performance
- ✅ **Faster Subsequent Loads**: Content cached in memory
- ✅ **Better SEO**: Content available immediately
- ✅ **Reduced API Calls**: Single fetch at startup
- ✅ **CDN Friendly**: Static files cache well

### Reliability
- ✅ **Fallback Content**: Works without CMS
- ✅ **Build-time Validation**: Content errors caught early
- ✅ **Consistent Output**: Same content for all users

### Development
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Hot Reload**: Development mode unchanged
- ✅ **Easy Deployment**: Standard static hosting

## 🔄 Content Updates

### Development
- Content updates immediately in development mode
- No build required for content changes

### Production
- Content updates require app restart
- Use `npm run build:static` to rebuild
- Consider CI/CD for automatic rebuilds

## 🚀 Deployment

### Static Hosting
```bash
# Build static site
npm run build:static

# Deploy dist/ folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3
# - Any static host
```

### Example Netlify Configuration
```toml
[build]
  command = "npm run build:static"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

## 🔍 Debugging

### Build Issues
```bash
# Check build logs
npm run build:static

# Test static build
npm run preview:static

# Verify static data
npm run dev
```

### Content Issues
```bash
# Test content fetching
npm run sanity:test-content

# Check fallback data
npm run dev

# Verify static build
npm run build:static

# Test static build
npm run preview:static
```

## 📚 Technical Details

### Static Data Flow
1. `src/main.tsx` - App startup data fetching
2. `src/lib/static-data.ts` - Data management and fallbacks
3. Component updates - Use cached data first, fallback to dynamic

### Fallback Strategy
1. **Cached Data**: Use app startup fetched content
2. **Dynamic Fetching**: Fallback to runtime API calls
3. **Fallback Content**: Use hardcoded content as last resort

### Build Optimization
- Content fetched once at app startup
- Cached data for subsequent loads
- Minimal bundle size increase
- Full TypeScript support maintained

## 🎉 Ready to Use

Your React Router 7 project now supports static site generation with:
- ✅ App startup content fetching
- ✅ SEO optimization
- ✅ Performance improvements
- ✅ Reliable fallbacks
- ✅ Easy deployment

**Build and deploy your static site today!** 🚀 