import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, MapPin, Calendar, Play, Eye, ArrowLeft, Menu } from 'lucide-react';

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const playerRes = await fetch(`https://tennisscout-backend.onrender.com/api/players/${id}`);
        const player = await playerRes.json();
        setPlayerData(player);

        const videosRes = await fetch('https://tennisscout-backend.onrender.com/api/videos');
        const allVideos = await videosRes.json();
        const playerVideos = allVideos.filter(v => 
          (v.jugadorId?._id || v.jugadorId) === id
        );
        setVideos(playerVideos);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return playerData?.edad || 0;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-lime-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Perfil no encontrado</h2>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-lime-neon text-black font-bold rounded-xl text-sm sm:text-base">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const age = calculateAge(playerData.dateOfBirth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Responsive */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-lime-neon flex-shrink-0" />
            <span className="text-base sm:text-xl font-black">
              TennisScout <span className="text-green-600 hidden xs:inline">AI</span>
            </span>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="px-3 py-2 sm:px-6 sm:py-2 bg-lime-neon text-black font-bold rounded-lg hover:brightness-110 text-xs sm:text-base whitespace-nowrap"
          >
            Crear Perfil
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8">
        {/* Hero Card - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 sm:border-2 overflow-hidden mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row">
            {/* Foto - Responsive */}
            <div className="w-full sm:w-1/3 aspect-square sm:aspect-[3/4] bg-gray-200">
              {playerData.fotoPerfil ? (
                <img 
                  src={playerData.fotoPerfil} 
                  alt={playerData.fullName || playerData.nombre} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="text-4xl sm:text-6xl font-bold text-lime-neon">
                    {(playerData.fullName || playerData.nombre || 'T').charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info - Responsive */}
            <div className="p-4 sm:p-6 lg:p-8 sm:w-2/3">
              <span className="inline-block bg-lime-neon/20 text-black text-[10px] sm:text-xs font-bold uppercase px-2 sm:px-3 py-1 rounded mb-2 sm:mb-3">
                ⚡ VERIFICADO
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-2 break-words">
                {playerData.fullName || playerData.nombre}
              </h1>

              {playerData.nationalRanking && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6">
                  Ranking: <span className="text-black font-bold">{playerData.nationalRanking}</span>
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="border-l-2 border-lime-neon pl-2 sm:pl-3">
                  <span className="text-[10px] sm:text-xs uppercase text-gray-600 font-bold block">Edad</span>
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-black">{age} años</span>
                </div>

                {playerData.country && (
                  <div className="border-l-2 border-lime-neon pl-2 sm:pl-3">
                    <span className="text-[10px] sm:text-xs uppercase text-gray-600 font-bold block">País</span>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-black flex items-center gap-1 sm:gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{playerData.country}</span>
                    </span>
                  </div>
                )}

                {playerData.handedness && (
                  <div className="border-l-2 border-lime-neon pl-2 sm:pl-3">
                    <span className="text-[10px] sm:text-xs uppercase text-gray-600 font-bold block">Mano</span>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-black">{playerData.handedness}</span>
                  </div>
                )}

                {playerData.playingStyle && (
                  <div className="border-l-2 border-lime-neon pl-2 sm:pl-3">
                    <span className="text-[10px] sm:text-xs uppercase text-gray-600 font-bold block">Estilo</span>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-black truncate block">{playerData.playingStyle}</span>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-lime-neon/10 to-green-100 border-2 border-lime-neon/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  📧 Para contactar, crea tu cuenta gratuita
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Técnicas - Responsive */}
        {(playerData.strongestStroke || playerData.playingStyle || playerData.firstServeConsistency) && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-lime-neon" />
              Info Técnica
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {playerData.strongestStroke && (
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-gray-200">
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-gray-600 mb-1">Golpe</p>
                  <p className="text-base sm:text-lg lg:text-xl font-black text-black truncate">{playerData.strongestStroke}</p>
                </div>
              )}
              {playerData.playingStyle && (
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-gray-200">
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-gray-600 mb-1">Estilo</p>
                  <p className="text-base sm:text-lg lg:text-xl font-black text-black truncate">{playerData.playingStyle}</p>
                </div>
              )}
              {playerData.firstServeConsistency > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-gray-200 col-span-2 sm:col-span-1">
                  <p className="text-[10px] sm:text-xs uppercase font-bold text-gray-600 mb-1">1er Saque</p>
                  <p className="text-base sm:text-lg lg:text-xl font-black text-lime-neon">{playerData.firstServeConsistency}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Videos - Responsive */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-lime-neon" />
            Mejores Jugadas
          </h2>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videos.map((video) => (
                <div key={video._id} className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all">
                  <div className="relative aspect-video bg-black">
                    <video src={video.url} className="w-full h-full object-cover" controls preload="metadata" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-bold text-black mb-2 text-sm sm:text-base line-clamp-2">{video.titulo}</h4>
                    {video.descripcion && <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{video.descripcion}</p>}
                    <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(video.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.vistas || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 sm:p-12 text-center">
              <Play className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm sm:text-base text-gray-600">Este jugador aún no ha subido videos</p>
            </div>
          )}
        </div>

        {/* CTA - Responsive */}
        <div className="bg-gradient-to-r from-lime-neon to-green-400 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 sm:mb-3">¿Eres scout?</h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-900 mb-4 sm:mb-6 px-4">
            Crea tu cuenta gratis para contactar con {playerData.fullName || playerData.nombre}
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-lime-neon font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-transform shadow-xl w-full sm:w-auto"
          >
            Crear Cuenta Gratis
          </button>
        </div>
      </main>

      {/* Footer - Responsive */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-16 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-xs sm:text-sm">
          <p>© 2024 TennisScout AI</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicProfile;