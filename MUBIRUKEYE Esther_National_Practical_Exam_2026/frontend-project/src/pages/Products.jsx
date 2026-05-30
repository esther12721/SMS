import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Products() {
  const [list, setList] = useState([]);
  const empty = { productCode:'', productName:'', category:'', quantityInStock:0, unitPrice:0, supplierName:'', dateReceived:'' };
  const [form, setForm] = useState(empty);
  const load = async () => setList((await api.get('/products')).data);
  useEffect(() => { load(); }, []);

  const submit = async e => {
    e.preventDefault();
    try { await api.post('/products', form); setForm(empty); load(); }
    catch (e) { alert(e.response?.data?.message || 'Error'); }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Add Product</h3>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['productCode','productName','category','supplierName'].map(k=>(
            <div key={k}><label className="label">{k}</label><input className="input" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required={k!=='category'&&k!=='supplierName'}/></div>
          ))}
          <div><label className="label">Quantity</label><input type="number" className="input" value={form.quantityInStock} onChange={e=>setForm({...form,quantityInStock:+e.target.value})}/></div>
          <div><label className="label">Unit Price</label><input type="number" step="0.01" className="input" value={form.unitPrice} onChange={e=>setForm({...form,unitPrice:+e.target.value})}/></div>
          <div><label className="label">Date Received</label><input type="date" className="input" value={form.dateReceived} onChange={e=>setForm({...form,dateReceived:e.target.value})}/></div>
          <div className="md:col-span-3"><button className="btn btn-primary">Save Product</button></div>
        </form>
      </div>

      <div className="card overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Products</h3>
        <table className="w-full">
          <thead><tr>{['Code','Name','Category','Qty','Price','Supplier','Received'].map(h=><th key={h} className="table-th">{h}</th>)}</tr></thead>
          <tbody>{list.map(p=>(
            <tr key={p._id}>
              <td className="table-td">{p.productCode}</td><td className="table-td">{p.productName}</td>
              <td className="table-td">{p.category}</td><td className="table-td">{p.quantityInStock}</td>
              <td className="table-td">{p.unitPrice}</td><td className="table-td">{p.supplierName}</td>
              <td className="table-td">{p.dateReceived?.slice(0,10)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
