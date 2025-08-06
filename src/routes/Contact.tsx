import { useState, useEffect } from 'react'
import { getContactPage } from '../lib/sanity-queries'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { getStaticData, fallbackData } from '../lib/static-data'
import type { ContactPage } from '../lib/sanity'

export function Contact() {
  const [contactData, setContactData] = useState<ContactPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    const loadContactData = async () => {
      try {
        // First try to get static data
        const staticData = getStaticData()
        if (staticData?.contactPage) {
          setContactData(staticData.contactPage)
          setLoading(false)
          return
        }

        // Fallback to dynamic fetching
        const data = await getContactPage()
        setContactData(data)
      } catch (err) {
        // Use fallback data if all else fails
        setContactData(fallbackData.contactPage)
        console.error('Error loading contact data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadContactData()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="container py-6 sm:py-12">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error || !contactData) {
    return (
      <div className="container py-6 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
              Get in touch with us to discuss your project or ask any questions.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or question..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {contactData.title}
          </h1>
          {contactData.content && contactData.content.length > 0 && (
            <div className="mt-4 sm:mt-6 prose prose-base sm:prose-lg mx-auto">
              {contactData.content.map((block: any, index: number) => {
                if (block._type === 'block') {
                  return (
                    <p key={index} className="text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
                      {block.children?.[0]?.text || ''}
                    </p>
                  )
                }
                return null
              })}
            </div>
          )}
        </div>
        
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or question..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Get in touch with us directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactData.email && (
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href={`mailto:${contactData.email}`} className="text-primary hover:underline">
                    {contactData.email}
                  </a>
                </div>
              )}
              
              {contactData.phone && (
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <a href={`tel:${contactData.phone}`} className="text-primary hover:underline">
                    {contactData.phone}
                  </a>
                </div>
              )}
              
              {contactData.address && (
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-muted-foreground">{contactData.address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 