import React from 'react';
import { Home, Video, Users, Trophy } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'profile', icon: Home, label: 'Inicio' },
    { id: 'videos', icon: Video, label: 'Videos' },
    { id: 'explore', icon: Users, label: 'Jugadores' },
  ];

  return (
    <aside className="w-72 bg-lime-neon flex flex-col h-full border-r border-lime-neon/20">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-lime-neon">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-black text-xl font-bold leading-none">TennisScout</h1>
          <p className="text-black/70 text-xs font-medium uppercase tracking-wider mt-1">AI Platform</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-black shadow-lg font-bold' 
                  : 'text-black hover:bg-white/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;