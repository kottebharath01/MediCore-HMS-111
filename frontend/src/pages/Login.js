import React, { useState } from 'react';
import { login, register } from '../utils/api';
import toast from 'react-hot-toast';

export default function Login({ onAuthenticated }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', password:'', age:'', gender:'Male', phone:'' });
  const [saving, setSaving] = useState(false);
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  async function submit(event) {
    event.preventDefault(); setSaving(true);
    try {
      const response = isRegistering ? await register(form) : await login(form);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onAuthenticated(response.data.user);
      toast.success(isRegistering ? 'Account created' : 'Welcome back');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to sign in');
    } finally { setSaving(false); }
  }

  return <main className="login-page"><section className="login-card">
    <div className="sidebar-logo"><h1><span>Medi</span>Core</h1><p>Hospital Management</p></div>
    <h2>{isRegistering ? 'Create patient account' : 'Sign in'}</h2>
    <p className="text-muted">{isRegistering ? 'Book and manage your own appointments.' : 'Use your MediCore account to continue.'}</p>
    <form onSubmit={submit}>
      {isRegistering && <><div className="form-group"><label className="form-label">Full name</label><input required className="form-control" value={form.name} onChange={e=>set('name',e.target.value)} /></div>
      <div className="form-grid"><div className="form-group"><label className="form-label">Age</label><input required min="0" className="form-control" type="number" value={form.age} onChange={e=>set('age',e.target.value)} /></div><div className="form-group"><label className="form-label">Gender</label><select className="form-control" value={form.gender} onChange={e=>set('gender',e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></div></div>
      <div className="form-group"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={e=>set('phone',e.target.value)} /></div></>}
      <div className="form-group"><label className="form-label">Email</label><input required type="email" className="form-control" value={form.email} onChange={e=>set('email',e.target.value)} /></div>
      <div className="form-group"><label className="form-label">Password</label><input required minLength="8" type="password" className="form-control" value={form.password} onChange={e=>set('password',e.target.value)} /></div>
      <button className="btn btn-primary login-submit" disabled={saving}>{saving ? 'Please wait…' : isRegistering ? 'Create account' : 'Sign in'}</button>
    </form>
    <button className="btn-link" onClick={()=>setIsRegistering(!isRegistering)}>{isRegistering ? 'Already have an account? Sign in' : 'New patient? Create an account'}</button>
    {!isRegistering && <p className="login-hint">Demo admin: admin@medicore.local / Admin@123</p>}
  </section></main>;
}
