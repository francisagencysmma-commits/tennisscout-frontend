import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CustomRadarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Análisis de Habilidades</h3>
      <p className="text-sm text-slate-600 mb-6">Evaluación técnica basada en IA</p>
      
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Radar 
            name="Habilidades" 
            dataKey="value" 
            stroke="#0ea5e9" 
            fill="#0ea5e9" 
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px'
            }}
            formatter={(value) => `${value}/100`}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            <div>
              <p className="text-xs text-slate-600">{item.skill}</p>
              <p className="text-sm font-bold text-slate-900">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomRadarChart;
