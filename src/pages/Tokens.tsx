import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default function Tokens() {
  const { isDoctor } = useAuth();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => { loadTokens(); }, [filter]);

  const loadTokens = async () => {
    try {
      const params = filter ? `?status=${filter}` : '';
      const res = await api.get(`/tokens${params}`);
      setTokens(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/tokens/${id}`, { status });
      toast.success('Updated');
      loadTokens();
    } catch { toast.error('Failed'); }
  };

  const statusColors: Record<string, string> = {
    waiting: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Today's Tokens</h1>
        <div className="flex flex-wrap gap-2">
          {['', 'waiting', 'in_progress', 'completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === s ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'}`}>
              {s ? s.replace('_', ' ').charAt(0).toUpperCase() + s.replace('_', ' ').slice(1) : 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>
      ) : tokens.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <p className="text-gray-400 text-lg">No tokens today</p>
          <p className="text-gray-400 text-sm mt-1">Tokens are auto-generated when patients register</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map(t => (
            <div key={t.id} className={`bg-white rounded-xl border p-5 space-y-3 ${t.status === 'completed' ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl font-bold text-primary-600">#{t.token_number}</span>
                  <p className="text-sm font-medium text-gray-800 mt-1">{t.patient_name}</p>
                  <p className="text-xs text-gray-500 font-mono">{t.patient_code}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${statusColors[t.status] || ''}`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>

              {t.branch_name && <p className="text-xs text-gray-500">{t.branch_name}</p>}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                {t.status === 'waiting' && (
                  <button onClick={() => updateStatus(t.id, 'in_progress')}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">
                    Start Consultation
                  </button>
                )}
                {t.status === 'in_progress' && isDoctor && (
                  <Link to={`/prescriptions/new/${t.numeric_patient_id}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg text-xs font-medium hover:bg-primary-100">
                    <HiOutlineDocumentText className="w-3.5 h-3.5" />
                    Write Prescription
                  </Link>
                )}
                {t.status === 'in_progress' && (
                  <button onClick={() => updateStatus(t.id, 'completed')}
                    className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100">
                    Complete
                  </button>
                )}
                {(t.status === 'waiting' || t.status === 'in_progress') && (
                  <button onClick={() => updateStatus(t.id, 'cancelled')}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
