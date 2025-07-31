import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { lazy, Suspense } from 'react'

// Lazy load all route components
const Home = lazy(() => import('./routes/Home').then(module => ({ default: module.Home })))
const Services = lazy(() => import('./routes/Services').then(module => ({ default: module.Services })))
const About = lazy(() => import('./routes/About').then(module => ({ default: module.About })))
const Contact = lazy(() => import('./routes/Contact').then(module => ({ default: module.Contact })))

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="container py-12">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]) 