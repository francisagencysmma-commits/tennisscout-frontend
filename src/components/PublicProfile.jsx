import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, MapPin, Calendar, Play, Eye, ArrowLeft } from 'lucide-react';

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar jugador
        const playerRes = await fetch(`https://tennisscout-backend.onrender.com/api/players/${id}`);
        const player = await playerRes.json();
        setPlayerData(player);

        // Cargar videos
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-lime-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Perfil no encontrado</h2>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-lime-neon text-black font-bold rounded-xl">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const age = calculateAge(playerData.dateOfBirth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-lime-neon" />
            <span className="text-xl font-black">TennisScout <span className="text-green-600">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-lime-neon text-black font-bold rounded-lg hover:brightness-110">
              Crear mi Perfil
            </button>
          </div>
        </div>
      </header>

      {/* Perfil */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden mb-8">
          <div className="md:flex">
            {/* Foto */}
            <div className="md:w-1/3 aspect-[3/4] md:aspect-auto bg-gray-200">
              {playerData.fotoPerfil ? (
                <img src={playerData.fotoPerfil} alt={playerData.fullName || playerData.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="text-6xl font-bold text-lime-neon">
                    {(playerData.fullName || playerData.nombre || 'T').charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:w-2/3 p-8">
              <span className="inline-block bg-lime-neon/20 text-black text-xs font-bold uppercase px-3 py-1 rounded mb-3">
                ⚡ JUGADOR VERIFICADO
              </span>

              <h1 className="text-4xl font-extrabold text-black mb-2">
                {playerData.fullName || playerData.nombre}
              </h1>

              {playerData.nationalRanking && (
                <p className="text-xl text-gray-600 mb-6">
                  Ranking Nacional: <span className="text-black font-bold">{playerData.nationalRanking}</span>
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-l-2 border-lime-neon pl-3">
                  <span className="text-xs uppercase text-gray-600 font-bold block">Edad</span>
                  <span className="text-lg font-bold text-black">{age} años</span>
                </div>

                {playerData.country && (
                  <div className="border-l-2 border-lime-neon pl-3">
                    <span className="text-xs uppercase text-gray-600 font-bold block">País</span>
                    <span className="text-lg font-bold text-black flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {playerData.country}
                    </span>
                  </div>
                )}

                {playerData.handedness && (
                  <div className="border-l-2 border-lime-neon pl-3">
                    <span className="text-xs uppercase text-gray-600 font-bold block">Mano</span>
                    <span className="text-lg font-bold text-black">{playerData.handedness}</span>
                  </div>
                )}

                {playerData.playingStyle && (
                  <div className="border-l-2 border-lime-neon pl-3">
                    <span className="text-xs uppercase text-gray-600 font-bold block">Estilo</span>
                    <span className="text-lg font-bold text-black">{playerData.playingStyle}</span>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-lime-neon/10 to-green-100 border-2 border-lime-neon/30 rounded-xl p-4">
                <p className="text-sm text-gray-700 font-medium">
                  📧 Para contactar con este jugador, crea tu cuenta gratuita en TennisScout AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Técnicas */}
        {(playerData.strongestStroke || playerData.playingStyle || playerData.firstServeConsistency) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-lime-neon" />
              Información Técnica
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {playerData.strongestStroke && (
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-600 mb-1">Golpe Potente</p>
                  <p className="text-xl font-black text-black">{playerData.strongestStroke}</p>
                </div>
              )}
              {playerData.playingStyle && (
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-600 mb-1">Estilo de Juego</p>
                  <p className="text-xl font-black text-black">{playerData.playingStyle}</p>
                </div>
              )}
              {playerData.firstServeConsistency > 0 && (
                <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                  <p className="text-xs uppercase font-bold text-gray-600 mb-1">1er Saque</p>
                  <p className="text-xl font-black text-lime-neon">{playerData.firstServeConsistency}%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Videos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-lime-neon" />
            Mejores Jugadas
          </h2>

          {videos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video._id} className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all">
                  <div className="relative aspect-video bg-black">
                    <video src={video.url} className="w-full h-full object-cover" controls preload="metadata" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-black mb-2">{video.titulo}</h4>
                    {video.descripcion && <p className="text-sm text-gray-600 mb-2">{video.descripcion}</p>}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(video.createdAt).toLocaleDateString('es-ES')}
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
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
              <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Este jugador aún no ha subido videos</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-lime-neon to-green-400 rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-black text-black mb-3">¿Eres scout o entrenador?</h3>
          <p className="text-lg text-gray-900 mb-6">
            Crea tu cuenta gratis para contactar con {playerData.fullName || playerData.nombre}
          </p>
          <button onClick={() => navigate('/')} className="px-8 py-4 bg-black text-lime-neon font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-xl">
            Crear Cuenta Gratis
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 TennisScout AI - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicProfile;