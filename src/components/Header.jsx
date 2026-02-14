import React from 'react';
import { Link2, Send } from 'lucide-react';

const Header = ({ playerData }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-8 py-6 mb-8">
      <div className="flex items-center justify-between">
        {/* Player Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-serif mb-2">
            Mateo Silva
          </h1>
          <p className="text-gray-600">
            Age: <span className="font-medium">17</span> • 
            <span className="ml-2">🇪🇸 ES Spain</span> • 
            <span className="ml-2">Professional Tennis Player</span>
          </p>
        </div>

        {/* Actions and UTR */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Link2 className="w-4 h-4" />
            <span className="text-sm font-medium">Copiar Perfil</span>
          </button>
          
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Send className="w-4 h-4" />
            <span className="text-sm font-medium">Enviar a Academias</span>
          </button>

          {/* UTR Rating */}
          <div className="ml-4 px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl border-2 border-gold-600">
            <div className="text-xs text-gold-900 font-semibold mb-0.5">UTR RATING</div>
            <div className="text-3xl font-bold text-white">12.4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;