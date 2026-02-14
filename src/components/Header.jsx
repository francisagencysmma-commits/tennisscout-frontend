import React from 'react';
import { Link2, Send, LogOut } from 'lucide-react';

const Header = ({ playerData, onLogout }) => {
  const nombre = playerData?.nombre || 'Usuario';
  const edad = playerData?.edad || '-';
  const pais = playerData?.pais || 'N/A';
  const utrRating = playerData?.utrRating || 0;

  return (
    <div className="bg-dark-50 border-b border-dark-200 px-8 py-6 mb-8">
      <div className="flex items-center justify-between">
        {/* Player Info */}
        <div>
          <h1 className="text-4xl font-bold text-dark-900 font-serif mb-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {nombre}
          </h1>
          <p className="text-dark-500">
            Age: <span className="font-medium text-dark-700">{edad}</span> • 
            <span className="ml-2">🌍 {pais}</span> • 
            <span className="ml-2">Professional Tennis Player</span>
          </p>
        </div>

        {/* Actions and UTR */}
        <div className="flex items-center gap-4">
          {/* UTR Rating */}
          <div className="glass px-6 py-3 rounded-xl glow-green">
            <div className="text-xs text-dark-600 font-medium">UTR Rating</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              {utrRating.toFixed(1)}
            </div>
          </div>

          {/* Action Buttons */}
          <button className="flex items-center gap-2 px-6 py-3 glass hover:bg-dark-100 rounded-xl transition-all">
            <Link2 className="w-5 h-5 text-primary-400" />
            <span className="font-medium text-dark-700">Copiar Perfil</span>
          </button>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-glow">
            <Send className="w-5 h-5" />
            <span className="font-medium">Enviar a Academias</span>
          </button>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl transition-all border border-red-500/30"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;