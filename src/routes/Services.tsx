import { useEffect, useState } from 'react'
import { getServices } from '../lib/sanity-queries'
import { urlFor } from '../lib/sanity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { getStaticData, fallbackData } from '../lib/static-data'
import type { Service } from '../lib/sanity'

export function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        // First try to get static data
        const staticData = getStaticData()
        if (staticData?.services) {
          setServices(staticData.services)
          setLoading(false)
          return
        }

        // Fallback to dynamic fetching
        const data = await getServices()
        setServices(data)
      } catch (err) {
        // Use fallback data if all else fails
        setServices(fallbackData.services)
        console.error('Error loading services:', err)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <div className="container py-6 sm:py-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-6 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Services
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
            We offer a comprehensive range of development and design services to help bring your ideas to life.
          </p>
          <div className="mt-6 sm:mt-8 text-red-600">
            {error}
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
            Our Services
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
            We offer a comprehensive range of development and design services to help bring your ideas to life.
          </p>
        </div>
        
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {service.image && (
                  <div className="mb-4">
                    <img
                      src={urlFor(service.image).url()}
                      alt={service.title}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {service.icon && (
                  <div className="text-3xl sm:text-4xl mb-4">
                    <span role="img" aria-label={service.title}>
                      {service.icon}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 