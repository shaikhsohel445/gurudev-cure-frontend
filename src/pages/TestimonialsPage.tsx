import PublicLayout from '../components/PublicLayout';
import { testimonials } from '../data/siteData';
import { HiOutlineStar } from 'react-icons/hi';

export default function TestimonialsPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Patient Testimonials</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Read what our patients have to say about their healing journey at Gurudev Cure Homeopathic Hospital.</p>
        </div>
      </section>

      {/* Google Reviews Summary */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">4.8</div>
              <div className="flex justify-center gap-1 my-2">
                {[1,2,3,4,5].map(i => (
                  <HiOutlineStar key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-500 text-sm">Google Reviews Rating</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-5xl font-bold text-homeo-600">500+</div>
              <p className="text-gray-500 text-sm mt-2">Total Reviews</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600">10,000+</div>
              <p className="text-gray-500 text-sm mt-2">Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Written Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Patient Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <HiOutlineStar key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-homeo-100 flex items-center justify-center text-homeo-700 font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Video Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-2">🎬</div>
                  <p className="text-sm">Video Testimonial {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-homeo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Kidney Stone Recovery', desc: 'Patient avoided surgery through 3 months of homeopathic treatment. Stones dissolved naturally.', duration: '3 Months Treatment' },
              { title: 'PCOD Management', desc: 'Regularized menstrual cycles and improved hormonal balance through personalized homeopathic care.', duration: '6 Months Treatment' },
              { title: 'Chronic Eczema Cured', desc: 'Complete relief from lifelong eczema that didn\'t respond to conventional treatments.', duration: '4 Months Treatment' },
              { title: 'Child Asthma Control', desc: 'Young patient\'s asthma symptoms significantly reduced, avoiding long-term steroid use.', duration: '5 Months Treatment' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-homeo-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-homeo-100 text-homeo-700 rounded-full text-xs font-medium">{s.duration}</span>
                </div>
                <h4 className="font-bold text-gray-800">{s.title}</h4>
                <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
