import { getHomePage, getServices, getAboutPage, getContactPage, getSiteSettings } from './sanity-queries'
import type { HomePage, Service, AboutPage, ContactPage } from './sanity'

// Fallback data for static generation when CMS is not available
export const fallbackData = {
  homePage: {
    _id: 'fallback-home',
    title: 'Welcome to React Router 7 Starter',
    subtitle: 'Modern Web Development',
    description: 'A modern starter template built with React Router 7 (Data Router mode) and ShadCN UI. This project demonstrates lazy loading, loaders, and a clean component architecture.',
    ctaText: 'Learn More',
    ctaLink: 'https://reactrouter.com/'
  } as HomePage,
  
  services: [
    {
      _id: 'service-1',
      title: 'Web Development',
      description: 'Modern web applications built with React, TypeScript, and best practices.',
      icon: '💻',
      slug: { current: 'web-development' }
    },
    {
      _id: 'service-2', 
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces designed for optimal user experience.',
      icon: '🎨',
      slug: { current: 'ui-ux-design' }
    },
    {
      _id: 'service-3',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications using React Native and modern frameworks.',
      icon: '📱',
      slug: { current: 'mobile-development' }
    },
    {
      _id: 'service-4',
      title: 'Consulting',
      description: 'Expert guidance on technology choices, architecture, and development strategies.',
      icon: '🤝',
      slug: { current: 'consulting' }
    }
  ] as Service[],
  
  aboutPage: {
    _id: 'fallback-about',
    title: 'About Us',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'We are a passionate team of developers and designers dedicated to creating exceptional digital experiences. With years of experience in modern web technologies, we help businesses and individuals bring their ideas to life through innovative solutions.'
          }
        ]
      },
      {
        _type: 'block', 
        children: [
          {
            text: 'Our approach combines cutting-edge technology with timeless design principles, ensuring that every project we work on is not only functional and performant but also beautiful and user-friendly.'
          }
        ]
      }
    ]
  } as AboutPage,
  
  contactPage: {
    _id: 'fallback-contact',
    title: 'Contact Us',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'Get in touch with us to discuss your project or ask any questions. We\'re here to help bring your ideas to life.'
          }
        ]
      }
    ],
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345'
  } as ContactPage
}

// Function to fetch all data for static generation
export async function fetchAllData() {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const [homePage, services, aboutPage, contactPage, siteSettings] = await Promise.all([
        getHomePage().catch(() => fallbackData.homePage),
        getServices().catch(() => fallbackData.services),
        getAboutPage().catch(() => fallbackData.aboutPage),
        getContactPage().catch(() => fallbackData.contactPage),
        getSiteSettings().catch(() => null)
      ])

      return {
        homePage,
        services,
        aboutPage,
        contactPage,
        siteSettings
      }
    } else {
      // Server-side or build-time: return fallback data
      return {
        homePage: fallbackData.homePage,
        services: fallbackData.services,
        aboutPage: fallbackData.aboutPage,
        contactPage: fallbackData.contactPage,
        siteSettings: null
      }
    }
  } catch (error) {
    console.warn('Failed to fetch data from CMS, using fallback data:', error)
    return {
      homePage: fallbackData.homePage,
      services: fallbackData.services,
      aboutPage: fallbackData.aboutPage,
      contactPage: fallbackData.contactPage,
      siteSettings: null
    }
  }
}

// Export static data for use in components
export let staticData: Awaited<ReturnType<typeof fetchAllData>> | null = null

// Function to set static data (called during build)
export function setStaticData(data: Awaited<ReturnType<typeof fetchAllData>>) {
  staticData = data
}

// Function to get static data
export function getStaticData() {
  return staticData
} 