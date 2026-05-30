import { useEffect, useState } from 'react';
import api from '../api/axios';
import {
  FiPackage,
  FiHome,
  FiRepeat,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    warehouses: 0,
    transactions: 0,
  });

  const [report, setReport] = useState({
    stockIn: 0,
    stockOut: 0,
  });

  const [stockList, setStockList] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);

        const [products, warehouses, transactions, summary, stock] =
          await Promise.allSettled([
            api.get('/products'),
            api.get('/warehouses'),
            api.get('/transactions'),
            api.get('/reports/summary?period=daily'),
            api.get('/reports/stock'),
          ]);

        // PRODUCTS
        const productCount =
          products.status === 'fulfilled'
            ? products.value.data.length
            : 0;

        const warehouseCount =
          warehouses.status === 'fulfilled'
            ? warehouses.value.data.length
            : 0;

        const transactionCount =
          transactions.status === 'fulfilled'
            ? transactions.value.data.length
            : 0;

        setStats({
          products: productCount,
          warehouses: warehouseCount,
          transactions: transactionCount,
        });

        // REPORT
        setReport({
          stockIn:
            summary.status === 'fulfilled'
              ? summary.value.data?.stockIn || 0
              : 0,

          stockOut:
            summary.status === 'fulfilled'
              ? summary.value.data?.stockOut || 0
              : 0,
        });

        // STOCK LIST
        setStockList(
          stock.status === 'fulfilled'
            ? stock.value.data || []
            : []
        );

      } catch (err) {
        console.error(err);
        setError('Server error: check backend connection');
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-5">

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl">
          {error}
        </div>
      )}

      {/* HEADER */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-2xl p-5 shadow-xl text-white">
        <h1 className="text-2xl font-bold">
          📦 StockHub Dashboard
        </h1>
        <p className="text-cyan-100 text-sm mt-1">
          Safe mode dashboard (prevents API crashes)
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-cyan-600 p-4 rounded-2xl text-white">
          <FiPackage />
          <p>Products</p>
          <h2 className="text-2xl font-bold">{stats.products}</h2>
        </div>

        <div className="bg-emerald-600 p-4 rounded-2xl text-white">
          <FiTrendingUp />
          <p>Stock IN</p>
          <h2 className="text-2xl font-bold">{report.stockIn}</h2>
        </div>

        <div className="bg-rose-600 p-4 rounded-2xl text-white">
          <FiTrendingDown />
          <p>Stock OUT</p>
          <h2 className="text-2xl font-bold">{report.stockOut}</h2>
        </div>

      </div>

      {/* STOCK TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-x-auto">

        <h2 className="text-white font-bold mb-4">
          Stock Overview
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800">
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Category</th>
              <th className="text-left p-2">Stock</th>
            </tr>
          </thead>

          <tbody>
            {stockList.map((item) => (
              <tr key={item._id} className="border-b border-slate-800">
                <td className="p-2 text-white">{item.productName}</td>
                <td className="p-2 text-slate-400">{item.category}</td>
                <td className="p-2 text-white">
                  {item.quantityInStock}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {stockList.length === 0 && (
          <p className="text-slate-500 text-center py-4">
            No data available (check backend API)
          </p>
        )}

      </div>

    </div>
  );
}