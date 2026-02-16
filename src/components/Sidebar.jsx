import React from 'react';
import { Home, Video } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'profile', icon: Home, label: 'Inicio' },
    { id: 'videos', icon: Video, label: 'Videos' }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-lime-neon flex-col h-full border-r border-lime-neon/20">
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-lime-neon">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
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

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-lime-neon border-t-2 border-black/10 z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-black/70 active:bg-white/20'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'font-bold' : ''}`} />
                <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;