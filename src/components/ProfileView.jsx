import React, { useState, useEffect } from 'react';
import { Edit, Upload, Play, MapPin, Calendar, Trophy, ArrowRight, Plus, Zap, Eye } from 'lucide-react';

const ProfileView = ({ playerData, onUploadVideo }) => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Cargar videos del jugador
  useEffect(() => {
    const loadPlayerVideos = async () => {
      if (!playerData?._id) return;
      
      setLoadingVideos(true);
      try {
        const response = await fetch('https://tennisscout-backend.onrender.com/api/videos');
        const allVideos = await response.json();
        
        // Filtrar solo los videos de este jugador
        const playerVideos = allVideos.filter(video => 
          (video.jugadorId?._id || video.jugadorId) === playerData._id
        );
        
        setVideos(playerVideos);
      } catch (error) {
        console.error('Error cargando videos:', error);
      } finally {
        setLoadingVideos(false);
      }
    };

    loadPlayerVideos();
  }, [playerData?._id]);

  const age = calculateAge(playerData?.dateOfBirth);

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/0 via-lime-neon/0 to-lime-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative md:w-1/3 aspect-[3/4] md:aspect-auto bg-cover bg-center min-h-[350px] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: playerData?.fotoPerfil 
                  ? `url(${playerData.fotoPerfil})` 
                  : 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)'
              }}
            >
              {!playerData?.fotoPerfil && (
                <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-lime-neon">
                  {(playerData?.fullName || playerData?.nombre || 'T').charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute inset-0 border-r-2 border-lime-neon/20 group-hover:border-lime-neon/50 transition-all duration-300"></div>
          </div>

          <div className="p-8 flex flex-col justify-between flex-1 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-lime-neon/20 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-lime-neon/30 shadow-sm animate-pulse">
                  ⚡ PRO CIRCUIT
                </span>
                {playerData?.country && (
                  <span className="flex items-center gap-1 text-gray-600 text-sm font-medium hover:text-lime-neon transition-colors">
                    <MapPin className="w-4 h-4" />
                    {playerData.country}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-extrabold text-black mb-1 bg-gradient-to-r from-black to-gray-700 bg-clip-text">
                {playerData?.fullName || playerData?.nombre || 'Player Name'}
              </h1>

              {playerData?.nationalRanking && (
                <p className="text-xl text-gray-600 font-medium mb-6">
                  Ranking Nacional: <span className="text-black font-bold bg-lime-neon/10 px-2 py-0.5 rounded">{playerData.nationalRanking}</span>
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col border-l-2 border-lime-neon pl-3 hover:border-l-4 transition-all duration-200 hover:pl-2.5">
                  <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Edad / Nacimiento</span>
                  <span className="text-lg font-bold text-black">
                    {age} años {playerData?.dateOfBirth && `(${formatDate(playerData.dateOfBirth)})`}
                  </span>
                </div>

                {playerData?.handedness && (
                  <div className="flex flex-col border-l-2 border-lime-neon pl-3 hover:border-l-4 transition-all duration-200 hover:pl-2.5">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Mano Dominante</span>
                    <span className="text-lg font-bold text-black">{playerData.handedness}</span>
                  </div>
                )}

                {playerData?.nationalRanking && (
                  <div className="flex flex-col border-l-2 border-lime-neon pl-3 mt-4 hover:border-l-4 transition-all duration-200 hover:pl-2.5">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Ranking Nacional</span>
                    <span className="text-lg font-bold text-black">{playerData.nationalRanking}</span>
                  </div>
                )}

                {playerData?.currentCoachOrAcademy && (
                  <div className="flex flex-col border-l-2 border-lime-neon pl-3 mt-4 hover:border-l-4 transition-all duration-200 hover:pl-2.5">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Entrenador</span>
                    <span className="text-lg font-bold text-black">{playerData.currentCoachOrAcademy}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-lime-neon w-full text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-105 hover:shadow-lg hover:scale-[1.02] transition-all shadow-md">
                <Edit className="w-5 h-5" />
                Editar Perfil
              </button>
              // Añade estos botones en ProfileView.jsx, dentro del hero section después de "Editar Perfil"

<div className="flex flex-wrap gap-3 mt-3">
  <button 
    onClick={() => {
      const profileUrl = `${window.location.origin}/player/${playerData._id}`;
      navigator.clipboard.writeText(profileUrl);
      alert('¡Link copiado al portapapeles!');
    }}
    className="flex-1 bg-white border-2 border-gray-200 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:border-lime-neon hover:shadow-lg transition-all"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
    Copiar Link
  </button>
  
  <button 
    onClick={() => {
      const profileUrl = `${window.location.origin}/player/${playerData._id}`;
      const subject = encodeURIComponent(`Perfil de ${playerData.fullName || playerData.nombre} - TennisScout AI`);
      const body = encodeURIComponent(`Hola,\n\nTe comparto el perfil de ${playerData.fullName || playerData.nombre} en TennisScout AI:\n\n${profileUrl}\n\nSaludos`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }}
    className="flex-1 bg-lime-neon text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-lg transition-all"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Share with Scouts
  </button>
</div>
            </div>
          </div>
        </div>

        {/* Equipment & Physical Sidebar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col gap-6 hover:shadow-2xl hover:border-lime-neon/30 transition-all duration-300">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-lime-neon to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            Físico y Equipo
          </h3>

          <div className="space-y-4">
            {(playerData?.height || playerData?.weight) && (
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-lime-neon/30 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">📏</span>
                  <span className="text-sm font-medium">Altura / Peso</span>
                </div>
                <span className="font-bold text-sm">
                  {playerData.height > 0 && `${playerData.height} cm`}
                  {playerData.height > 0 && playerData.weight > 0 && ' / '}
                  {playerData.weight > 0 && `${playerData.weight} kg`}
                </span>
              </div>
            )}

            {playerData?.yearsPlaying > 0 && (
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-lime-neon/30 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Años Jugando</span>
                </div>
                <span className="font-bold">{playerData.yearsPlaying} años</span>
              </div>
            )}

            {playerData?.ageStartedPlaying > 0 && (
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-lime-neon/30 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">👶</span>
                  <span className="text-sm font-medium">Empezó a los</span>
                </div>
                <span className="font-bold">{playerData.ageStartedPlaying} años</span>
              </div>
            )}

            {playerData?.officialTournamentsPlayed > 0 && (
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-lime-neon/30 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Torneos Oficiales</span>
                </div>
                <span className="font-bold">Sí</span>
              </div>
            )}
          </div>

          {playerData?.weeklyTrainingHours > 0 && (
            <div className="mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm mb-2 bg-gradient-to-r from-green-50 to-lime-50 p-3 rounded-lg border border-green-100">
                <span className="text-gray-600 font-medium">Disponibilidad</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse shadow-lg shadow-green-400"></span>
                  {playerData.weeklyTrainingHours}h semanales
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Technical Info */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <Zap className="w-6 h-6 text-lime-neon animate-pulse" />
            Información Técnica
          </h2>
          <button className="text-sm font-bold flex items-center gap-1 text-gray-600 hover:text-black hover:gap-2 transition-all">
            Ver informe completo <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {playerData?.strongestStroke && (
            <div className="relative group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-lime-neon/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/0 to-lime-neon/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Golpe más potente</p>
                <p className="text-2xl font-black italic text-black">{playerData.strongestStroke}</p>
                <div className="mt-4 p-2 bg-lime-neon/10 rounded-lg text-[11px] font-medium border border-lime-neon/20">
                  Dominio de derecha invertida
                </div>
              </div>
            </div>
          )}

          {playerData?.playingStyle && (
            <div className="relative group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-400/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Estilo de Juego</p>
                <p className="text-xl font-black text-black">{playerData.playingStyle}</p>
                <p className="text-[10px] mt-4 font-bold text-gray-600">Preferencia: Pista Rápida</p>
              </div>
            </div>
          )}

          {playerData?.firstServeConsistency > 0 && (
            <div className="relative group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-400/50 transition-all duration-300 flex flex-col items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <p className="text-[10px] uppercase font-bold text-gray-600 mb-4 w-full">Consistencia 1er Saque</p>
                <div className="relative flex items-center justify-center">
                  <svg className="w-16 h-16">
                    <circle 
                      className="text-gray-100" 
                      cx="32" 
                      cy="32" 
                      fill="transparent" 
                      r="28" 
                      stroke="currentColor" 
                      strokeWidth="6"
                    />
                    <circle 
                      className="text-lime-neon transition-all duration-1000 group-hover:text-green-500" 
                      cx="32" 
                      cy="32" 
                      fill="transparent" 
                      r="28" 
                      stroke="currentColor" 
                      strokeDasharray="175.9" 
                      strokeDashoffset={175.9 * (1 - playerData.firstServeConsistency / 100)}
                      strokeLinecap="round" 
                      strokeWidth="6" 
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-black">{playerData.firstServeConsistency}%</span>
                </div>
              </div>
            </div>
          )}

          {playerData?.injuryHistory && (
            <div className="relative group bg-gradient-to-br from-black to-gray-900 p-6 rounded-xl border-2 border-black shadow-xl hover:shadow-2xl hover:border-lime-neon/50 transition-all duration-300 text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/0 to-lime-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <p className="text-[10px] uppercase font-bold text-lime-neon mb-1">Historial Lesiones</p>
                <p className="text-sm font-medium">{playerData.injuryHistory}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-lime-neon rounded-full animate-pulse shadow-lg shadow-lime-neon"></span>
                  <span className="text-[11px] font-bold text-lime-neon">Totalmente recuperado</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery - CON VIDEOS REALES Y REPRODUCIBLES */}
<section className="mb-12">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-extrabold flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-br from-lime-neon to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
        <Play className="w-6 h-6 text-black" />
      </div>
      Mis Mejores Jugadas
    </h2>
    <button 
      onClick={onUploadVideo}
      className="bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-lime-neon hover:shadow-lg px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-200"
    >
      <Plus className="w-4 h-4" />
      Añadir Nuevo Clip
    </button>
  </div>

  {loadingVideos ? (
    <div className="text-center py-12">
      <div className="w-12 h-12 border-4 border-lime-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando videos...</p>
    </div>
  ) : videos.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video._id} className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="relative aspect-video bg-black">
            <video 
              src={video.url} 
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              Tu navegador no soporta video HTML5.
            </video>
          </div>
          
          <div className="p-4">
            <h4 className="font-bold text-sm mb-2 text-black line-clamp-2">{video.titulo}</h4>
            {video.descripcion && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{video.descripcion}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(video.createdAt).toLocaleDateString('es-ES')}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {video.vistas || 0}
              </span>
              {video.duracion > 0 && (
                <span className="ml-auto font-medium text-black">
                  {Math.floor(video.duracion / 60)}:{(video.duracion % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="relative group bg-gradient-to-br from-gray-50 to-white rounded-xl p-12 border-2 border-dashed border-gray-300 hover:border-lime-neon text-center transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/0 to-lime-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Play className="w-10 h-10 text-gray-400 group-hover:text-lime-neon transition-colors" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-black">No hay videos aún</h3>
        <p className="mb-6 text-gray-600">Sube tus mejores jugadas para mostrar tu talento</p>
        <button 
          onClick={onUploadVideo}
          className="px-8 py-3 bg-lime-neon text-black rounded-lg font-bold hover:brightness-105 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Subir Primer Video
        </button>
      </div>
    </div>
  )}
</section>
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 hover:border-lime-neon/50 hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/0 via-lime-neon/0 to-lime-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-xl font-extrabold mb-2 italic uppercase text-black">Trayectoria Ascendente</h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {playerData?.fullName || playerData?.nombre} está en constante progreso. 
              Su dedicación y rendimiento lo sitúan como una promesa sólida en el circuito.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md border-2 border-gray-200 hover:border-lime-neon hover:shadow-xl text-center min-w-[120px] transition-all duration-200 hover:scale-105">
              <p className="text-[10px] font-black text-gray-600 uppercase">Puntos</p>
              <p className="text-2xl font-black text-black">1,420</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border-2 border-gray-200 hover:border-green-400 hover:shadow-xl text-center min-w-[120px] transition-all duration-200 hover:scale-105">
              <p className="text-[10px] font-black text-gray-600 uppercase">Win Rate</p>
              <p className="text-2xl font-black text-green-600">72%</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfileView;