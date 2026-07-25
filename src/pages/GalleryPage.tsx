import PublicLayout from '../components/PublicLayout';

const galleryCategories = [
  {
    title: 'Clinic Entrance',
    items: 4,
    color: 'from-homeo-500 to-homeo-700',
  },
  {
    title: 'Waiting Area',
    items: 3,
    color: 'from-primary-500 to-primary-700',
  },
  {
    title: 'Consultation Room',
    items: 3,
    color: 'from-teal-500 to-teal-700',
  },
  {
    title: 'Pharmacy',
    items: 2,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Health Camps',
    items: 5,
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Awareness Programs',
    items: 3,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: 'Certificates',
    items: 4,
    color: 'from-emerald-500 to-green-600',
  },
  {
    title: 'Awards',
    items: 2,
    color: 'from-yellow-500 to-amber-600',
  },
];

export default function GalleryPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Gallery</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Photo Gallery</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Take a virtual tour of our hospital facilities, health camps, and events.</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryCategories.map((cat, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: cat.items }).map((_, j) => (
                    <div key={j} className={`rounded-xl bg-gradient-to-br ${cat.color} h-32 flex items-center justify-center text-white/60 hover:text-white hover:scale-105 transition-all cursor-pointer`}>
                      <span className="text-2xl">📷</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
