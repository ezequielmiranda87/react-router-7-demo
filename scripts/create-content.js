#!/usr/bin/env node

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local')
let envVars = {}
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      envVars[key.trim()] = value.trim()
    }
  })
}

const client = createClient({
  projectId: envVars.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
  dataset: envVars.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: envVars.VITE_SANITY_TOKEN || process.env.VITE_SANITY_TOKEN,
})

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warning: '\x1b[33m'  // Yellow
  }
  const reset = '\x1b[0m'
  console.log(`${colors[type]}${message}${reset}`)
}

async function main() {
  try {
    log('🚀 Creating content in Sanity...', 'info')
    
    // Sample content
    const documents = [
      {
        _type: 'homePage',
        title: 'Welcome to Our Amazing Website',
        subtitle: 'We create digital experiences that matter',
        heroText: 'Transform your business with cutting-edge web solutions. We specialize in creating modern, responsive websites that drive results.',
        ctaText: 'Get Started',
        ctaLink: '/contact',
        features: [
          {
            _type: 'feature',
            title: 'Modern Design',
            description: 'Beautiful, responsive designs that work on all devices',
            icon: '🎨'
          },
          {
            _type: 'feature',
            title: 'Fast Performance',
            description: 'Optimized for speed and user experience',
            icon: '⚡'
          },
          {
            _type: 'feature',
            title: 'SEO Optimized',
            description: 'Built with search engines in mind',
            icon: '🔍'
          }
        ]
      },
      {
        _type: 'service',
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies',
        icon: '💻',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We build custom web applications using the latest technologies like React, Node.js, and modern CSS frameworks. Our development process focuses on creating scalable, maintainable code that delivers exceptional user experiences.'
              }
            ]
          }
        ],
        features: ['Responsive Design', 'Modern Frameworks', 'Performance Optimized', 'SEO Friendly'],
        price: '$2,500+',
        duration: '4-8 weeks'
      },
      {
        _type: 'service',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications',
        icon: '📱',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Create powerful mobile applications for iOS and Android platforms. We use React Native and Flutter to build cross-platform apps that provide native performance and user experience.'
              }
            ]
          }
        ],
        features: ['Cross-Platform', 'Native Performance', 'App Store Ready', 'Push Notifications'],
        price: '$5,000+',
        duration: '8-12 weeks'
      },
      {
        _type: 'service',
        title: 'UI/UX Design',
        description: 'User-centered design that converts visitors into customers',
        icon: '🎨',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Our design process focuses on creating intuitive, beautiful interfaces that enhance user experience and drive conversions. We conduct user research, create wireframes, and design pixel-perfect mockups.'
              }
            ]
          }
        ],
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        price: '$1,500+',
        duration: '2-4 weeks'
      },
      {
        _type: 'service',
        title: 'Digital Marketing',
        description: 'Data-driven marketing strategies that grow your business',
        icon: '📈',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Comprehensive digital marketing services including SEO, PPC, social media marketing, and content strategy. We use data analytics to optimize campaigns and maximize ROI.'
              }
            ]
          }
        ],
        features: ['SEO Optimization', 'PPC Management', 'Social Media', 'Analytics'],
        price: '$800/month',
        duration: 'Ongoing'
      },
      {
        _type: 'aboutPage',
        title: 'About Our Company',
        subtitle: 'We are passionate about creating digital solutions that make a difference',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Founded in 2020, we are a team of passionate developers, designers, and digital marketers dedicated to helping businesses succeed in the digital world. Our mission is to create innovative solutions that drive growth and deliver exceptional user experiences.'
              }
            ]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We believe in the power of technology to transform businesses and improve lives. Every project we undertake is an opportunity to make a positive impact and help our clients achieve their goals.'
              }
            ]
          }
        ],
        team: [
          {
            _type: 'teamMember',
            name: 'John Doe',
            role: 'Lead Developer',
            bio: 'Full-stack developer with 8+ years of experience in modern web technologies.'
          },
          {
            _type: 'teamMember',
            name: 'Jane Smith',
            role: 'UI/UX Designer',
            bio: 'Creative designer focused on user experience and modern design principles.'
          }
        ],
        stats: [
          { label: 'Projects Completed', value: '150+' },
          { label: 'Happy Clients', value: '50+' },
          { label: 'Years Experience', value: '5+' },
          { label: 'Team Members', value: '8' }
        ]
      },
      {
        _type: 'contactPage',
        title: 'Get In Touch',
        subtitle: 'Ready to start your next project? Let\'s talk!',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'We\'d love to hear about your project and discuss how we can help bring your vision to life. Get in touch with us today for a free consultation and quote.'
              }
            ]
          }
        ],
        contactInfo: {
          email: 'hello@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main Street, City, State 12345',
          hours: 'Monday - Friday: 9:00 AM - 6:00 PM'
        },
        socialLinks: [
          { platform: 'Twitter', url: 'https://twitter.com/example' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/example' },
          { platform: 'GitHub', url: 'https://github.com/example' }
        ]
      },
      {
        _type: 'siteSettings',
        title: 'React Router 7 + Sanity CMS',
        description: 'A modern website built with React Router 7 and Sanity CMS',
        navigation: [
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' }
        ],
        footer: {
          copyright: '© 2024 Your Company. All rights reserved.',
          links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' }
          ]
        }
      }
    ]

    log(`📝 Creating ${documents.length} documents...`, 'info')
    
    const results = []
    for (const doc of documents) {
      try {
        const result = await client.create(doc)
        results.push(result)
        log(`✅ Created ${doc._type}: ${doc.title}`, 'success')
      } catch (error) {
        log(`❌ Failed to create ${doc._type}: ${error.message}`, 'error')
      }
    }

    log(`\n🎉 Content creation completed!`, 'success')
    log(`✅ Successfully created ${results.length} documents`, 'success')
    
    if (results.length > 0) {
      log('\n📋 Created documents:', 'info')
      results.forEach(doc => {
        log(`  - ${doc._type}: ${doc.title}`, 'info')
      })
    }

    log('\n🚀 Next steps:', 'info')
    log('1. Open Sanity Studio at http://localhost:3333', 'info')
    log('2. View your React app at http://localhost:5174', 'info')
    log('3. Edit content in Sanity Studio to see live updates', 'info')

  } catch (error) {
    log(`❌ Error creating content: ${error.message}`, 'error')
    process.exit(1)
  }
}

main() 