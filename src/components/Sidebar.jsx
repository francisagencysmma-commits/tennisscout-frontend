import React from 'react';
import { User, BarChart3, Video, Trophy, Users } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'tournaments', icon: Trophy, label: 'Tournaments' },
    { id: 'explore', icon: Users, label: 'Explore' },
  ];

  return (
    <div className="w-20 bg-dark-deepest border-r border-lime-neon/20 flex flex-col items-center py-8 space-y-6">
      <div className="w-12 h-12 bg-lime-neon rounded-xl flex items-center justify-center shadow-neon mb-4">
        <span className="text-2xl font-bold text-dark-deepest">T</span>
      </div>

      <nav className="flex-1 flex flex-col space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isActive 
                  ? 'bg-lime-neon text-dark-deepest shadow-neon' 
                  : 'text-cream-100 hover:bg-dark-light hover:text-lime-neon'
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </nav>

      <div className="w-12 h-12 bg-gradient-to-br from-lime-neon to-lime-bright rounded-xl flex items-center justify-center">
        <span className="text-sm font-bold text-dark-deepest">MS</span>
      </div>
    </div>
  );
};

export default Sidebar;