import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function DoctorPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Our Doctor</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Meet Our Specialist</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Qualified, experienced, and dedicated to your health through scientific homeopathic practice.</p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-homeo-100 to-primary-100 rounded-3xl p-8 text-center">
                <div className="w-48 h-48 mx-auto rounded-full bg-white shadow-xl flex items-center justify-center text-7xl mb-6">
                  👨‍⚕️
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Dr. [Doctor Name]</h2>
                <p className="text-homeo-600 font-medium mt-1">Homeopathic Specialist</p>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Doctor Profile</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Qualification', value: 'BHMS / MD (Homeopathy)' },
                    { label: 'Registration Number', value: 'XX-XXXXX' },
                    { label: 'Experience', value: '15+ Years' },
                    { label: 'Languages', value: 'English, Hindi, Regional' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-semibold text-gray-800 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Kidney Diseases', 'Skin Diseases', 'PCOD/PCOS', 'Diabetes Support',
                    'Joint Pain & Arthritis', 'Child Diseases', 'Respiratory Disorders',
                    'Hair & Scalp Problems', 'Digestive Disorders', 'Migraine',
                  ].map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-homeo-50 text-homeo-700 rounded-full text-sm font-medium border border-homeo-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">Consultation Timing</h4>
                <div className="bg-homeo-50 rounded-xl p-6 border border-homeo-100">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Monday - Friday:</span> <span className="font-semibold ml-2">10:00 AM - 8:00 PM</span></div>
                    <div><span className="text-gray-500">Saturday:</span> <span className="font-semibold ml-2">10:00 AM - 5:00 PM</span></div>
                    <div><span className="text-gray-500">Sunday:</span> <span className="font-semibold ml-2 text-homeo-600">By Appointment Only</span></div>
                    <div><span className="text-gray-500">Online Consultation:</span> <span className="font-semibold ml-2">Available</span></div>
                  </div>
                </div>
              </div>

              <a href="tel:+919876543210" className="btn-primary inline-flex">
                Book Consultation <HiOutlineArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Note about future doctors */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Our hospital supports multiple doctors. Additional specialist profiles will be added as they join our team.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
