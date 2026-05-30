import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const username = localStorage.getItem('username') || 'User';

  const link = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      
      {/* Sidebar */}
      <aside className="md:w-64 bg-slate-900 border-r border-slate-800 p-4 md:min-h-screen">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-indigo-400">
            📦 StockHub
          </h1>

          <button
            className="md:hidden text-slate-300 text-xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        <nav className={`${open ? 'block' : 'hidden'} md:block space-y-2`}>
          
          <NavLink to="/" end className={link}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/products" className={link}>
            📦 Product
          </NavLink>

          <NavLink to="/warehouses" className={link}>
            🏢 Warehouse
          </NavLink>

          <NavLink to="/transactions" className={link}>
            🔄 Transactions
          </NavLink>

          <NavLink to="/reports" className={link}>
            📈 Reports
          </NavLink>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-900/30 transition-all"
          >
            🚪 Logout
          </button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-slate-950">
        
        <div className="flex justify-between items-center mb-8 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">
          
          <div>
            <h2 className="text-2xl font-bold text-white">
              Stock Management System
            </h2>

            <p className="text-sm text-slate-400">
              Inventory & Warehouse Management
            </p>
          </div>

          <div className="bg-slate-800 px-4 py-2 rounded-xl">
            <span className="text-slate-400">Hello, </span>
            <span className="font-semibold text-indigo-400">
              {username}
            </span>
          </div>

        </div>

        <Outlet />

      </main>
    </div>
  );
}