import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Warehouses() {
  const [list, setList] = useState([]);
  const empty = { warehouseCode:'', warehouseName:'', warehouseLocation:'' };
  const [form, setForm] = useState(empty);
  const load = async () => setList((await api.get('/warehouses')).data);
  useEffect(() => { load(); }, []);
  const submit = async e => {
    e.preventDefault();
    try { await api.post('/warehouses', form); setForm(empty); load(); }
    catch (e) { alert(e.response?.data?.message || 'Error'); }
  };
  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Add Warehouse</h3>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['warehouseCode','warehouseName','warehouseLocation'].map(k=>(
            <div key={k}><label className="label">{k}</label><input className="input" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required/></div>
          ))}
          <div className="md:col-span-3"><button className="btn btn-primary">Save Warehouse</button></div>
        </form>
      </div>
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Warehouses</h3>
        <table className="w-full">
          <thead><tr>{['Code','Name','Location'].map(h=><th key={h} className="table-th">{h}</th>)}</tr></thead>
          <tbody>{list.map(w=>(
            <tr key={w._id}>
              <td className="table-td">{w.warehouseCode}</td><td className="table-td">{w.warehouseName}</td><td className="table-td">{w.warehouseLocation}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
