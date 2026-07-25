import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Fees() {
  const [fees, setFees] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => { loadFees(); }, [fromDate, toDate]);

  const loadFees = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 50 };
      if (fromDate) params.from_date = fromDate;
      if (toDate) params.to_date = toDate;
      const [fRes, sRes] = await Promise.all([
        api.get('/fees', { params }),
        api.get('/fees/summary', { params: { from_date: fromDate || undefined, to_date: toDate || undefined } }),
      ]);
      setFees(fRes.data.fees);
      setSummary(sRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Fee Management</h1>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Total Collected</p>
            <p className="text-xl font-bold text-gray-800">₹{(summary.total_collected || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Cash</p>
            <p className="text-xl font-bold text-green-600">₹{(summary.cash || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">UPI</p>
            <p className="text-xl font-bold text-blue-600">₹{(summary.upi || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Discount</p>
            <p className="text-xl font-bold text-orange-600">₹{(summary.total_discount || 0).toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm" />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Receipt #</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Patient</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Payment</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : fees.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No fee records</td></tr>
            ) : fees.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-sm font-mono text-primary-600">{f.receipt_number}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{f.patient_name}</td>
                <td className="px-5 py-3 text-sm font-semibold text-gray-800">₹{f.total_amount}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 capitalize">{f.payment_method}</span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{f.created_at?.split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
