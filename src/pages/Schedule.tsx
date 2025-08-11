import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Calendar, Clock, MapPin, Truck, CheckCircle } from 'lucide-react';

export default function Schedule() {
  const { user, loading: authLoading } = useAuth(); // if your context doesn't expose loading, remove it
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialType = useMemo(() => {
    const t = searchParams.get('type') || '';
    return (['residential', 'commercial', 'recycling'].includes(t) ? t : 'residential') as
      | 'residential'
      | 'commercial'
      | 'recycling';
  }, [searchParams]);

  const [formData, setFormData] = useState({
    pickup_date: '',
    pickup_time: '',
    address: '',
    service_type: initialType,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // auth guard: if not logged in, send to login with return path
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      const next = `/schedule${window.location.search || ''}`;
      navigate(`/login?next=${encodeURIComponent(next)}`, { replace: true });
    }
  }, [authLoading, user, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.from('pickups').insert([{
        ...formData,
        user_id: user.id,
        status: 'scheduled',
      }]);
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 900);
    } catch (err: any) {
      setErrorMsg(err?.message ?? 'Failed to schedule pickup.');
      alert(err?.message ?? 'Failed to schedule pickup.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Schedule a Pickup</h1>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 flex items-center">
            <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
            <p className="text-emerald-800">Pickup scheduled! Redirecting to your dashboard…</p>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {errorMsg}
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
            disabled={submitting}
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {submitting ? 'Scheduling…' : 'Schedule Pickup'}
          </button>
        </form>
      </div>
    </div>
  );
}
