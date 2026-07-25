import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { HiOutlineDownload } from 'react-icons/hi';

export default function DownloadPrescriptionPage() {
  const [mobile, setMobile] = useState('');
  const [prescriptionNo, setPrescriptionNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!mobile || !prescriptionNo) {
      setError('Please enter both mobile number and prescription number.');
      return;
    }
    setLoading(true);
    // Simulated - would connect to backend API
    setTimeout(() => {
      setError('Prescription not found. Please check your details and try again.');
      setLoading(false);
    }, 2000);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 to-homeo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-homeo-300 font-semibold text-sm uppercase tracking-wider">Prescription</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Download Prescription</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl">Access and download your previous prescriptions from our clinic management system.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-homeo-100 rounded-full flex items-center justify-center mb-4">
                <HiOutlineDownload className="w-8 h-8 text-homeo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Download Your Prescription</h2>
              <p className="text-gray-500 text-sm mt-1">Enter your details to download the PDF prescription</p>
            </div>

            <form onSubmit={handleDownload} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="Enter registered mobile number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Prescription Number</label>
                <input
                  type="text"
                  value={prescriptionNo}
                  onChange={e => setPrescriptionNo(e.target.value)}
                  placeholder="e.g., RX202401010001"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-homeo-500 focus:border-homeo-500 transition-all text-sm"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary !py-3.5 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Searching...
                  </span>
                ) : (
                  <>
                    <HiOutlineDownload className="w-5 h-5" /> Download Prescription
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              Your prescription number was provided to you at the time of consultation. If you need help, please call us.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
