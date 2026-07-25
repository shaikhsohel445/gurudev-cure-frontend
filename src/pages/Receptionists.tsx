import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineKey } from 'react-icons/hi';

export default function Receptionists() {
  const [receptionists, setReceptionists] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState<number | null>(null);
  const [form, setForm] = useState({ username: '', password: '', full_name: '', email: '', mobile: '', assigned_branch_id: '' });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [rRes, bRes] = await Promise.all([api.get('/receptionists'), api.get('/branches')]);
      setReceptionists(rRes.data);
      setBranches(bRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAdd = () => { setForm({ username: '', password: '', full_name: '', email: '', mobile: '', assigned_branch_id: '' }); setEditId(null); setShowModal(true); };
  const openEdit = (r: any) => { setForm({ username: r.username, password: '', full_name: r.full_name, email: r.email || '', mobile: r.mobile || '', assigned_branch_id: r.assigned_branch_id || '' }); setEditId(r.id); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        const data: any = { full_name: form.full_name, email: form.email, mobile: form.mobile, assigned_branch_id: form.assigned_branch_id ? parseInt(form.assigned_branch_id) : null };
        if (form.password) data.password = form.password;
        await api.put(`/receptionists/${editId}`, data);
        toast.success('Updated');
      } else {
        await api.post('/auth/register-receptionist', form);
        toast.success('Created');
      }
      setShowModal(false); loadData();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !showPasswordModal) return;
    try {
      await api.post(`/receptionists/reset-password/${showPasswordModal}`, { password: newPassword });
      toast.success('Password reset');
      setShowPasswordModal(null); setNewPassword('');
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      await api.put(`/receptionists/${id}`, { is_active: !isActive });
      toast.success(isActive ? 'Disabled' : 'Enabled');
      loadData();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Receptionist Management</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center justify-center gap-2">
          <HiOutlinePlus className="w-4 h-4" /> Add Receptionist
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Username</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mobile</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Branch</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr> :
              receptionists.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium text-gray-800">{r.full_name}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{r.username}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{r.mobile || '-'}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{r.branch_name || '-'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${r.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {r.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(r)} className="p-1 text-gray-400 hover:text-primary-600"><HiOutlinePencil className="w-4 h-4" /></button>
                      <button onClick={() => setShowPasswordModal(r.id)} className="p-1 text-gray-400 hover:text-yellow-600"><HiOutlineKey className="w-4 h-4" /></button>
                      <button onClick={() => handleToggleActive(r.id, r.is_active)} className="p-1 text-gray-400 hover:text-red-600"><HiOutlineTrash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Receptionist' : 'Add Receptionist'}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name *" className="w-full px-3 py-2 border rounded-lg text-sm" required />
              {!editId && <input name="username" value={form.username} onChange={handleChange} placeholder="Username *" className="w-full px-3 py-2 border rounded-lg text-sm" required />}
              <input name="password" value={form.password} onChange={handleChange} placeholder={editId ? 'New Password (leave blank to keep)' : 'Password *'} type="password" className="w-full px-3 py-2 border rounded-lg text-sm" required={!editId} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="px-3 py-2 border rounded-lg text-sm" />
              </div>
              <select name="assigned_branch_id" value={form.assigned_branch_id} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm">
                <option value="">Select Branch</option>
                {branches.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" className="w-full px-3 py-2 border rounded-lg text-sm mb-4" />
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setShowPasswordModal(null); setNewPassword(''); }} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
              <button onClick={handleResetPassword} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
