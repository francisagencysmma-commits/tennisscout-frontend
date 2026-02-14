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
    <aside className="bg-white w-20 min-h-screen flex flex-col items-center py-8 border-r border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="mb-12">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-xl font-bold text-gray-700">T</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-semibold text-sm">MS</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;