import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function NewPatient() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', gender: '', date_of_birth: '', age: '',
    mobile: '', alternate_mobile: '', email: '', address: '',
    city: '', state: '', blood_group: '', occupation: '',
    emergency_contact: '', allergies: '', chronic_diseases: '',
    previous_surgery: '', current_medication: '', medical_remarks: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'date_of_birth' && value) {
      const age = Math.floor((Date.now() - new Date(value).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      setForm(prev => ({ ...prev, age: String(age) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.mobile) return toast.error('Name and mobile are required');
    setLoading(true);
    try {
      const res = await api.post('/patients', form);
      const tokenNum = res.data.token_number;
      toast.success(`Patient registered! Token #${tokenNum} generated`, { duration: 5000 });
      navigate('/tokens');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to register');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Register New Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select name="blood_group" value={form.blood_group} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg">
                <option value="">Select</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
              <input name="mobile" value={form.mobile} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Mobile</label>
              <input name="alternate_mobile" value={form.alternate_mobile} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input name="occupation" value={form.occupation} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input name="emergency_contact" value={form.emergency_contact} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
              <textarea name="allergies" value={form.allergies} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chronic Diseases</label>
              <textarea name="chronic_diseases" value={form.chronic_diseases} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Surgery</label>
              <textarea name="previous_surgery" value={form.previous_surgery} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Medication</label>
              <textarea name="current_medication" value={form.current_medication} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <textarea name="medical_remarks" value={form.medical_remarks} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
            {loading ? 'Registering...' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}
