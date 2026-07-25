import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'prescriptions'>('info');

  useEffect(() => { loadPatient(); }, [id]);

  const loadPatient = async () => {
    try {
      const pRes = await api.get(`/patients/${id}`);
      setPatient(pRes.data);
    } catch (err) { console.error(err); }
    try {
      const prRes = await api.get(`/prescriptions?patient_id=${id}`);
      setPrescriptions(prRes.data.prescriptions || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div></div>;
  if (!patient) return <div className="text-center py-12 text-gray-500">Patient not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{patient.full_name}</h1>
          <p className="text-sm text-gray-500 font-mono">{patient.patient_id}</p>
        </div>
        <Link to={`/prescriptions/new/${patient.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
          <HiOutlineDocumentText className="w-4 h-4" />
          Write Prescription
        </Link>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {(['info', 'prescriptions'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {tab === 'info' ? 'Patient Info' : `Prescriptions (${prescriptions.length})`}
          </button>
        ))}
      </div>

      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Personal Details</h2>
            <div className="space-y-3 text-sm">
              {[
                ['Gender', patient.gender],
                ['Age', patient.age],
                ['DOB', patient.date_of_birth],
                ['Mobile', patient.mobile],
                ['Alt Mobile', patient.alternate_mobile],
                ['Email', patient.email],
                ['Blood Group', patient.blood_group],
                ['Occupation', patient.occupation],
                ['Address', [patient.address, patient.city, patient.state].filter(Boolean).join(', ')],
                ['Emergency Contact', patient.emergency_contact],
              ].map(([label, value]) => value ? (
                <div key={label as string} className="flex">
                  <span className="w-32 sm:w-36 text-gray-500 shrink-0">{label}</span>
                  <span className="text-gray-800 min-w-0 break-words">{value}</span>
                </div>
              ) : null)}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Medical Information</h2>
            <div className="space-y-3 text-sm">
              {[
                ['Allergies', patient.allergies],
                ['Chronic Diseases', patient.chronic_diseases],
                ['Previous Surgery', patient.previous_surgery],
                ['Current Medication', patient.current_medication],
                ['Remarks', patient.medical_remarks],
              ].map(([label, value]) => value ? (
                <div key={label as string}>
                  <p className="text-gray-500 mb-1">{label}</p>
                  <p className="text-gray-800 bg-gray-50 p-2 rounded">{value}</p>
                </div>
              ) : null)}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'prescriptions' && (
        <div className="space-y-3">
          {prescriptions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border">
              <HiOutlineDocumentText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No prescriptions yet</p>
              <Link to={`/prescriptions/new/${patient.id}`} className="inline-block mt-3 text-sm text-primary-600 hover:text-primary-700">Write first prescription</Link>
            </div>
          ) : prescriptions.map((presc) => (
            <Link key={presc.id} to={`/prescriptions/${presc.id}`}
              className="block bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-primary-200 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-mono text-primary-600 text-sm">{presc.prescription_number}</p>
                  <p className="text-gray-800 font-medium">{presc.created_at?.split('T')[0]}</p>
                  {presc.diagnosis && <p className="text-xs text-gray-500 mt-1">{presc.diagnosis}</p>}
                </div>
                <HiOutlineDocumentText className="w-5 h-5 text-gray-400 sm:self-center" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
