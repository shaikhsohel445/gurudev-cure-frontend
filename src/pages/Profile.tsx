import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: '', email: '', mobile: '', qualification: '',
    registration_number: '', specialization: '', clinic_logo: '', digital_signature: '',
  });

  useEffect(() => {
    api.get('/auth/me').then(res => {
      setProfile(res.data);
      setForm({
        full_name: res.data.full_name || '',
        email: res.data.email || '',
        mobile: res.data.mobile || '',
        qualification: res.data.qualification || '',
        registration_number: res.data.registration_number || '',
        specialization: res.data.specialization || '',
        clinic_logo: res.data.clinic_logo || '',
        digital_signature: res.data.digital_signature || '',
      });
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/receptionists/${profile.id}`, form);
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input name="qualification" value={form.qualification} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="e.g. MBBS, MD" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
            <input name="registration_number" value={form.registration_number} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input name="specialization" value={form.specialization} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Logo URL</label>
            <input name="clinic_logo" value={form.clinic_logo} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature URL</label>
            <input name="digital_signature" value={form.digital_signature} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="https://..." />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
