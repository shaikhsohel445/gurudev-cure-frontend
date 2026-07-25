import { useState } from 'react';
import api from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Reports() {
  const [reportType, setReportType] = useState('daily_patients');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dashboard/reports', {
        params: { type: reportType, from_date: fromDate || undefined, to_date: toDate || undefined },
      });
      setData(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Reports</h1>

      <div className="bg-white rounded-xl border p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
          <select value={reportType} onChange={e => setReportType(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="daily_patients">Daily Patients</option>
            <option value="revenue">Revenue</option>
            <option value="new_vs_returning">New vs Returning</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
        <button onClick={loadReport} disabled={loading} className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
          Generate
        </button>
      </div>

      {data.length > 0 && (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            {reportType === 'daily_patients' ? 'Patients Report' : reportType === 'revenue' ? 'Revenue Report' : 'New vs Returning'}
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            {reportType === 'new_vs_returning' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="new_patients" fill="#3b82f6" name="New" radius={[4, 4, 0, 0]} />
                <Bar dataKey="returning_patients" fill="#10b981" name="Returning" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : reportType === 'revenue' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" name="Patients" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {data.length > 0 && (
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {Object.keys(data[0]).map(key => (
                  <th key={key} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{key.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-5 py-3 text-sm text-gray-800">
                      {typeof val === 'number' && j > 0 ? val.toLocaleString() : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length === 0 && !loading && (
        <p className="text-center text-gray-400 py-8">Select parameters and click Generate</p>
      )}
    </div>
  );
}
