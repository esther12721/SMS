import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Transactions() {
  const [list, setList] = useState([]);
  const empty = { productCode:'', warehouseCode:'', transactionDate:'', quantityMoved:0, transactionType:'IN' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const load = async () => setList((await api.get('/transactions')).data);
  useEffect(() => { load(); }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/transactions/${editId}`, form);
      else await api.post('/transactions', form);
      setForm(empty); setEditId(null); load();
    } catch (e) { alert(e.response?.data?.message || 'Error'); }
  };

  const edit = t => { setEditId(t._id); setForm({ ...t, transactionDate: t.transactionDate?.slice(0,10) }); };
  const del = async id => { if (confirm('Delete?')) { await api.delete(`/transactions/${id}`); load(); } };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">{editId ? 'Update' : 'Add'} Transaction</h3>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="label">Product Code</label><input className="input" value={form.productCode} onChange={e=>setForm({...form,productCode:e.target.value})} required/></div>
          <div><label className="label">Warehouse Code</label><input className="input" value={form.warehouseCode} onChange={e=>setForm({...form,warehouseCode:e.target.value})} required/></div>
          <div><label className="label">Date</label><input type="date" className="input" value={form.transactionDate} onChange={e=>setForm({...form,transactionDate:e.target.value})} required/></div>
          <div><label className="label">Quantity Moved</label><input type="number" className="input" value={form.quantityMoved} onChange={e=>setForm({...form,quantityMoved:+e.target.value})} required/></div>
          <div><label className="label">Type</label>
            <select className="input" value={form.transactionType} onChange={e=>setForm({...form,transactionType:e.target.value})}>
              <option value="IN">Stock IN</option><option value="OUT">Stock OUT</option>
            </select>
          </div>
          <div className="md:col-span-3 flex gap-2">
            <button className="btn btn-primary">{editId ? 'Update' : 'Save'}</button>
            {editId && <button type="button" className="btn bg-slate-200" onClick={()=>{setEditId(null);setForm(empty);}}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Transactions</h3>
        <table className="w-full">
          <thead><tr>{['Date','Product','Warehouse','Qty','Type','Actions'].map(h=><th key={h} className="table-th">{h}</th>)}</tr></thead>
          <tbody>{list.map(t=>(
            <tr key={t._id}>
              <td className="table-td">{t.transactionDate?.slice(0,10)}</td>
              <td className="table-td">{t.productCode}</td>
              <td className="table-td">{t.warehouseCode}</td>
              <td className="table-td">{t.quantityMoved}</td>
              <td className="table-td"><span className={`px-2 py-1 rounded text-xs ${t.transactionType==='IN'?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-700'}`}>{t.transactionType}</span></td>
              <td className="table-td space-x-2">
                <button onClick={()=>edit(t)} className="btn btn-warn !py-1 !px-2 text-xs">Edit</button>
                <button onClick={()=>del(t._id)} className="btn btn-danger !py-1 !px-2 text-xs">Delete</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
