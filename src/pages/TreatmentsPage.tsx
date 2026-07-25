import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { categories, diseases } from '../data/siteData';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function TreatmentsPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Treatments & Services</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Comprehensive homeopathic treatment across 12 specialty categories with personalized care.</p>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Specialties</span>
            <h2>Treatment Categories</h2>
            <p>We cover a wide range of medical specialties through homeopathy</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => {
              const catDiseases = diseases.filter(d => d.category.toLowerCase().includes(cat.name.toLowerCase()));
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${cat.color} p-6 text-white`}>
                    <div className="text-4xl mb-2">{cat.icon}</div>
                    <h3 className="text-xl font-bold">{cat.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{catDiseases.length} conditions treated</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {catDiseases.slice(0, 5).map((d, j) => (
                        <Link to={`/diseases/${d.id}`} key={j} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:text-homeo-600 transition-colors group">
                          <span className="text-sm text-gray-700 group-hover:text-homeo-600">{d.icon} {d.name}</span>
                          <HiOutlineArrowRight className="w-4 h-4 text-gray-300 group-hover:text-homeo-500 transition-colors" />
                        </Link>
                      ))}
                      {catDiseases.length > 5 && (
                        <Link to="/diseases" className="text-homeo-600 text-sm font-medium hover:text-homeo-700">
                          View all {catDiseases.length} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2>Our Consultation Process</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Book Appointment', desc: 'Call, WhatsApp, or walk in to schedule your consultation.' },
              { step: '02', title: 'Detailed Consultation', desc: 'Doctor discusses your complete health history and symptoms.' },
              { step: '03', title: 'Personalized Treatment', desc: 'Customized homeopathic prescription based on your unique case.' },
              { step: '04', title: 'Follow-up & Care', desc: 'Regular follow-ups to track progress and adjust treatment.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto bg-homeo-100 rounded-2xl flex items-center justify-center text-homeo-700 font-bold text-xl mb-4">
                  {s.step}
                </div>
                <h4 className="font-bold text-gray-800">{s.title}</h4>
                <p className="text-sm text-gray-500 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-homeo-800">
        <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Ready for Natural Healing?</h2>
          <p className="text-primary-100/80">Book your consultation today and take the first step towards better health.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="px-8 py-4 bg-white text-primary-800 rounded-full font-semibold hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
              Book Appointment
            </a>
            <Link to="/diseases" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              View All Diseases
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
