import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const emptyMedicine = { medicine_name: '', generic_name: '', brand_name: '', manufacturer: '', category: '', composition: '', strength: '', uses: '', side_effects: '', contraindications: '', storage_instructions: '', notes: '' };

export default function Medicines() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyMedicine);

  useEffect(() => { loadMedicines(); }, [search]);

  const loadMedicines = async () => {
    setLoading(true);
    try {
      const res = await api.get('/medicines', { params: { search, limit: 100 } });
      setMedicines(res.data.medicines);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAdd = () => { setForm(emptyMedicine); setEditId(null); setShowModal(true); };
  const openEdit = (m: any) => { setForm(m); setEditId(m.id); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/medicines/${editId}`, form);
        toast.success('Medicine updated');
      } else {
        await api.post('/medicines', form);
        toast.success('Medicine added');
      }
      setShowModal(false);
      loadMedicines();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this medicine?')) return;
    try {
      await api.delete(`/medicines/${id}`);
      toast.success('Deleted');
      loadMedicines();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Medicine Library</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center justify-center gap-2">
          <HiOutlinePlus className="w-4 h-4" /> Add Medicine
        </button>
      </div>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..."
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-gray-400 col-span-full text-center py-8">Loading...</p> :
          medicines.length === 0 ? <p className="text-gray-400 col-span-full text-center py-8">No medicines found</p> :
          medicines.map(m => (
            <div key={m.id} className="bg-white rounded-xl border p-4 space-y-2 hover:border-primary-200 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{m.medicine_name}</h3>
                  {m.generic_name && <p className="text-sm text-gray-500">{m.generic_name}</p>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(m)} className="p-1 text-gray-400 hover:text-primary-600"><HiOutlinePencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-1 text-gray-400 hover:text-red-600"><HiOutlineTrash className="w-4 h-4" /></button>
                </div>
              </div>
              {m.category && <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full">{m.category}</span>}
              {m.strength && <p className="text-sm text-gray-600">Strength: {m.strength}</p>}
              {m.uses && <p className="text-sm text-gray-600 line-clamp-2">{m.uses}</p>}
            </div>
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Medicine' : 'Add Medicine'}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="medicine_name" value={form.medicine_name} onChange={handleChange} placeholder="Medicine Name *" className="px-3 py-2 border rounded-lg text-sm col-span-2" required />
                <input name="generic_name" value={form.generic_name} onChange={handleChange} placeholder="Generic Name" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="brand_name" value={form.brand_name} onChange={handleChange} placeholder="Brand Name" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="manufacturer" value={form.manufacturer} onChange={handleChange} placeholder="Manufacturer" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="composition" value={form.composition} onChange={handleChange} placeholder="Composition" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="strength" value={form.strength} onChange={handleChange} placeholder="Strength" className="px-3 py-2 border rounded-lg text-sm" />
              </div>
              <textarea name="uses" value={form.uses} onChange={handleChange} placeholder="Uses" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <textarea name="side_effects" value={form.side_effects} onChange={handleChange} placeholder="Side Effects" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <textarea name="contraindications" value={form.contraindications} onChange={handleChange} placeholder="Contraindications" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <textarea name="storage_instructions" value={form.storage_instructions} onChange={handleChange} placeholder="Storage Instructions" rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" rows={1} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">{editId ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
