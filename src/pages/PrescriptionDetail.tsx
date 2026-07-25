import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import api from '../utils/api';
import toast from 'react-hot-toast';
import PrescriptionPDF, { PrescriptionData } from '../components/prescription/PrescriptionPDF';
import { generateQRCodeDataURL, buildPrescriptionQRData } from '../utils/qrcode';
import { HiOutlineDownload, HiOutlinePrinter, HiOutlineArrowLeft } from 'react-icons/hi';

function MedicineInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/medicines?search=${query}&limit=8`);
        setSuggestions(res.data.medicines || []);
        setOpen(true);
      } catch { setSuggestions([]); }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  const select = (name: string) => {
    onChange(name);
    setQuery(name);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative sm:col-span-2">
      <input
        placeholder="Medicine Name"
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); }}
        onFocus={() => query.length >= 2 && suggestions.length > 0 && setOpen(true)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((m: any) => (
            <button key={m.id} type="button" onClick={() => select(m.medicine_name)}
              className="w-full text-left px-3 py-2 hover:bg-primary-50 text-sm flex items-center justify-between">
              <span className="font-medium text-gray-800">{m.medicine_name}</span>
              <span className="text-xs text-gray-400">{m.generic_name || m.category || ''}</span>
            </button>
          ))}
          <button type="button" onClick={() => setOpen(false)}
            className="w-full text-left px-3 py-2 text-xs text-primary-600 hover:bg-primary-50 border-t border-gray-100">
            Type your own medicine name
          </button>
        </div>
      )}
    </div>
  );
}

export default function PrescriptionDetail() {
  const { id, patientId: urlPatientId } = useParams();
  const navigate = useNavigate();
  const [presc, setPresc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [generatingPreview, setGeneratingPreview] = useState(false);

  const [patientSearch, setPatientSearch] = useState('');
  const [patientResults, setPatientResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchingPatients, setSearchingPatients] = useState(false);

  const [form, setForm] = useState({
    symptoms: '', diagnosis: '', investigations: '',
    advice: '', additional_notes: '', follow_up_date: '', doctor_notes: '',
    branch_id: '',
    medicines: [{ medicine_name: '', potency: '', dosage: '', frequency: '', duration: '', before_after: 'after', instructions: '' }],
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadPrescription();
    } else {
      setLoading(false);
      if (urlPatientId) loadPatientById(urlPatientId);
    }
  }, [id, urlPatientId]);

  useEffect(() => {
    return () => { if (previewBlobUrl) URL.revokeObjectURL(previewBlobUrl); };
  }, [previewBlobUrl]);

  useEffect(() => {
    if (patientSearch.length < 2) { setPatientResults([]); return; }
    const timer = setTimeout(async () => {
      setSearchingPatients(true);
      try {
        const res = await api.get(`/patients?search=${patientSearch}&limit=10`);
        setPatientResults(res.data.patients || []);
      } catch { setPatientResults([]); }
      finally { setSearchingPatients(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [patientSearch]);

  const loadPatientById = async (idOrPatientId: string) => {
    try {
      const res = await api.get(`/patients/${idOrPatientId}`);
      setSelectedPatient(res.data);
    } catch { toast.error('Patient not found'); }
  };

  const loadPrescription = async () => {
    try {
      const res = await api.get(`/prescriptions/${id}`);
      setPresc(res.data);
      setShowPrescription(true);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const generatePDFBlob = useCallback(async (data: PrescriptionData): Promise<Blob | null> => {
    try {
      const qrText = buildPrescriptionQRData(data);
      const qrDataUrl = await generateQRCodeDataURL(qrText);
      return await pdf(<PrescriptionPDF data={data} qrDataUrl={qrDataUrl} />).toBlob();
    } catch (err) {
      console.error('PDF generation error:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!showPrescription || !presc) return;
    const data = buildPDFData();
    if (!data) return;
    setGeneratingPreview(true);
    generatePDFBlob(data).then(blob => {
      if (blob) {
        if (previewBlobUrl) URL.revokeObjectURL(previewBlobUrl);
        setPreviewBlobUrl(URL.createObjectURL(blob));
      }
    }).finally(() => setGeneratingPreview(false));
  }, [showPrescription, presc]);

  const handleMedicineChange = (index: number, field: string, val: string) => {
    const meds = [...form.medicines];
    (meds[index] as any)[field] = val;
    setForm(prev => ({ ...prev, medicines: meds }));
  };

  const addMedicine = () => {
    setForm(prev => ({
      ...prev,
      medicines: [...prev.medicines, { medicine_name: '', potency: '', dosage: '', frequency: '', duration: '', before_after: 'after', instructions: '' }],
    }));
  };

  const removeMedicine = (index: number) => {
    setForm(prev => ({ ...prev, medicines: prev.medicines.filter((_, i) => i !== index) }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return toast.error('Please select a patient');
    setCreating(true);
    try {
      const res = await api.post('/prescriptions', {
        patient_id: selectedPatient.id,
        branch_id: form.branch_id ? parseInt(form.branch_id) : null,
        symptoms: form.symptoms,
        diagnosis: form.diagnosis,
        investigations: form.investigations,
        advice: form.advice,
        medicines: form.medicines.filter(m => m.medicine_name.trim()),
        additional_notes: form.additional_notes,
        follow_up_date: form.follow_up_date,
        doctor_notes: form.doctor_notes,
      });
      toast.success('Prescription created!');
      navigate(`/prescriptions/${res.data.id}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed');
    } finally { setCreating(false); }
  };

  const buildPDFData = (): PrescriptionData | null => {
    if (!presc) return null;
    return {
      prescription_number: presc.prescription_number,
      created_at: presc.created_at,
      barcode: presc.barcode,
      symptoms: presc.symptoms || '',
      diagnosis: presc.diagnosis || '',
      investigations: presc.investigations || '',
      advice: presc.advice || '',
      additional_notes: presc.additional_notes || '',
      follow_up_date: presc.follow_up_date || '',
      doctor_notes: presc.doctor_notes || '',
      medicines: presc.medicines,
      patient_name: presc.patient_name || '',
      patient_code: presc.patient_code || '',
      gender: presc.gender || '',
      age: presc.age || 0,
      mobile: presc.mobile || '',
      blood_group: presc.blood_group || '',
      doctor_name: presc.doctor_name || '',
      qualification: presc.qualification || '',
      registration_number: presc.registration_number || '',
      specialization: presc.specialization || '',
      branch_name: presc.branch_name || '',
      branch_address: presc.branch_address || '',
      branch_contact: presc.branch_contact || '',
      branch_timing: presc.branch_timing || '',
      previous_visit: presc.previous_visit || undefined,
      visit_number: presc.visit_number || undefined,
    };
  };

  const handleDownloadPDF = async () => {
    const data = buildPDFData();
    if (!data) return;
    setDownloading(true);
    try {
      const blob = await generatePDFBlob(data);
      if (!blob) { toast.error('Failed to generate PDF'); return; }
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = `${data.prescription_number}.pdf`;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('PDF downloaded!');
    } catch (err) {
      console.error('PDF generation error:', err);
      toast.error('Failed to generate PDF');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrintPDF = async () => {
    const data = buildPDFData();
    if (!data) return;
    setDownloading(true);
    try {
      const blob = await generatePDFBlob(data);
      if (!blob) { toast.error('Failed to generate PDF'); return; }
      const url = URL.createObjectURL(blob);
      const printWindow = window.open(url);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      toast.error('Failed to generate PDF');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
    </div>
  );

  if (showPrescription && presc) {
    const pdfData = buildPDFData();
    return (
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            onClick={() => { setShowPrescription(false); setPresc(null); setPreviewBlobUrl(null); }}
            className="flex items-center gap-2 text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to prescriptions
          </button>
          <div className="flex gap-3">
            <button
              onClick={handlePrintPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              <HiOutlinePrinter className="w-4 h-4" />
              {downloading ? 'Generating...' : 'Print'}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              <HiOutlineDownload className="w-4 h-4" />
              {downloading ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {generatingPreview ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
              <span className="ml-3 text-sm text-gray-500">Generating preview...</span>
            </div>
          ) : previewBlobUrl ? (
            <iframe
              src={previewBlobUrl}
              className="w-full border-0"
              style={{ height: '1100px' }}
              title="Prescription Preview"
            />
          ) : (
            <div className="flex items-center justify-center py-20 text-sm text-gray-400">
              Preview unavailable
            </div>
          )}
        </div>

        {/* Quick Info */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span><strong>Prescription:</strong> {presc.prescription_number}</span>
            <span><strong>Date:</strong> {presc.created_at?.split('T')[0]}</span>
            <span><strong>Patient:</strong> {presc.patient_name}</span>
            {presc.follow_up_date && <span><strong>Follow-up:</strong> {presc.follow_up_date}</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Create Prescription</h1>

      {!selectedPatient && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-3">Select Patient</h2>
          <div className="relative">
            <input
              type="text"
              value={patientSearch}
              onChange={e => setPatientSearch(e.target.value)}
              placeholder="Search by name, ID, or mobile..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
            {searchingPatients && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Searching...</div>}
          </div>
          {patientResults.length > 0 && (
            <div className="mt-2 border border-gray-200 rounded-lg divide-y max-h-60 overflow-y-auto">
              {patientResults.map((p: any) => (
                <button key={p.id} onClick={() => { setSelectedPatient(p); setPatientSearch(''); setPatientResults([]); }}
                  className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors">
                  <p className="text-sm font-medium text-gray-800">{p.full_name} <span className="text-gray-400 font-mono text-xs">{p.patient_id}</span></p>
                  <p className="text-xs text-gray-500">{p.mobile} · {p.gender} · Age {p.age}</p>
                </button>
              ))}
            </div>
          )}
          {patientSearch.length >= 2 && !searchingPatients && patientResults.length === 0 && (
            <p className="text-sm text-gray-400 mt-2">No patients found</p>
          )}
        </div>
      )}

      {selectedPatient && (
        <div className="bg-primary-50 rounded-xl border border-primary-200 p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">{selectedPatient.full_name} <span className="text-gray-500 font-mono text-xs">{selectedPatient.patient_id}</span></p>
            <p className="text-xs text-gray-500">{selectedPatient.mobile} · {selectedPatient.gender} · Age {selectedPatient.age}</p>
          </div>
          <button onClick={() => setSelectedPatient(null)} className="text-xs text-red-500 hover:text-red-700">Change</button>
        </div>
      )}

      {selectedPatient && (
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Clinical Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaints / Symptoms</label>
                <textarea value={form.symptoms} onChange={e => setForm(p => ({ ...p, symptoms: e.target.value }))} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                <textarea value={form.diagnosis} onChange={e => setForm(p => ({ ...p, diagnosis: e.target.value }))} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Findings / Investigations</label>
                <textarea value={form.investigations} onChange={e => setForm(p => ({ ...p, investigations: e.target.value }))} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Advice</label>
                <textarea value={form.advice} onChange={e => setForm(p => ({ ...p, advice: e.target.value }))} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                <input type="date" value={form.follow_up_date} onChange={e => setForm(p => ({ ...p, follow_up_date: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Medicines (℞)</h2>
              <button type="button" onClick={addMedicine} className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100">+ Add Medicine</button>
            </div>
            <p className="text-xs text-gray-400">Type to search medicine library. If not found, type your own name.</p>
            <div className="space-y-3">
              {form.medicines.map((med, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Medicine {i + 1}</span>
                    {form.medicines.length > 1 && (
                      <button type="button" onClick={() => removeMedicine(i)} className="text-red-500 text-xs">Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
                    <MedicineInput value={med.medicine_name} onChange={v => handleMedicineChange(i, 'medicine_name', v)} />
                    <input placeholder="Potency (e.g. 30C)" value={med.potency} onChange={e => handleMedicineChange(i, 'potency', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input placeholder="Dosage (e.g. 500mg)" value={med.dosage} onChange={e => handleMedicineChange(i, 'dosage', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input placeholder="Frequency (e.g. TID)" value={med.frequency} onChange={e => handleMedicineChange(i, 'frequency', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input placeholder="Duration (e.g. 5 days)" value={med.duration} onChange={e => handleMedicineChange(i, 'duration', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select value={med.before_after} onChange={e => handleMedicineChange(i, 'before_after', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option value="after">After Food</option>
                      <option value="before">Before Food</option>
                    </select>
                    <input placeholder="Special Instructions" value={med.instructions} onChange={e => handleMedicineChange(i, 'instructions', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={creating} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50">
              {creating ? 'Creating...' : 'Create Prescription'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
