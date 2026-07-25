import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Consultations() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => { loadConsultations(); }, [fromDate, toDate]);

  const loadConsultations = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 50 };
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      const res = await api.get('/consultations', { params });
      setConsultations(res.data.consultations);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Consultations</h1>
      <div className="flex gap-3">
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm" />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm" />
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Patient</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Branch</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Diagnosis</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : consultations.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No consultations found</td></tr>
            ) : consultations.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-sm">{c.visit_date}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{c.patient_name}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{c.doctor_name}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{c.branch_name || '-'}</td>
                <td className="px-5 py-3 text-sm text-gray-600 max-w-xs truncate">{c.diagnosis || '-'}</td>
                <td className="px-5 py-3 text-sm text-gray-600">₹{c.consultation_fee || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
