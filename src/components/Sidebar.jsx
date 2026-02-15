import React from 'react';
import { Home, Video, Users, Trophy, Settings } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, playerData, onLogout }) => {
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
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-black hover:bg-black/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Subscription Section */}
        <div className="pt-6 pb-2">
          <p className="px-4 text-[10px] font-bold uppercase text-black/50 tracking-[0.15em]">Suscripción</p>
        </div>
        
        <div className="px-2">
          <div className="bg-black/5 rounded-xl p-4 border border-black/10">
            <p className="text-xs font-semibold text-black mb-2">Actualizar a Pro</p>
            <p className="text-[10px] text-black/70 mb-3">
              Obtén análisis avanzado y contacto directo con scouts.
            </p>
            <button className="w-full py-2 bg-black text-lime-neon text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
              Ver Planes
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-black/10">
        <div className="flex items-center justify-between bg-black/5 p-3 rounded-xl border border-black/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-black overflow-hidden"
              style={{
                backgroundImage: playerData?.fotoPerfil 
                  ? `url(${playerData.fotoPerfil})` 
                  : 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)'
              }}
            >
              {!playerData?.fotoPerfil && (
                <div className="w-full h-full flex items-center justify-center text-lime-neon font-bold text-lg bg-black">
                  {(playerData?.fullName || playerData?.nombre || 'U').charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black leading-none">
                {playerData?.nombre || playerData?.fullName || 'Usuario'}
              </span>
              <span className="text-[10px] text-black/60 font-medium mt-1">
                {playerData?.nationalRanking ? `Ranking ${playerData.nationalRanking}` : 'Jugador'}
              </span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="text-black hover:bg-lime-neon/50 p-1.5 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;