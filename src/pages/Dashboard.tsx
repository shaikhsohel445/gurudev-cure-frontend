import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUserGroup, HiOutlineDocumentText, HiOutlineCurrencyDollar, HiOutlineClipboardList, HiOutlineUserAdd } from 'react-icons/hi';

export default function Dashboard() {
  const { user, isDoctor } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get('/dashboard');
      setStats(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;

  const statCards = [
    { label: "Today's Tokens", value: stats?.today_tokens || 0, icon: HiOutlineClipboardList, color: 'blue' },
    { label: 'Waiting', value: stats?.waiting_tokens || 0, icon: HiOutlineUserAdd, color: 'yellow' },
    { label: 'New Patients', value: stats?.new_patients || 0, icon: HiOutlineUserGroup, color: 'green' },
    { label: "Today's Revenue", value: `₹${(stats?.today_revenue || 0).toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: 'emerald' },
    { label: 'Prescriptions', value: stats?.today_prescriptions || 0, icon: HiOutlineDocumentText, color: 'orange' },
    { label: 'Total Patients', value: stats?.total_patients || 0, icon: HiOutlineUserGroup, color: 'cyan' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    cyan: 'bg-cyan-50 text-cyan-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.full_name}</h1>
          <p className="text-gray-500 text-sm">Here's your clinic overview</p>
        </div>
        <Link to="/tokens" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 text-center">
          View Tokens
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">{card.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Patients</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {stats?.recent_patients?.length > 0 ? stats.recent_patients.map((p: any) => (
            <Link key={p.id} to={`/patients/${p.id}`} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-800">{p.full_name}</p>
                <p className="text-sm text-gray-500">{p.patient_id} · {p.mobile}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(p.created_at).toLocaleDateString()}</span>
            </Link>
          )) : (
            <p className="px-5 py-8 text-center text-gray-400 text-sm">No patients yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
