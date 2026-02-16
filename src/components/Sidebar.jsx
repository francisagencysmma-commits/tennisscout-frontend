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
      <aside className="hidden lg:flex w-72 bg-slate-900 flex-col h-full border-r border-slate-800">
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏓</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold leading-none">PadelScout</h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-1">AI Platform</p>
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
                    ? 'bg-lime-400 text-slate-900 shadow-lg font-bold' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-slate-800 z-50 safe-area-bottom">
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
                    ? 'bg-lime-400 text-slate-900 shadow-md' 
                    : 'text-slate-400 active:bg-slate-800'
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