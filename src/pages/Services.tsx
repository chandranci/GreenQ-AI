import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { Truck, Home, Building, Recycle, Calendar, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function Services() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    pickup_date: '',
    pickup_time: '',
    address: '',
    service_type: 'residential',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('pickups')
        .insert([
          {
            ...formData,
            user_id: user.id,
            status: 'scheduled'
          }
        ])

      if (error) throw error

      setSuccess(true)
      setFormData({
        pickup_date: '',
        pickup_time: '',
        address: '',
        service_type: 'residential',
        notes: ''
      })
    } catch (error) {
      console.error('Error scheduling pickup:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive waste management solutions tailored to your needs
          </p>
        </div>

        {/* Service Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Residential</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Weekly pickup service
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Recycling included
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Flexible scheduling
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Curbside collection
              </li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$29/month</div>
              <p className="text-gray-500">Starting price</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-emerald-600">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Commercial</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Daily pickup available
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Large container options
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Waste audit services
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Custom solutions
              </li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$199/month</div>
              <p className="text-gray-500">Starting price</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Recycle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Recycling Plus</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Specialized recycling
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Electronics disposal
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Hazardous waste
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                Composting service
              </li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$49/month</div>
              <p className="text-gray-500">Add-on service</p>
            </div>
          </div>
        </div>

        {/* Scheduling Form */}
        {user ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Schedule a Pickup</h2>
            
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                  <p className="text-emerald-800">Pickup scheduled successfully! We'll contact you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickup_date"
                    value={formData.pickup_date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Pickup Time
                  </label>
                  <select
                    name="pickup_time"
                    value={formData.pickup_time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select time</option>
                    <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                    <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                    <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                    <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                    <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Pickup Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter full address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Truck className="inline h-4 w-4 mr-1" />
                  Service Type
                </label>
                <select
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="recycling">Recycling Plus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions or requirements"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Scheduling...' : 'Schedule Pickup'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Schedule?</h2>
            <p className="text-gray-600 mb-6">Sign up or log in to schedule your waste pickup service</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition-colors"
              >
                Sign Up Now
              </a>
              <a
                href="/login"
                className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-md font-semibold hover:bg-emerald-50 transition-colors"
              >
                Log In
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}