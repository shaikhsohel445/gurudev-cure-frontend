import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { faqs } from '../data/siteData';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">FAQs</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Frequently Asked Questions</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Find answers to common questions about homeopathy and our treatment approach.</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-homeo-50 rounded-2xl p-8 border border-homeo-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">Contact us directly and we'll be happy to help.</p>
            <a href="tel:+919876543210" className="btn-primary inline-flex">
              Call Us: +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
