import React from 'react';
import { User, Video, Users } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'profile', icon: User, label: 'Mi Perfil' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'explore', icon: Users, label: 'Jugadores' },
  ];

  return (
    <div className="w-20 bg-black border-r border-gray-800 flex flex-col items-center py-8 space-y-6">
      <div className="w-12 h-12 bg-lime-neon rounded-xl flex items-center justify-center shadow-lg mb-4">
        <span className="text-2xl font-bold text-black">T</span>
      </div>

      <nav className="flex-1 flex flex-col space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isActive 
                  ? 'bg-lime-neon text-black shadow-lg shadow-lime-neon/50' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-lime-neon'
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;