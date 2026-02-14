import React from 'react';
import { User, BarChart3, Video, Trophy } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'profile', icon: User },
    { id: 'stats', icon: BarChart3 },
    { id: 'videos', icon: Video },
    { id: 'tournaments', icon: Trophy },
    { id: 'explore', icon: User },
  ];

  return (
    <div className="w-20 bg-dark-50 border-r border-dark-200 flex flex-col items-center py-8 space-y-8">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
        <span className="text-2xl font-bold text-white">T</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                ${isActive 
                  ? 'bg-primary-600 text-white shadow-glow' 
                  : 'text-dark-500 hover:bg-dark-100 hover:text-primary-400'
                }
              `}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center">
        <span className="text-sm font-bold text-white">MS</span>
      </div>
    </div>
  );
};

export default Sidebar;