import { useEffect, useState } from 'react'
import { getServices } from '../lib/sanity-queries'
import { urlFor } from '../lib/sanity'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import type { Service } from '../lib/sanity'

export function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices()
        setServices(data)
      } catch (err) {
        setError('Failed to load services')
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
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

  if (error) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We offer a comprehensive range of development and design services to help bring your ideas to life.
          </p>
          <div className="mt-8 text-red-600">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We offer a comprehensive range of development and design services to help bring your ideas to life.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {service.image && (
                  <div className="mb-4">
                    <img
                      src={urlFor(service.image).url()}
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {service.icon && (
                  <div className="text-4xl mb-4">
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