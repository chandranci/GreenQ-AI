import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for any questions about our waste management services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to help with all your waste management needs. Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">1-800-GREENCYCLE</p>
                  <p className="text-gray-600">(1-800-473-3629)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@greencycle.com</p>
                  <p className="text-gray-600">support@greencycle.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">123 Green Street</p>
                  <p className="text-gray-600">Eco City, EC 12345</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 7:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Sunday: Emergency only</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-2">Emergency Service</h3>
              <p className="text-red-700 mb-2">For urgent waste management issues:</p>
              <p className="font-semibold text-red-900">1-800-EMERGENCY</p>
              <p className="text-red-600 text-sm">Available 24/7 for emergencies</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-800">Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="service">Service Request</option>
                    <option value="billing">Billing Question</option>
                    <option value="complaint">Service Complaint</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Please describe your inquiry or request in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What areas do you serve?</h3>
              <p className="text-gray-600">We provide waste management services to over 50 cities across the region. Contact us to check if we serve your area.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How do I schedule a pickup?</h3>
              <p className="text-gray-600">You can schedule pickups through our website, mobile app, or by calling our customer service line.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What types of waste do you collect?</h3>
              <p className="text-gray-600">We collect household waste, recyclables, yard waste, and offer specialized services for electronics and hazardous materials.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How much do your services cost?</h3>
              <p className="text-gray-600">Our pricing varies based on service type and frequency. Residential services start at $29/month. Contact us for a custom quote.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}