import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const categories = ['General Medicine', 'Surgery', 'Pediatrics', 'Orthopedics', 'Cardiology', 'Gynecology', 'Dermatology', 'Neurology', 'Pharmacology', 'Anatomy', 'Physiology'];
const emptyBook = { title: '', author: '', publisher: '', edition: '', category: '', description: '', pdf_url: '', cover_image: '' };

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyBook);

  useEffect(() => { loadBooks(); }, [search, catFilter]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 100 };
      if (search) params.search = search;
      if (catFilter) params.category = catFilter;
      const res = await api.get('/books', { params });
      setBooks(res.data.books);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAdd = () => { setForm(emptyBook); setEditId(null); setShowModal(true); };
  const openEdit = (b: any) => { setForm(b); setEditId(b.id); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) { await api.put(`/books/${editId}`, form); toast.success('Updated'); }
      else { await api.post('/books', form); toast.success('Added'); }
      setShowModal(false); loadBooks();
    } catch (err: any) { toast.error(err.response?.data?.error || 'Failed'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/books/${id}`); toast.success('Deleted'); loadBooks(); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Medical Books Library</h1>
        <button onClick={openAdd} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center justify-center gap-2">
          <HiOutlinePlus className="w-4 h-4" /> Add Book
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white" />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-gray-400 col-span-full text-center py-8">Loading...</p> :
          books.length === 0 ? <p className="text-gray-400 col-span-full text-center py-8">No books found</p> :
          books.map(b => (
            <div key={b.id} className="bg-white rounded-xl border p-4 space-y-2 hover:border-primary-200 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{b.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(b)} className="p-1 text-gray-400 hover:text-primary-600"><HiOutlinePencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(b.id)} className="p-1 text-gray-400 hover:text-red-600"><HiOutlineTrash className="w-4 h-4" /></button>
                </div>
              </div>
              {b.author && <p className="text-sm text-gray-500">by {b.author}</p>}
              {b.category && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{b.category}</span>}
              {b.publisher && <p className="text-xs text-gray-400">{b.publisher} · {b.edition}</p>}
              {b.description && <p className="text-sm text-gray-600 line-clamp-2">{b.description}</p>}
            </div>
          ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-lg font-semibold mb-4">{editId ? 'Edit Book' : 'Add Book'}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Book Title *" className="w-full px-3 py-2 border rounded-lg text-sm" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="publisher" value={form.publisher} onChange={handleChange} placeholder="Publisher" className="px-3 py-2 border rounded-lg text-sm" />
                <input name="edition" value={form.edition} onChange={handleChange} placeholder="Edition" className="px-3 py-2 border rounded-lg text-sm" />
                <select name="category" value={form.category} onChange={handleChange} className="px-3 py-2 border rounded-lg text-sm">
                  <option value="">Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
              <input name="pdf_url" value={form.pdf_url} onChange={handleChange} placeholder="PDF URL (optional)" className="w-full px-3 py-2 border rounded-lg text-sm" />
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
