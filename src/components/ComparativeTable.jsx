import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ComparativeTable = ({ data }) => {
  const calculateDifference = (player, average) => {
    const diff = ((player - average) / average * 100).toFixed(1);
    return parseFloat(diff);
  };

  const getDifferenceIcon = (diff) => {
    if (diff > 0) return <TrendingUp className="w-4 h-4 text-tennis-green" />;
    if (diff < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getDifferenceColor = (diff) => {
    if (diff > 10) return 'text-tennis-green';
    if (diff > 0) return 'text-blue-600';
    if (diff < -10) return 'text-red-600';
    if (diff < 0) return 'text-orange-500';
    return 'text-slate-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Comparativa vs Promedio</h3>
        <p className="text-sm text-slate-600">Comparación con jugadores de categoría Junior Elite</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Métrica
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Jugador
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Promedio
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Diferencia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row, index) => {
              const diff = calculateDifference(row.player, row.average);
              
              return (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg font-bold text-primary-700">
                      {row.player}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">{row.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-slate-600">
                      {row.average}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">{row.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {getDifferenceIcon(diff)}
                      <span className={`text-sm font-semibold ${getDifferenceColor(diff)}`}>
                        {diff > 0 ? '+' : ''}{diff}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">Métricas Superiores</p>
            <p className="text-2xl font-bold text-tennis-green">
              {data.filter(d => calculateDifference(d.player, d.average) > 0).length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">En Promedio</p>
            <p className="text-2xl font-bold text-slate-600">
              {data.filter(d => calculateDifference(d.player, d.average) === 0).length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-1">Por Mejorar</p>
            <p className="text-2xl font-bold text-orange-500">
              {data.filter(d => calculateDifference(d.player, d.average) < 0).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeTable;
