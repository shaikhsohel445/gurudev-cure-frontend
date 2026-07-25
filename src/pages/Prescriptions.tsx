import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { HiOutlineDocumentText, HiOutlineEye } from 'react-icons/hi';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPrescriptions(); }, []);

  const loadPrescriptions = async () => {
    try {
      const res = await api.get('/prescriptions', { params: { limit: 50 } });
      setPrescriptions(res.data.prescriptions || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Prescription #</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Patient</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Doctor</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : prescriptions.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No prescriptions</td></tr>
            ) : prescriptions.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-sm font-mono text-primary-600">{p.prescription_number}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{p.patient_name}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{p.doctor_name}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{p.created_at?.split('T')[0]}</td>
                <td className="px-5 py-3">
                  <Link to={`/prescriptions/${p.id}`} className="text-primary-600 hover:text-primary-700">
                    <HiOutlineEye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
