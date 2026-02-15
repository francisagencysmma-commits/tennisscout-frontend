import React from 'react';
import { Link2, Send, LogOut, Bell } from 'lucide-react';

const Header = ({ playerData, onLogout }) => {
  const nombre = playerData?.nombre || 'Usuario';
  const edad = playerData?.edad || '-';
  const pais = playerData?.pais || 'N/A';
  const utrRating = playerData?.utrRating || 0;

  return (
    <div className="bg-cream-50 border-b border-dark-deepest/10 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark-deepest mb-2">
            {nombre}
          </h1>
          <p className="text-dark-light">
            Age: <span className="font-bold text-dark-deepest">{edad}</span> • 
            <span className="ml-2">🌍 {pais}</span> • 
            <span className="ml-2">Professional Tennis Player</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="badge-lime px-6 py-3 shadow-neon">
            <div className="text-xs font-bold uppercase">UTR Rating</div>
            <div className="text-2xl font-bold">{utrRating.toFixed(1)}</div>
          </div>

          <button className="p-3 bg-dark-deepest text-lime-neon rounded-xl hover:bg-dark-base transition-all">
            <Bell className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-dark-deepest text-cream-50 rounded-xl hover:bg-dark-base transition-all">
            <Link2 className="w-5 h-5 text-lime-neon" />
            <span className="font-bold">Share Profile</span>
          </button>
          
          <button className="flex items-center gap-2 px-6 py-3 btn-neon rounded-xl">
            <Send className="w-5 h-5" />
            <span className="font-bold">Send to Scouts</span>
          </button>

          <button 
            onClick={onLogout}
            className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;