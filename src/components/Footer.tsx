import { Link } from 'react-router-dom'
import { Recycle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Recycle className="h-6 w-6 text-emerald-400 mr-2" />
              <span className="text-xl font-bold">Greencycle</span>
            </div>
            <p className="text-gray-400">
              Leading the way in sustainable waste management and environmental protection.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-colors">Residential Pickup</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Commercial Services</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Recycling Programs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Customer Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-400 space-y-2">
              <p>1-800-GREENCYCLE</p>
              <p>info@greencycle.com</p>
              <p>Available 24/7</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Greencycle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}