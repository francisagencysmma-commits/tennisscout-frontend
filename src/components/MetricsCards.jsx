import React from 'react';
import { Zap, Trophy, Activity, Target, TrendingUp, TrendingDown } from 'lucide-react';

const MetricsCards = ({ metrics }) => {
  const iconMap = {
    zap: Zap,
    trophy: Trophy,
    activity: Activity,
    target: Target,
  };

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName] || Activity;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(metrics).map(([key, metric]) => {
        const isPositive = metric.trend === 'up';
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        
        return (
          <div 
            key={key}
            className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300 border border-slate-100 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isPositive 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-slate-100 text-slate-600'
              } group-hover:scale-110 transition-transform duration-300`}>
                {getIcon(metric.icon)}
              </div>
              
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                isPositive 
                  ? 'bg-tennis-green/10 text-tennis-green' 
                  : 'bg-red-100 text-red-600'
              }`}>
                <TrendIcon className="w-3 h-3" />
                <span>{metric.change}</span>
              </div>
            </div>

            <h4 className="text-sm text-slate-600 mb-2">{metric.label}</h4>
            <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">vs. mes anterior</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
