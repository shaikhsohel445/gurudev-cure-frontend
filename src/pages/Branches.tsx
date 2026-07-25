import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const emptyBranch = { name: '', address: '', contact_number: '', email: '', clinic_timing: '' };

export default function Branches() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyBranch);

  useEffect(() => { loadBranches(); }, []);

  const loadBranches = async () => {
    try { const res = await api.get('/branches'); setBranches(res.data); } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAdd = () => { setForm(emptyBranch); setEditId(null); setShowModal(true); };
  const openEdit = (b: any) => { setForm(b); setEditId(b.id); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) { await api.put(`/branches/${editId}`, form); toast.success('Updated'); }
      else { await api.post('/branches', form); toast.success('Created'); }
      setShowModal(false); loadBranches();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deactivate this branch?')) return;
    try { await api.delete(`/branches/${id}`); toast.success('Deactivated'); loadBranches(); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Branch Management</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center justify-center gap-2">
          <HiOutlinePlus className="w-4 h-4" /> Add Branch
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-gray-400 col-span-full text-center py-8">Loading...</p> :
          branches.map(b => (
            <div key={b.id} className="bg-white rounded-xl border p-5 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{b.name}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(b)} className="p-1 text-gray-400 hover:text-primary-600"><HiOutlinePencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(b.id)} className="p-1 text-gray-400 hover:text-red-600"><HiOutlineTrash className="w-4 h-4" /></button>
                </div>
              </div>
              {b.address && <p className="text-sm text-gray-600">{b.address}</p>}
              {b.contact_number && <p className="text-sm text-gray-500">Ph: {b.contact_number}</p>}
              {b.email && <p className="text-sm text-gray-500">{b.email}</p>}
              {b.clinic_timing && <p className="text-xs text-gray-400">{b.clinic_timing}</p>}
            </div>
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Branch' : 'Add Branch'}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Branch Name *" className="w-full px-3 py-2 border rounded-lg text-sm" required />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full px-3 py-2 border rounded-lg text-sm" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="contact_number" value={form.contact_number} onChange={handleChange} placeholder="Contact Number" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-3 py-2 border rounded-lg text-sm" />
              </div>
              <input name="clinic_timing" value={form.clinic_timing} onChange={handleChange} placeholder="Clinic Timing (e.g. Mon-Sat: 9AM-6PM)" className="w-full px-3 py-2 border rounded-lg text-sm" />
              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
