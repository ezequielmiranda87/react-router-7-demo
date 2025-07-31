import { client } from './sanity'

// Home page query
export const getHomePage = async () => {
  const query = `*[_type == "homePage"][0] {
    _id,
    title,
    subtitle,
    description,
    heroImage,
    ctaText,
    ctaLink
  }`
  
  return await client.fetch(query)
}

// Services query
export const getServices = async () => {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    image,
    slug
  }`
  
  return await client.fetch(query)
}

// About page query
export const getAboutPage = async () => {
  const query = `*[_type == "aboutPage"][0] {
    _id,
    title,
    content,
    image
  }`
  
  return await client.fetch(query)
}

// Contact page query
export const getContactPage = async () => {
  const query = `*[_type == "contactPage"][0] {
    _id,
    title,
    content,
    email,
    phone,
    address
  }`
  
  return await client.fetch(query)
}

// Site settings query
export const getSiteSettings = async () => {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo,
    navigation {
      label,
      link
    }
  }`
  
  return await client.fetch(query)
} 