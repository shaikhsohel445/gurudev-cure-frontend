import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function NewConsultation() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    symptoms: '', diagnosis: '', investigations: '', advice: '',
    notes: '', follow_up_date: '', consultation_fee: '', branch_id: '',
  });

  useEffect(() => {
    Promise.all([
      api.get(`/patients/${patientId}`),
      api.get('/branches'),
    ]).then(([pRes, bRes]) => {
      setPatient(pRes.data);
      setBranches(bRes.data);
    }).finally(() => setLoading(false));
  }, [patientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.post('/consultations', {
        patient_id: parseInt(patientId!),
        doctor_id: 1,
        ...form,
        consultation_fee: parseFloat(form.consultation_fee) || 0,
        branch_id: form.branch_id ? parseInt(form.branch_id) : null,
      });
      toast.success('Consultation saved');
      navigate(`/patients/${patientId}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">New Consultation</h1>
      {patient && (
        <div className="bg-primary-50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">{patient.full_name}</p>
            <p className="text-sm text-gray-600">{patient.patient_id} · {patient.mobile}</p>
          </div>
          <span className="text-sm text-gray-500">{patient.age} yrs, {patient.gender}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
            <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" placeholder="Patient symptoms..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
            <textarea name="diagnosis" value={form.diagnosis} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investigations</label>
            <textarea name="investigations" value={form.investigations} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Advice</label>
            <textarea name="advice" value={form.advice} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select name="branch_id" value={form.branch_id} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg">
              <option value="">Select Branch</option>
              {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
            <input type="number" name="consultation_fee" value={form.consultation_fee} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
            <input type="date" name="follow_up_date" value={form.follow_up_date} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
}
