import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Eye, EyeOff } from 'lucide-react'

const countryPhoneCodes: { [key: string]: string } = {
  India: '+91',
  Ireland: '+353'
}

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+91',
    phone: '',
    houseNo: '',
    streetNo: '',
    city: '',
    state: '',
    country: 'India',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        phoneCode: countryPhoneCodes[value] || ''
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match')
    setLoading(false)
    return
  }

  try {
    // 1) Create the auth user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    })
    if (signUpError) throw signUpError

    // If your project requires email confirmation, session will be null here.
    // The trigger already created public.users row. We only UPDATE when a session exists.
    if (signUpData.session && signUpData.user) {
      const userId = signUpData.user.id

      const { error: updateError } = await supabase
        .from('users')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_code: formData.phoneCode,
          phone: formData.phone,
          house_no: formData.houseNo,
          street_no: formData.streetNo,
          city: formData.city,
          state: formData.state,
          country: formData.country
        })
        .eq('id', userId)

      if (updateError) throw updateError

      navigate('/dashboard') // session exists, go straight in
    } else {
      // No session yet (email confirmation flow)
      // Let the user know to check their email, then send to login.
      alert('We sent you a confirmation link. After confirming, please log in to complete your profile.')
      navigate('/login')
    }
  } catch (err: any) {
    setError(err?.message || 'Failed to create account')
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            sign in to existing account
          </Link>
        </p>

        <form className="bg-white py-8 px-6 shadow-lg rounded-lg space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">{error}</div>}

          {/* Name */}
          <div className="flex space-x-2">
            <input name="firstName" required placeholder="First Name" value={formData.firstName} onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded" />
            <input name="lastName" required placeholder="Last Name" value={formData.lastName} onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded" />
          </div>

          {/* Email */}
          <input name="email" type="email" required placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full px-3 py-2 border rounded" />

          {/* Country & Phone */}
          <div className="flex space-x-2">
            <select name="country" value={formData.country} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded">
              <option value="India">India</option>
              <option value="Ireland">Ireland</option>
            </select>
            <input name="phoneCode" value={formData.phoneCode} disabled className="w-1/4 px-2 py-2 border rounded text-center" />
            <input name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleChange}
              className="w-1/4 px-2 py-2 border rounded" />
          </div>

          {/* Address */}
          <input name="houseNo" required placeholder="House No" value={formData.houseNo} onChange={handleChange}
            className="w-full px-3 py-2 border rounded" />
          <input name="streetNo" required placeholder="Street No" value={formData.streetNo} onChange={handleChange}
            className="w-full px-3 py-2 border rounded" />
          <input name="city" required placeholder="City" value={formData.city} onChange={handleChange}
            className="w-full px-3 py-2 border rounded" />
          <input name="state" required placeholder="State" value={formData.state} onChange={handleChange}
            className="w-full px-3 py-2 border rounded" />

          {/* Passwords */}
          <div className="flex space-x-2 items-center">
            <input name="password" type={showPassword ? 'text' : 'password'} required placeholder="Password"
              value={formData.password} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex space-x-2 items-center">
            <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required placeholder="Confirm Password"
              value={formData.confirmPassword} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-2 px-4 text-white bg-emerald-600 rounded hover:bg-emerald-700 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
