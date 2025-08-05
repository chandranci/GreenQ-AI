import { Link, useLocation } from 'react-router-dom'
import { Recycle, Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleSignOut = async () => {
    try {
      await signOut()
      setShowUserMenu(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Recycle className="h-8 w-8 text-emerald-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Greencycle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`${isActive('/services') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
            >
              Services
            </Link>
            <Link 
              to="/news" 
              className={`${isActive('/news') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
            >
              News
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
            >
              Contact
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`${isActive('/') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`${isActive('/services') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/news" 
                className={`${isActive('/news') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>
              <Link 
                to="/contact" 
                className={`${isActive('/contact') ? 'text-emerald-600' : 'text-gray-700'} hover:text-emerald-600 transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsOpen(false)
                    }}
                    className="text-left text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}