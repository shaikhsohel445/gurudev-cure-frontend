import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { HiOutlinePhone, HiOutlineClock, HiOutlineArrowRight } from 'react-icons/hi';

const branches = [
  {
    name: 'Gurudev Cure Homeopathic Hospital — Main Branch',
    address: '123 Health Street, Medical Colony, City — 500001',
    phone: '+91 98765 43210',
    timing: 'Mon - Sat: 9:00 AM - 8:00 PM',
    isMain: true,
  },
];

export default function BranchesPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Our Locations</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Branches</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Visit us at any of our conveniently located clinic branches.</p>
        </div>
      </section>

      {/* Branches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((b, i) => (
              <div key={i} className={`bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all ${b.isMain ? 'border-homeo-200 shadow-lg' : 'border-gray-100'}`}>
                {b.isMain && (
                  <div className="bg-homeo-600 text-white text-center py-2 text-sm font-medium">
                    Main Branch
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">{b.name}</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {b.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <HiOutlinePhone className="w-4 h-4 text-gray-400" />
                      {b.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <HiOutlineClock className="w-4 h-4 text-gray-400" />
                      {b.timing}
                    </p>
                  </div>

                  {/* Map placeholder */}
                  <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="text-2xl mb-1">📍</div>
                      <p className="text-xs">Google Map</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href="tel:+919876543210" className="btn-primary text-sm !px-4 !py-2 flex-1">
                      <HiOutlinePhone className="w-4 h-4" /> Call
                    </a>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm !px-4 !py-2 flex-1">
                      <HiOutlineArrowRight className="w-4 h-4" /> Direction
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Future branches note */}
          <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div className="text-4xl mb-3">🏗️</div>
            <h3 className="font-bold text-gray-800">More Branches Coming Soon</h3>
            <p className="text-gray-500 text-sm mt-2">We're expanding! Additional clinic branches will be listed here as they open.</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
