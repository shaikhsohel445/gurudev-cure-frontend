import PublicLayout from '../components/PublicLayout';

const videoCategories = [
  { title: 'Health Awareness Videos', icon: '📢', count: 8 },
  { title: 'Homeopathy Education', icon: '📚', count: 6 },
  { title: 'Doctor Advice', icon: '👨‍⚕️', count: 10 },
  { title: 'Seasonal Health Tips', icon: '🌤️', count: 5 },
  { title: 'Patient Awareness', icon: '🧑‍🤝‍🧑', count: 7 },
];

export default function VideoGalleryPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Video Gallery</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Video Gallery</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Watch health awareness videos, homeopathy education, and expert advice from our doctor.</p>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoCategories.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{cat.title}</h3>
                    <p className="text-sm text-gray-500">{cat.count} videos</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {Array.from({ length: Math.min(cat.count, 3) }).map((_, j) => (
                    <div key={j} className="bg-gray-100 rounded-xl h-40 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="text-center text-gray-400 group-hover:text-homeo-500 transition-colors">
                        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-2">
                          <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <p className="text-xs">Video {j + 1}</p>
                      </div>
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
