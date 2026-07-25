import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DoctorPage from './pages/DoctorPage';
import TreatmentsPage from './pages/TreatmentsPage';
import DiseasesPage from './pages/DiseasesPage';
import DiseaseDetailPage from './pages/DiseaseDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
import GalleryPage from './pages/GalleryPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import FaqsPage from './pages/FaqsPage';
import DownloadPrescriptionPage from './pages/DownloadPrescriptionPage';
import BranchesPage from './pages/BranchesPage';
import ContactPage from './pages/ContactPage';
import EmergencyPage from './pages/EmergencyPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import NewPatient from './pages/NewPatient';
import Prescriptions from './pages/Prescriptions';
import PrescriptionDetail from './pages/PrescriptionDetail';
import Fees from './pages/Fees';
import FeeCollection from './pages/FeeCollection';
import Medicines from './pages/Medicines';
import Books from './pages/Books';
import Branches from './pages/Branches';
import Receptionists from './pages/Receptionists';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Tokens from './pages/Tokens';

function AppRoutes() {
  const { token } = useAuth();
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/doctor" element={<DoctorPage />} />
      <Route path="/treatments" element={<TreatmentsPage />} />
      <Route path="/diseases" element={<DiseasesPage />} />
      <Route path="/diseases/:id" element={<DiseaseDetailPage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/video-gallery" element={<VideoGalleryPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/download-prescription" element={<DownloadPrescriptionPage />} />
      <Route path="/branches" element={<BranchesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />

      {/* Login */}
      <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />

      {/* Protected Admin Pages */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><Layout><Patients /></Layout></ProtectedRoute>} />
      <Route path="/patients/new" element={<ProtectedRoute><Layout><NewPatient /></Layout></ProtectedRoute>} />
      <Route path="/patients/search" element={<ProtectedRoute><Layout><Patients /></Layout></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute><Layout><PatientDetail /></Layout></ProtectedRoute>} />
      <Route path="/prescriptions" element={<ProtectedRoute><Layout><Prescriptions /></Layout></ProtectedRoute>} />
      <Route path="/prescriptions/new" element={<ProtectedRoute><Layout><PrescriptionDetail /></Layout></ProtectedRoute>} />
      <Route path="/prescriptions/new/:patientId" element={<ProtectedRoute><Layout><PrescriptionDetail /></Layout></ProtectedRoute>} />
      <Route path="/prescriptions/:id" element={<ProtectedRoute><Layout><PrescriptionDetail /></Layout></ProtectedRoute>} />
      <Route path="/fees" element={<ProtectedRoute><Layout><Fees /></Layout></ProtectedRoute>} />
      <Route path="/fees/collect" element={<ProtectedRoute><Layout><FeeCollection /></Layout></ProtectedRoute>} />
      <Route path="/medicines" element={<ProtectedRoute requiredRole="doctor"><Layout><Medicines /></Layout></ProtectedRoute>} />
      <Route path="/books" element={<ProtectedRoute requiredRole="doctor"><Layout><Books /></Layout></ProtectedRoute>} />
      <Route path="/branches-admin" element={<ProtectedRoute requiredRole="doctor"><Layout><Branches /></Layout></ProtectedRoute>} />
      <Route path="/receptionists" element={<ProtectedRoute requiredRole="doctor"><Layout><Receptionists /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute requiredRole="doctor"><Layout><Reports /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/tokens" element={<ProtectedRoute><Layout><Tokens /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
