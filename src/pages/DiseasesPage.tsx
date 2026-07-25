import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { diseases, categories } from '../data/siteData';
import { HiOutlineSearch, HiOutlineArrowRight } from 'react-icons/hi';

export default function DiseasesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = diseases.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'all' || d.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCategory;
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Complete List</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Diseases We Treat</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Search from 100+ diseases treated through homeopathy at Gurudev Cure.</p>

          <div className="mt-8 max-w-xl">
            <div className="relative">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by disease name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:bg-white/15 focus:border-homeo-400 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'all' ? 'bg-homeo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Diseases
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === c.name ? 'bg-homeo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Disease List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-6">Showing {filtered.length} diseases</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d, i) => (
              <Link to={`/diseases/${d.id}`} key={i} className="card-hover group">
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{d.icon}</div>
                  <div>
                    <span className="text-xs text-homeo-600 font-medium">{d.category}</span>
                    <h3 className="font-bold text-gray-800 mt-1">{d.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{d.description}</p>
                    <span className="inline-flex items-center gap-1 text-homeo-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                      Learn More <HiOutlineArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">No diseases found matching your search.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn-primary mt-4 inline-flex text-sm">
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
