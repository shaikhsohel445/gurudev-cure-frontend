import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineEye } from 'react-icons/hi';

export default function Patients() {
  const [searchParams] = useSearchParams();
  const [patients, setPatients] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPatients(); }, [search, page]);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const res = await api.get('/patients', { params: { search, page, limit: 20 } });
      setPatients(res.data.patients);
      setTotal(res.data.total);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        <Link to="/patients/new" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center justify-center gap-2">
          <HiOutlinePlus className="w-4 h-4" /> New Patient
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Patient ID, Name, or Mobile..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-primary-300"
          />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Patient ID</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mobile</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Gender</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Age</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No patients found</td></tr>
            ) : patients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 text-sm font-mono text-primary-600">{p.patient_id}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{p.full_name}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{p.mobile}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{p.gender}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{p.age}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${p.is_returning ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                    {p.is_returning ? 'Returning' : 'New'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Link to={`/patients/${p.id}`} className="text-primary-600 hover:text-primary-700">
                    <HiOutlineEye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total > 20 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50">Prev</button>
          <span className="text-sm text-gray-600">Page {page} of {Math.ceil(total / 20)}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page * 20 >= total} className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}
