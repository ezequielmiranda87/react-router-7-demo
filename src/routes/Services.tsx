import { useLoaderData } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

type Service = {
  id: number
  title: string
  description: string
  price: string
}

export async function loader() {
  // Simulate API call with static data
  const services: Service[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices.",
      price: "$2,500 - $15,000"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      price: "$5,000 - $25,000"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces with exceptional user experience.",
      price: "$1,500 - $8,000"
    },
    {
      id: 4,
      title: "Consulting",
      description: "Technical consulting and architecture guidance for your projects.",
      price: "$150/hour"
    }
  ]
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return { services }
}

export function Services() {
  const { services } = useLoaderData() as { services: Service[] }

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
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 