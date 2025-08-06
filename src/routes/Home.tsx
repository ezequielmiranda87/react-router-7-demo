import { useEffect, useState } from 'react'
import { getHomePage } from '../lib/sanity-queries'
import { urlFor } from '../lib/sanity'
import { getStaticData, fallbackData } from '../lib/static-data'
import type { HomePage } from '../lib/sanity'
import { AdvisorFlow } from '../components/AdvisorFlow'

export function Home() {
  const [homeData, setHomeData] = useState<HomePage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // First try to get static data
        const staticData = getStaticData()
        if (staticData?.homePage) {
          setHomeData(staticData.homePage)
          setLoading(false)
          return
        }

        // Fallback to dynamic fetching
        const data = await getHomePage()
        setHomeData(data)
      } catch (err) {
        // Use fallback data if all else fails
        setHomeData(fallbackData.homePage)
        console.error('Error loading home data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error || !homeData) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to React Router 7 Starter
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A modern starter template built with React Router 7 (Data Router mode) and ShadCN UI.
            This project demonstrates lazy loading, loaders, and a clean component architecture.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://reactrouter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Learn React Router 7
            </a>
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-foreground"
            >
              Explore ShadCN UI <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl text-center">
        {homeData.heroImage && (
          <div className="mb-8">
            <img
              src={urlFor(homeData.heroImage).url()}
              alt={homeData.title}
              className="mx-auto rounded-lg shadow-lg max-w-2xl"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {homeData.title}
        </h1>
        {homeData.subtitle && (
          <h2 className="mt-4 text-2xl font-semibold text-muted-foreground">
            {homeData.subtitle}
          </h2>
        )}
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {homeData.description}
        </p>
        {homeData.ctaText && homeData.ctaLink && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={homeData.ctaLink}
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              {homeData.ctaText}
            </a>
          </div>
        )}
        
        {/* AI Advisor Flow */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get Strategic Roadmaps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us about your project and get strategic recommendations, implementation roadmaps, and expert guidance in just 2 minutes.
            </p>
          </div>
          <AdvisorFlow />
        </div>
      </div>
    </div>
  )
} 