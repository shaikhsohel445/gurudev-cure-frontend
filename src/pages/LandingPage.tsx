import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { diseases, quickHighlights, whyChooseUs, stats, testimonials } from '../data/siteData';
import {
  HiOutlinePhone, HiOutlineChevronRight, HiOutlineCheckCircle, HiOutlineArrowRight,
} from 'react-icons/hi';

const galleryItems = [
  { label: 'Clinic', color: 'from-homeo-500 to-homeo-700' },
  { label: 'Consultation Room', color: 'from-primary-500 to-primary-700' },
  { label: 'Waiting Area', color: 'from-teal-500 to-teal-700' },
  { label: 'Health Camps', color: 'from-amber-500 to-orange-600' },
];

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-homeo-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-homeo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="w-2 h-2 bg-homeo-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-homeo-100">Gurudev Cure Homeopathic Hospital</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Natural Healing with<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-homeo-300 to-teal-200">Personalized Homeopathic Care</span>
              </h1>

              <p className="text-lg md:text-xl text-primary-100/80 leading-relaxed max-w-lg">
                Experience the power of gentle, safe, and effective homeopathic treatment. We treat the root cause, not just the symptoms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+919876543210" className="px-8 py-4 bg-homeo-500 text-white rounded-full font-semibold text-center hover:bg-homeo-600 transition-all hover:shadow-2xl hover:shadow-homeo-500/30 flex items-center justify-center gap-2">
                  <HiOutlinePhone className="w-5 h-5" /> Book Appointment
                </a>
                <a href="tel:+919876543210" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-center hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <HiOutlinePhone className="w-5 h-5" /> Call Now
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-center hover:bg-green-600 transition-all hover:shadow-2xl hover:shadow-green-500/30 flex items-center justify-center gap-2">
                  WhatsApp Consultation
                </a>
              </div>
            </div>

            {/* Doctor Photo Placeholder */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-600/30 to-homeo-600/30 backdrop-blur-sm border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center text-6xl">
                      👨‍⚕️
                    </div>
                    <h3 className="text-2xl font-bold text-white">Dr. [Doctor Name]</h3>
                    <p className="text-homeo-200/80">BHMS / MD (Homeopathy)</p>
                    <p className="text-sm text-white/60 max-w-sm mx-auto">Qualified Homeopathic Specialist with years of experience in treating chronic and acute diseases through scientific homeopathic practice.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-homeo-100 rounded-full flex items-center justify-center text-lg">⭐</div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">4.8 / 5.0</p>
                    <p className="text-xs text-gray-500">Google Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickHighlights.map((h, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-3xl">{h.icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm">{h.title}</h4>
                <p className="text-xs text-gray-500">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diseases Quick Cards */}
      <section className="py-20 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
            <h2>Diseases We Treat</h2>
            <p>Comprehensive homeopathic treatment for 100+ diseases across multiple specialties</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {diseases.slice(0, 20).map((d, i) => (
              <Link to={`/diseases/${d.id}`} key={i} className="card-hover group text-center !p-4">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{d.icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm">{d.name}</h4>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/diseases" className="btn-primary inline-flex">
              View All Diseases <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-heading !text-left !mb-8">
                <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                <h2>Why Gurudev Cure Homeopathic Hospital?</h2>
              </div>
              <div className="space-y-4">
                {whyChooseUs.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-homeo-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{w}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-homeo-700 rounded-3xl p-10 text-white space-y-6">
                <div className="text-5xl">🏥</div>
                <h3 className="text-2xl font-bold">Personalized Homeopathic Care</h3>
                <p className="text-primary-100/80">Every patient receives a customized treatment plan based on their unique symptoms, constitution, and health history. No two patients get the same prescription.</p>
                <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-full font-semibold hover:bg-primary-50 transition-colors">
                  Learn More <HiOutlineChevronRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="absolute -z-10 top-6 left-6 w-full h-full bg-primary-200 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-homeo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-sm text-primary-200/70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2>Patient Reviews & Testimonials</h2>
            <p>Real experiences from patients who found healing at Gurudev Cure</p>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
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

          <div className="md:hidden">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, j) => (
                  <span key={j} className="text-amber-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{testimonials[activeTestimonial].text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-homeo-100 flex items-center justify-center text-homeo-700 font-bold text-sm">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{testimonials[activeTestimonial].name}</p>
                  <p className="text-xs text-gray-500">{testimonials[activeTestimonial].location}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeTestimonial ? 'bg-homeo-600' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/testimonials" className="btn-secondary inline-flex">
              View All Testimonials <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Gallery</span>
            <h2>Our Hospital Gallery</h2>
            <p>Take a virtual tour of our clinic facilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((g, i) => (
              <div key={i} className={`rounded-2xl h-48 bg-gradient-to-br ${g.color} flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition-transform cursor-pointer shadow-lg`}>
                {g.label}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-secondary inline-flex">
              View Full Gallery <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <span className="text-homeo-600 font-semibold text-sm uppercase tracking-wider">Find Us</span>
            <h2>Our Location</h2>
            <p>Visit Gurudev Cure Homeopathic Hospital</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-5xl mb-4">📍</div>
              <p className="font-semibold">Google Map</p>
              <p className="text-sm mt-1">123 Health Street, Medical Colony, City</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-homeo-600 text-sm font-medium hover:text-homeo-700">
                Open in Google Maps <HiOutlineArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-homeo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Healing Journey?</h2>
          <p className="text-primary-100/80 text-lg max-w-2xl mx-auto">
            Book a consultation today and experience the gentle power of homeopathy. Your path to natural health begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="px-8 py-4 bg-white text-primary-800 rounded-full font-semibold hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
              <HiOutlinePhone className="w-5 h-5" /> Call Now
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
              WhatsApp Consultation
            </a>
            <Link to="/contact" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
