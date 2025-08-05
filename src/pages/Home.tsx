import { Link } from 'react-router-dom'
import { Recycle, Truck, Users, Leaf, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Eco-Friendly Waste
              <span className="text-emerald-600"> Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional waste collection and recycling services for homes and businesses. 
              Join us in creating a sustainable future with smart waste management solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/services" 
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center"
              >
                Schedule Pickup
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/contact" 
                className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Greencycle?</h2>
            <p className="text-lg text-gray-600">Reliable, sustainable, and convenient waste management services</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable Pickup</h3>
              <p className="text-gray-600">Scheduled waste collection with real-time tracking and notifications</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable practices with maximum recycling and minimal environmental impact</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Professional staff committed to excellent service and environmental responsibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-emerald-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-emerald-100">Tons Recycled</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-emerald-100">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Making Waste Management Simple & Sustainable
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Smart Scheduling</h3>
                    <p className="text-gray-600">Flexible pickup times that work with your schedule</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Real-time Tracking</h3>
                    <p className="text-gray-600">Know exactly when your waste will be collected</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Environmental Impact</h3>
                    <p className="text-gray-600">Track your contribution to environmental sustainability</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Competitive Pricing</h3>
                    <p className="text-gray-600">Affordable rates with transparent pricing</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Waste management truck" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">Join thousands of satisfied customers who trust Greencycle for their waste management needs.</p>
              <Link 
                to="/register" 
                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-block text-center"
              >
                Sign Up Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}