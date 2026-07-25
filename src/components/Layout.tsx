import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineHome, HiOutlineUserGroup, HiOutlineDocumentText,
  HiOutlineCurrencyDollar, HiOutlineCollection, HiOutlineBookOpen,
  HiOutlineOfficeBuilding, HiOutlineSearch, HiOutlineCog,
  HiOutlineLogout, HiOutlineMenu, HiOutlineX, HiOutlineUserCircle,
  HiOutlineClipboardList, HiOutlineBell, HiOutlineTemplate,
} from 'react-icons/hi';

const doctorLinks = [
  { to: '/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/tokens', icon: HiOutlineClipboardList, label: 'Tokens' },
  { to: '/patients', icon: HiOutlineUserGroup, label: 'Patients' },
  { to: '/prescriptions', icon: HiOutlineDocumentText, label: 'Prescriptions' },
  { to: '/fees', icon: HiOutlineCurrencyDollar, label: 'Fee Management' },
  { to: '/medicines', icon: HiOutlineCollection, label: 'Medicine Library' },
  { to: '/books', icon: HiOutlineBookOpen, label: 'Medical Books' },
    { to: '/branches-admin', icon: HiOutlineOfficeBuilding, label: 'Branches' },
  { to: '/receptionists', icon: HiOutlineUserGroup, label: 'Receptionists' },
  { to: '/reports', icon: HiOutlineTemplate, label: 'Reports' },
  { to: '/profile', icon: HiOutlineCog, label: 'Profile' },
];

const receptionistLinks = [
  { to: '/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/patients/new', icon: HiOutlineUserGroup, label: 'Register Patient' },
  { to: '/patients/search', icon: HiOutlineSearch, label: 'Search Patient' },
  { to: '/fees/collect', icon: HiOutlineCurrencyDollar, label: 'Fee Collection' },
  { to: '/tokens', icon: HiOutlineClipboardList, label: 'Tokens' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isDoctor } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const links = isDoctor ? doctorLinks : receptionistLinks;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">DC</div>
            <span className="font-semibold text-gray-800 text-sm">Doctor Clinic</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <HiOutlineUserCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.full_name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
            <HiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search patients, prescriptions..." className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-primary-300" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
