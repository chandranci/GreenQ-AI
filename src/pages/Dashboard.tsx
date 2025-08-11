import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import {
  Calendar, Truck, Recycle, TrendingUp, Clock, MapPin, CheckCircle, AlertCircle
} from 'lucide-react'

interface Pickup {
  id: string
  pickup_date: string   // Supabase returns ISO string for date
  pickup_time: string
  address: string
  service_type: string
  status: string
  notes: string | null
  created_at: string
}

interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  full_name: string | null
  email: string
  phone_code: string
  phone: string
  full_phone: string | null
  address: string | null
}

export default function Dashboard() {
  const { user } = useAuth()
  const [pickups, setPickups] = useState<Pickup[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchUserData()

    // Optional: live-update when pickups change for this user
    const channel = supabase
      .channel('pickups-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pickups', filter: `user_id=eq.${user.id}` },
        () => fetchUserData()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchUserData = async () => {
    try {
      // 1) Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('id, first_name, last_name, full_name, email, phone_code, phone, full_phone, address')
        .eq('id', user!.id)
        .single()

      if (profileError) throw profileError
      setProfile(profileData as Profile)

      // 2) Fetch this user's pickups
      const { data: pickupsData, error: pickupsError } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', user!.id)
        .order('pickup_date', { ascending: false })

      if (pickupsError) throw pickupsError
      setPickups((pickupsData || []) as Pickup[])
    } catch (err: any) {
      console.error('Error fetching user data:', err)
      alert(`Error fetching user data: ${err?.message ?? err}`)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in_progress':
        return <Truck className="h-5 w-5 text-blue-600" />
      case 'scheduled':
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600" />
      </div>
    )
  }

  const name =
    profile?.full_name ||
    [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') ||
    'User'

  const completedPickups = pickups.filter(p => p.status === 'completed').length
  const scheduledPickups = pickups.filter(p => p.status === 'scheduled').length
  const totalWasteCollected = completedPickups * 25 // Estimate 25 lbs per pickup

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {name}!
          </h1>
          <p className="text-gray-600 mt-2">Here's your waste management dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled Pickups</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledPickups}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Pickups</p>
                <p className="text-2xl font-bold text-gray-900">{completedPickups}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Recycle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Waste Collected</p>
                <p className="text-2xl font-bold text-gray-900">{totalWasteCollected} lbs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(totalWasteCollected * 0.5)} lbs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Pickups */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Pickups</h2>

              {pickups.length === 0 ? (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No pickups scheduled yet</p>
                  <Link
                    to="/services"
                    className="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Schedule Your First Pickup
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {pickups.slice(0, 5).map((pickup) => (
                    <div key={pickup.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(pickup.status)}
                          <span className="ml-2 font-medium text-gray-900">
                            {pickup.service_type.charAt(0).toUpperCase() + pickup.service_type.slice(1)} Pickup
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pickup.status)}`}>
                          {pickup.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(pickup.pickup_date).toLocaleDateString()} at {pickup.pickup_time}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{pickup.address}</span>
                      </div>

                      {pickup.notes && (
                        <p className="text-sm text-gray-600 mt-2 italic">{pickup.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Profile & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
              {profile && (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-gray-900">
                      {profile.full_name || [profile.first_name, profile.last_name].filter(Boolean).join(' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-gray-900">{profile.full_phone || `${profile.phone_code}${profile.phone}`}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Address</p>
                    <p className="text-gray-900">{profile.address || '—'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/services"
                  className="block w-full bg-emerald-600 text-white text-center py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Schedule New Pickup
                </Link>
                <Link
                  to="/contact"
                  className="block w-full border border-emerald-600 text-emerald-600 text-center py-2 px-4 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-emerald-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">Your Environmental Impact</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-emerald-700">Waste Diverted from Landfills</span>
                  <span className="font-semibold text-emerald-900">{totalWasteCollected} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">CO₂ Emissions Prevented</span>
                  <span className="font-semibold text-emerald-900">{Math.round(totalWasteCollected * 0.5)} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Trees Saved</span>
                  <span className="font-semibold text-emerald-900">{Math.round(totalWasteCollected * 0.02)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
