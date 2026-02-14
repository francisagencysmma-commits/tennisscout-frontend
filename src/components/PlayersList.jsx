import React, { useState, useEffect } from 'react';
import { getPlayers } from '../services/api';
import { User, MapPin, Star } from 'lucide-react';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      const data = await getPlayers();
      setPlayers(data);
      setError(null);
    } catch (err) {
      setError('Error cargando jugadores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando jugadores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadPlayers}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
          Explorar Jugadores
        </h1>
        <p className="text-gray-600 mb-8">
          Descubre {players.length} jugadores de tenis registrados
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div 
              key={player._id}
              className="bg-white rounded-2xl shadow-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {player.nombre?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{player.nombre}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{player.pais || 'No especificado'}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Edad</span>
                  <span className="font-semibold text-gray-900">{player.edad || 'N/A'} años</span>
                </div>

                {player.utrRating && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">UTR Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                      <span className="font-bold text-primary-600">{player.utrRating}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tipo</span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                    {player.tipo || 'jugador'}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>

        {players.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No hay jugadores registrados aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersList;