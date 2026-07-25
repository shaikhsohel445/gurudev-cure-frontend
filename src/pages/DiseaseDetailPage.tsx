import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { diseases } from '../data/siteData';
import { HiOutlineArrowRight } from 'react-icons/hi';

const diseaseDetails: Record<string, { overview: string; symptoms: string[]; causes: string[]; treatment: string; advantages: string[]; faqs: { q: string; a: string }[] }> = {
  default: {
    overview: 'Homeopathic treatment addresses the root cause of the disease, not just symptoms. Our approach involves a detailed consultation to understand your unique constitution and prescribe personalized remedies.',
    symptoms: ['Varies by condition', 'Chronic or recurring complaints', 'Symptoms affecting quality of life', 'Conditions not responding well to other treatments'],
    causes: ['Constitutional predisposition', 'Lifestyle factors', 'Environmental influences', 'Emotional and stress-related triggers', 'Dietary habits'],
    treatment: 'Our homeopathic doctor conducts a thorough consultation including your complete health history, family history, lifestyle, and emotional state. Based on this comprehensive assessment, a personalized treatment plan is created using scientifically prepared homeopathic medicines that stimulate your body\'s natural healing response.',
    advantages: [
      'No harmful side effects',
      'Treats the root cause, not just symptoms',
      'Safe for all ages including children and pregnant women',
      'Can be used alongside conventional treatments',
      'Addresses physical, mental, and emotional health',
      'Affordable treatment costs',
    ],
    faqs: [
      { q: 'How long does treatment take?', a: 'Treatment duration varies based on the condition, its severity, and duration. Acute conditions may improve in days, while chronic conditions typically take 3-6 months.' },
      { q: 'Are the medicines safe?', a: 'Yes, homeopathic medicines are completely safe, made from natural substances, and have no harmful side effects.' },
      { q: 'Can I take homeopathy with other medicines?', a: 'Yes, homeopathic medicines can be safely used alongside other treatments. Always inform your doctor about all medications you are taking.' },
    ],
  },
};

export default function DiseaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const disease = diseases.find(d => d.id === id);
  const details = diseaseDetails[id || ''] || diseaseDetails.default;

  if (!disease) {
    return (
      <PublicLayout>
        <div className="py-32 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800">Disease Not Found</h1>
          <Link to="/diseases" className="btn-primary mt-6 inline-flex">View All Diseases</Link>
        </div>
      </PublicLayout>
    );
  }

  const related = diseases.filter(d => d.category === disease.category && d.id !== disease.id).slice(0, 4);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200/60 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/diseases" className="hover:text-white">Diseases</Link>
            <span>/</span>
            <span className="text-homeo-300">{disease.name}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{disease.icon}</span>
            <div>
              <span className="text-homeo-300 text-sm font-medium">{disease.category}</span>
              <h1 className="text-4xl md:text-5xl font-bold">{disease.name}</h1>
            </div>
          </div>
          <p className="text-primary-100/80 text-lg max-w-2xl">{disease.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disease Overview</h2>
            <p className="text-gray-600 leading-relaxed">{details.overview}</p>
          </div>

          {/* Symptoms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Symptoms</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {details.symptoms.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-red-500">⚠️</span>
                  <span className="text-gray-700 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Causes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Possible Causes</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {details.causes.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <span className="text-amber-500">🔍</span>
                  <span className="text-gray-700 text-sm">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Homeopathic Treatment</h2>
            <p className="text-gray-600 leading-relaxed">{details.treatment}</p>
          </div>

          {/* Advantages */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Advantages of Homeopathy</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {details.advantages.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-homeo-50 rounded-xl border border-homeo-100">
                  <span className="text-homeo-500">✅</span>
                  <span className="text-gray-700 text-sm">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {details.faqs.map((f, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h4 className="font-semibold text-gray-800">{f.q}</h4>
                  <p className="text-gray-600 text-sm mt-2">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Book Appointment */}
          <div className="bg-gradient-to-br from-primary-600 to-homeo-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Book Consultation for {disease.name}</h3>
            <p className="text-white/80 mb-6">Get personalized homeopathic treatment from our experienced specialist.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210" className="px-8 py-3 bg-white text-primary-800 rounded-full font-semibold hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
                Call Now
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Diseases */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Conditions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r, i) => (
                <Link to={`/diseases/${r.id}`} key={i} className="card-hover group text-center !p-4">
                  <div className="text-3xl mb-2">{r.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-sm">{r.name}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
