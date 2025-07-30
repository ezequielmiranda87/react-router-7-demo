# React Router 7 Starter

A modern starter template built with React Router 7 (Data Router mode) and ShadCN UI. This project demonstrates lazy loading, loaders, and a clean component architecture.

## Features

- ⚡ **React Router 7** - Latest version with Data Router mode
- 🎨 **ShadCN UI** - Beautiful, accessible components
- 🚀 **Lazy Loading** - All routes are code-split and lazy-loaded
- 📊 **Loaders** - Example of using loaders for data fetching
- 🎯 **TypeScript** - Full type safety
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 📱 **Responsive** - Mobile-first design

## Pages

- **Home** - Welcome page with project overview
- **Services** - Service offerings with loader example
- **About** - Company information
- **Contact** - Contact form with ShadCN UI components

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Apply ShadCN Theme (Optional)

To apply the Solar Dusk theme as mentioned in the requirements:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/solar-dusk.json
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── ui/           # ShadCN UI components
│   ├── Layout.tsx    # Main layout with navbar/footer
│   ├── Navbar.tsx    # Navigation component
│   └── Footer.tsx    # Footer component
├── routes/
│   ├── Home.tsx      # Home page
│   ├── Services.tsx  # Services page with loader
│   ├── About.tsx     # About page
│   └── Contact.tsx   # Contact form page
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Router configuration
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Key Features Explained

### Lazy Loading
All route components are lazy-loaded using React's `lazy()` function and `Suspense`. This improves initial bundle size and loading performance.

### Loaders
The Services page demonstrates React Router 7's loader functionality, which allows data fetching before the component renders. The loader simulates an API call with a 500ms delay.

### ShadCN UI Components
The project uses several ShadCN UI components:
- Button
- Card (with Header, Content, Description, Title)
- Input
- Label
- Textarea

### Responsive Design
The layout is fully responsive with mobile-first design using TailwindCSS utility classes.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Adding New Routes
1. Create a new component in `src/routes/`
2. Add the lazy import in `src/App.tsx`
3. Add the route configuration to the router

### Styling
The project uses TailwindCSS with ShadCN UI's design system. CSS variables for theming are defined in `src/index.css`.

## Dependencies

- React 18.2.0
- React Router DOM 7.0.0
- ShadCN UI components
- TailwindCSS 3.3.6
- TypeScript 5.2.2
- Vite 5.0.8

## Browser Support

This project supports all modern browsers that support ES modules and React 18.

## License

MIT 