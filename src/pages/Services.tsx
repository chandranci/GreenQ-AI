'use client';

import { Link } from 'react-router-dom';
import { Home, Building, Recycle, CheckCircle } from 'lucide-react';

export default function Services() {
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
          {/* Residential */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Residential</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Weekly pickup service</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Recycling included</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Flexible scheduling</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Curbside collection</li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$29/month</div>
              <p className="text-gray-500 mb-6">Starting price</p>
              <Link
                to="/schedule?type=residential"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition"
              >
                Schedule Pickup
              </Link>
            </div>
          </div>

          {/* Commercial */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-emerald-600">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Commercial</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Daily pickup available</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Large container options</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Waste audit services</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Custom solutions</li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$199/month</div>
              <p className="text-gray-500 mb-6">Starting price</p>
              <Link
                to="/schedule?type=commercial"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition"
              >
                Schedule Pickup
              </Link>
            </div>
          </div>

          {/* Recycling Plus */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Recycle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Recycling Plus</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Specialized recycling</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Electronics disposal</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Hazardous waste</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />Composting service</li>
            </ul>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$49/month</div>
              <p className="text-gray-500 mb-6">Add-on service</p>
              <Link
                to="/schedule?type=recycling"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition"
              >
                Schedule Pickup
              </Link>
            </div>
          </div>
        </div>

        {/* Optional global CTA */}
        <div className="text-center">
          <Link
            to="/schedule"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-emerald-700 transition"
          >
            Schedule Any Service
          </Link>
        </div>
      </div>
    </div>
  );
}
