import { useEffect, useState } from 'react'
import { getAboutPage } from '../lib/sanity-queries'
import { urlFor } from '../lib/sanity'
import { getStaticData, fallbackData } from '../lib/static-data'
import type { AboutPage } from '../lib/sanity'

export function About() {
  const [aboutData, setAboutData] = useState<AboutPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        // First try to get static data
        const staticData = getStaticData()
        if (staticData?.aboutPage) {
          setAboutData(staticData.aboutPage)
          setLoading(false)
          return
        }

        // Fallback to dynamic fetching
        const data = await getAboutPage()
        setAboutData(data)
      } catch (err) {
        // Use fallback data if all else fails
        setAboutData(fallbackData.aboutPage)
        console.error('Error loading about data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAboutData()
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

  if (error || !aboutData) {
    return (
      <div className="container py-6 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              About Us
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              Learn more about our team and mission.
            </p>
          </div>
          
          <div className="prose prose-base sm:prose-lg mx-auto">
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground mb-6 sm:mb-8">
              We are a passionate team of developers and designers dedicated to creating exceptional digital experiences. 
              With years of experience in modern web technologies, we help businesses and individuals bring their 
              ideas to life through innovative solutions.
            </p>
            
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground mb-6 sm:mb-8">
              Our approach combines cutting-edge technology with timeless design principles, ensuring that every 
              project we work on is not only functional and performant but also beautiful and user-friendly. 
              We believe in the power of collaboration and work closely with our clients to understand their 
              unique needs and goals.
            </p>
            
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              Whether you're a startup looking to build your first product or an established company seeking 
              to modernize your digital presence, we have the expertise and passion to help you succeed. 
              Let's work together to create something amazing.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {aboutData.title}
          </h1>
        </div>
        
        {aboutData.image && (
          <div className="mb-6 sm:mb-8 text-center">
            <img
              src={urlFor(aboutData.image).url()}
              alt={aboutData.title}
              className="mx-auto rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-2xl"
            />
          </div>
        )}
        
        <div className="prose prose-base sm:prose-lg mx-auto">
          {aboutData.content && aboutData.content.length > 0 ? (
            aboutData.content.map((block: any, index: number) => {
              if (block._type === 'block') {
                return (
                  <p key={index} className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground mb-6 sm:mb-8">
                    {block.children?.[0]?.text || ''}
                  </p>
                )
              }
              return null
            })
          ) : (
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              Content coming soon...
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 