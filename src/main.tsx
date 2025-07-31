import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.tsx'
import { fetchAllData, setStaticData } from './lib/static-data'
import './index.css'

// Initialize static data at app startup
async function initializeStaticData() {
  try {
    const data = await fetchAllData()
    setStaticData(data)
  } catch (error) {
    console.warn('Failed to initialize static data:', error)
  }
}

// Initialize data before rendering
initializeStaticData().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
}) 