import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function FeeCollection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    consultation_fee: '', additional_charges: '', discount: '',
    payment_method: 'cash',
  });

  const searchPatient = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const res = await api.get('/patients', { params: { search, limit: 1 } });
      if (res.data.patients.length > 0) {
        setPatient(res.data.patients[0]);
      } else {
        toast.error('Patient not found');
      }
    } catch (err) { toast.error('Search failed'); }
    finally { setLoading(false); }
  };

  const total = (parseFloat(form.consultation_fee) || 0) + (parseFloat(form.additional_charges) || 0) - (parseFloat(form.discount) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return toast.error('Select a patient');
    setSaving(true);
    try {
      await api.post('/fees', {
        patient_id: patient.id,
        doctor_id: 1,
        consultation_fee: parseFloat(form.consultation_fee) || 0,
        additional_charges: parseFloat(form.additional_charges) || 0,
        discount: parseFloat(form.discount) || 0,
        payment_method: form.payment_method,
        collected_by: 1,
      });
      toast.success('Fee collected! Receipt generated.');
      navigate('/fees');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed');
    } finally { setSaving(false); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Fee Collection</h1>

      <div className="bg-white rounded-xl border p-4 flex gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient by ID, name, or mobile..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg" onKeyDown={e => e.key === 'Enter' && searchPatient()} />
        <button onClick={searchPatient} disabled={loading} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
          Search
        </button>
      </div>

      {patient && (
        <div className="bg-primary-50 rounded-xl p-4">
          <p className="font-semibold">{patient.full_name}</p>
          <p className="text-sm text-gray-600">{patient.patient_id} · {patient.mobile}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
            <input type="number" value={form.consultation_fee} onChange={e => setForm(p => ({ ...p, consultation_fee: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Charges (₹)</label>
            <input type="number" value={form.additional_charges} onChange={e => setForm(p => ({ ...p, additional_charges: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (₹)</label>
            <input type="number" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select value={form.payment_method} onChange={e => setForm(p => ({ ...p, payment_method: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg">
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-800">₹{total}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 border rounded-lg text-sm font-medium text-gray-600">Cancel</button>
          <button type="submit" disabled={saving || !patient} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
            {saving ? 'Processing...' : 'Collect Fee'}
          </button>
        </div>
      </form>
    </div>
  );
}
