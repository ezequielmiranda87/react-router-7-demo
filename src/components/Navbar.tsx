import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        {/* Mobile and Tablet Layout */}
        <div className="lg:hidden">
          {/* Header with Logo and Hamburger */}
          <div className="flex h-16 items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <span className="text-xl font-bold">React Router 7</span>
            </Link>
            
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          
          {/* Mobile Menu - Only visible when open */}
          {isMenuOpen && (
            <div className="border-t px-4 py-3 bg-background">
              <div className="flex flex-col space-y-2">
                <Link to="/" className="w-full" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">Home</Button>
                </Link>
                <Link to="/services" className="w-full" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">Services</Button>
                </Link>
                <Link to="/about" className="w-full" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">About</Button>
                </Link>
                <Link to="/contact" className="w-full" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">Contact</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:h-16 lg:items-center">
          <div className="mr-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">React Router 7</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <nav className="flex items-center space-x-6">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost">Services</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
} 