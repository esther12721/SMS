import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', form);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);

      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-900 to-slate-900 p-4">

      <form onSubmit={submit} className="card w-full max-w-md shadow-2xl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-brand-dark mb-2">
          📦 StockHub
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Sign in to your account
        </p>

        {/* ERROR */}
        {err && (
          <div className="bg-red-50 text-red-600 p-2 rounded mb-3 text-sm">
            {err}
          </div>
        )}

        {/* USERNAME */}
        <label className="label">Username</label>
        <input
          className="input mb-3"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          placeholder="Enter username"
          required
        />

        {/* PASSWORD */}
        <label className="label">Password</label>
        <input
          type="password"
          className="input mb-4"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          placeholder="Enter password"
          required
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`btn btn-primary w-full ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* REGISTER LINK */}
        <p className="text-sm text-center mt-4 text-slate-600">
          No account?{' '}
          <Link to="/register" className="text-brand font-medium">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}