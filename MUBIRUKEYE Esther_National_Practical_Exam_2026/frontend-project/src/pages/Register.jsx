import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setMsg('✅ Registered! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (e) { setMsg(e.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-yellow to-brand p-4 ">
      <form onSubmit={submit} className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-brand-dark mb-2">Create Account</h1>
        <p className="text-center text-slate-500 mb-6">Join StockHub SMS</p>
        {msg && <div className="bg-blue-50 text-blue-700 p-2 rounded mb-3 text-sm">{msg}</div>}
        <label className="label">Username</label>
        <input className="input mb-3" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required/>
        <label className="label">Password</label>
        <input type="password" className="input mb-4" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/>
        <button className="btn btn-primary w-full">Register</button>
        <p className="text-sm text-center mt-4 text-slate-600">Have an account? <Link to="/login" className="text-brand font-medium">Login</Link></p>
      </form>
    </div>
  );
}
