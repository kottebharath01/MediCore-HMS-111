import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar      from './components/Sidebar';
import Topbar       from './components/Topbar';
import Dashboard    from './pages/Dashboard';
import Patients     from './pages/Patients';
import Doctors      from './pages/Doctors';
import Appointments from './pages/Appointments';
import Records      from './pages/Records';
import Wards        from './pages/Wards';
import Staff        from './pages/Staff';
import Login        from './pages/Login';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const logout = () => { localStorage.removeItem('access_token'); localStorage.removeItem('user'); setUser(null); };
  return (
    <BrowserRouter>
      {!user ? <Login onAuthenticated={setUser} /> : <div className="app-layout">
        <Sidebar user={user} />
        <div className="main-content">
          <Topbar user={user} onLogout={logout} />
          <Routes>
            <Route path="/"             element={<Dashboard />} />
            <Route path="/patients"     element={user.role === 'admin' ? <Patients /> : <Navigate to="/" replace />} />
            <Route path="/doctors"      element={<Doctors />} />
            <Route path="/appointments" element={<Appointments user={user} />} />
            <Route path="/records"      element={<Records user={user} />} />
            <Route path="/wards"        element={user.role === 'admin' ? <Wards /> : <Navigate to="/" replace />} />
            <Route path="/staff"        element={user.role === 'admin' ? <Staff /> : <Navigate to="/" replace />} />
            <Route path="*"             element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily:'Inter,sans-serif', fontSize:'0.875rem', borderRadius:'10px', boxShadow:'0 4px 16px rgba(0,0,0,0.12)' },
          success: { iconTheme: { primary:'#00a99d', secondary:'#fff' } },
        }}
      />
    </BrowserRouter>
  );
}
