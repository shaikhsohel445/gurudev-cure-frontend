import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { whyChooseUs } from '../data/siteData';
import { HiOutlineCheckCircle, HiOutlineArrowRight } from 'react-icons/hi';

const timeline = [
  { year: '2010', title: 'Clinic Established', desc: 'Gurudev Cure Homeopathic Hospital was founded with a vision to provide natural healing.' },
  { year: '2013', title: '1000+ Patients', desc: 'Reached the milestone of treating over 1,000 patients successfully.' },
  { year: '2016', title: 'Digital Systems', desc: 'Implemented digital prescription and patient management systems.' },
  { year: '2019', title: '5000+ Patients', desc: 'Expanded services and crossed 5,000 patient mark with 98% satisfaction.' },
  { year: '2022', title: 'Multiple Specialties', desc: 'Started dedicated departments for kidney, skin, women\'s health, and child care.' },
  { year: '2024', title: '10,000+ Patients', desc: 'Successfully treated over 10,000 patients across 100+ disease categories.' },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">About Gurudev Cure Homeopathic Hospital</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Dedicated to providing natural, safe, and effective homeopathic treatment for a wide range of diseases.</p>
        </div>
      </section>

      {/* Hospital Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Treatment Philosophy</h2>
              <p className="text-gray-600 leading-relaxed">
                At Gurudev Cure Homeopathic Hospital, we believe in treating the root cause of disease, not just the symptoms. Our approach combines the time-tested principles of homeopathy with modern diagnostic understanding to provide personalized care for every patient.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every patient is unique, and so is every treatment plan. We take the time to understand your complete health history, lifestyle, and constitution before prescribing medicines that work with your body's natural healing mechanisms.
              </p>
              <div className="bg-homeo-50 rounded-2xl p-6 border border-homeo-100">
                <h4 className="font-bold text-homeo-800 mb-2">Our Mission</h4>
                <p className="text-homeo-700 text-sm">To provide accessible, affordable, and effective homeopathic healthcare to every patient, treating the root cause of disease and promoting holistic well-being.</p>
              </div>
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <h4 className="font-bold text-primary-800 mb-2">Our Vision</h4>
                <p className="text-primary-700 text-sm">To be the most trusted homeopathic healthcare center, recognized for clinical excellence, patient care, and contributions to the field of homeopathy.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-homeo-100 to-primary-100 rounded-3xl p-10 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-homeo-600">
                <div className="text-7xl mb-4">🏥</div>
                <p className="font-semibold text-lg">Hospital Building</p>
                <p className="text-sm text-gray-500 mt-1">Photo placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2>Clinic Journey & Milestones</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-homeo-200"></div>
            {timeline.map((t, i) => (
              <div key={i} className={`relative flex items-start mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-homeo-500 rounded-full -translate-x-1.5 mt-1.5 z-10 ring-4 ring-homeo-100"></div>
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-homeo-600 font-bold text-lg">{t.year}</span>
                  <h4 className="font-bold text-gray-800 mt-1">{t.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Our Strengths</span>
            <h2>Why Choose Gurudev Cure</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((w, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-homeo-50 rounded-xl border border-homeo-100">
                <HiOutlineCheckCircle className="w-6 h-6 text-homeo-500 flex-shrink-0" />
                <span className="font-medium text-gray-800">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Credentials</span>
            <h2>Certificates & Achievements</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Degree Certificates', 'Registration Certificates', 'Awards & Memberships'].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 text-center shadow-sm">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="font-bold text-gray-800">{c}</h4>
                <p className="text-sm text-gray-500 mt-2">Displayed in clinic and available on request</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-homeo-800">
        <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Want to Know More?</h2>
          <p className="text-primary-100/80">Visit us or schedule a consultation to learn how homeopathy can help you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-800 rounded-full font-semibold hover:bg-primary-50 transition-all">
            Contact Us <HiOutlineArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
