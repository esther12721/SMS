import { useEffect, useState } from 'react';
import api from '../api/axios';
import {
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

export default function Reports() {
  const [period, setPeriod] = useState('daily');
  const [data, setData] = useState({
    stockIn: 0,
    stockOut: 0,
    transactions: [],
  });
  const [stock, setStock] = useState([]);

  const load = async () => {
    try {
      const summary = await api.get(
        `/reports/summary?period=${period}`
      );

      const stockData = await api.get('/reports/stock');

      setData(summary.data);
      setStock(stockData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load();
  }, [period]);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-2xl p-5 shadow-xl">
        <h1 className="text-2xl font-bold text-white">
          📊 Inventory Reports
        </h1>

        <p className="text-cyan-100 text-sm mt-1">
          Track stock movement and monitor inventory performance.
        </p>
      </div>

      {/* Filters + Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">

        {/* Period Buttons */}
        <div className="flex flex-wrap gap-2 mb-5">
          {['daily', 'weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`
                px-4 py-2 rounded-xl text-sm font-semibold
                transition-all duration-300
                ${
                  period === p
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Stock In */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-white/80 text-sm">
                  Stock IN ({period})
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                  {data.stockIn}
                </h2>
              </div>

              <div className="bg-white/20 p-3 rounded-xl">
                <FiTrendingUp size={22} className="text-white" />
              </div>

            </div>
          </div>

          {/* Stock Out */}
          <div className="bg-gradient-to-br from-rose-500 to-red-700 rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-white/80 text-sm">
                  Stock OUT ({period})
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                  {data.stockOut}
                </h2>
              </div>

              <div className="bg-white/20 p-3 rounded-xl">
                <FiTrendingDown size={22} className="text-white" />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Stock Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-x-auto">

        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2
            size={22}
            className="text-cyan-400"
          />

          <h2 className="text-lg font-bold text-white">
            Available Stock
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-2 text-slate-400">
                Code
              </th>

              <th className="text-left py-3 px-2 text-slate-400">
                Product
              </th>

              <th className="text-left py-3 px-2 text-slate-400">
                Category
              </th>

              <th className="text-left py-3 px-2 text-slate-400">
                Quantity
              </th>

              <th className="text-left py-3 px-2 text-slate-400">
                Unit Price
              </th>
            </tr>
          </thead>

          <tbody>
            {stock.map((item) => (
              <tr
                key={item._id}
                className="border-b border-slate-800 hover:bg-slate-800/50 transition"
              >
                <td className="py-3 px-2 text-slate-200">
                  {item.productCode}
                </td>

                <td className="py-3 px-2 font-medium text-white">
                  {item.productName}
                </td>

                <td className="py-3 px-2 text-slate-300">
                  {item.category}
                </td>

                <td className="py-3 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.quantityInStock <= 5
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.quantityInStock}
                  </span>
                </td>

                <td className="py-3 px-2 text-cyan-400 font-medium">
                  ${item.unitPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {stock.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            No stock records found.
          </div>
        )}

      </div>

    </div>
  );
}