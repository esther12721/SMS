import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Warehouses from './pages/Warehouses';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Layout from './components/Layout';

const Protected = ({ children }) =>
  localStorage.getItem('token') ? children : <Navigate to="/login" />;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Protected><Layout /></Protected>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="warehouses" element={<Warehouses />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
