import React from 'react';
import { Link2, Send, LogOut } from 'lucide-react';

const Header = ({ playerData, onLogout }) => {
  // Si playerData existe, usarlo; si no, usar valores por defecto
  const nombre = playerData?.nombre || 'Usuario';
  const edad = playerData?.edad || '-';
  const pais = playerData?.pais || 'N/A';
  const utrRating = playerData?.utrRating || 0;

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-6 mb-8">
      <div className="flex items-center justify-between">
        {/* Player Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-serif mb-2">
            {nombre}
          </h1>
          <p className="text-gray-600">
            Age: <span className="font-medium">{edad}</span> • 
            <span className="ml-2">🌍 {pais}</span> • 
            <span className="ml-2">Professional Tennis Player</span>
          </p>
        </div>

        {/* Actions and UTR */}
        <div className="flex items-center gap-4">
          {/* UTR Rating */}
          <div className="bg-gradient-to-br from-gold-400 to-gold-500 px-6 py-3 rounded-xl shadow-lg">
            <div className="text-xs text-white/90 font-medium">UTR Rating</div>
            <div className="text-3xl font-bold text-white">{utrRating.toFixed(1)}</div>
          </div>

          {/* Action Buttons */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <Link2 className="w-5 h-5" />
            <span className="font-medium">Copiar Perfil</span>
          </button>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors">
            <Send className="w-5 h-5" />
            <span className="font-medium">Enviar a Academias</span>
          </button>

          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
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