import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Contact Us</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Get in touch with Gurudev Cure Homeopathic Hospital. We're here to help.</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-homeo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiOutlineLocationMarker className="w-5 h-5 text-homeo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Clinic Address</h4>
                    <p className="text-gray-600 text-sm mt-1">123 Health Street, Medical Colony, City — 500001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-homeo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiOutlinePhone className="w-5 h-5 text-homeo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone Numbers</h4>
                    <p className="text-gray-600 text-sm mt-1">+91 98765 43210</p>
                    <p className="text-gray-600 text-sm">+91 98765 43211 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-homeo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiOutlineMail className="w-5 h-5 text-homeo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email Address</h4>
                    <p className="text-gray-600 text-sm mt-1">info@gurudevcure.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-homeo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiOutlineClock className="w-5 h-5 text-homeo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Consultation Timing</h4>
                    <p className="text-gray-600 text-sm mt-1">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-sm font-medium">Google Maps</p>
                  <p className="text-xs mt-1">Embedded clinic location</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-bold text-gray-800">Message Sent!</h4>
                  <p className="text-gray-500 text-sm mt-2">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Message</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary !py-3.5">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-homeo-50 border-t border-homeo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:+919876543210" className="btn-primary">
              <HiOutlinePhone className="w-5 h-5" /> Call Now
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
