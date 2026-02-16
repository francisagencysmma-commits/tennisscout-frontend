import React from 'react';
import { LogOut, User, Menu } from 'lucide-react';

const Header = ({ playerData, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 lg:relative">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Mobile: Logo/Title */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-8 h-8 bg-lime-neon rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">TS</span>
          </div>
          <span className="text-base font-black text-gray-900">TennisScout</span>
        </div>

        {/* Desktop: Welcome message */}
        <div className="hidden lg:block">
          <h2 className="text-xl font-bold text-gray-900">
            Hola, <span className="text-green-600">{playerData?.fullName || playerData?.nombre || 'Jugador'}</span>
          </h2>
          <p className="text-sm text-gray-600">Bienvenido a tu dashboard</p>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile: Simple avatar */}
          <div className="lg:hidden">
            {playerData?.fotoPerfil ? (
              <img 
                src={playerData.fotoPerfil} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-lime-neon"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-lime-neon">
                <span className="text-lime-neon text-xs font-bold">
                  {(playerData?.fullName || playerData?.nombre || 'U').charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Desktop: Full profile card */}
          <div className="hidden lg:flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
            {playerData?.fotoPerfil ? (
              <img 
                src={playerData.fotoPerfil} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-lime-neon"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-lime-neon">
                <span className="text-lime-neon text-sm font-bold">
                  {(playerData?.fullName || playerData?.nombre || 'U').charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 line-clamp-1">
                {playerData?.fullName || playerData?.nombre || 'Usuario'}
              </span>
              <span className="text-xs text-gray-600">
                {playerData?.country || 'Jugador'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;