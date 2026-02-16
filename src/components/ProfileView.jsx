import React, { useState, useEffect } from 'react';
import { Edit, Upload, Play, MapPin, Calendar, Trophy, Plus, Eye, Share2, Mail, Copy } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

const ProfileView_PremiumDark = ({ playerData, onUploadVideo }) => {
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

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

  useEffect(() => {
    const loadPlayerVideos = async () => {
      if (!playerData?._id) return;
      
      setLoadingVideos(true);
      try {
        const response = await fetch('https://tennisscout-backend.onrender.com/api/videos');
        const allVideos = await response.json();
        
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

  const handleCopyLink = () => {
    const profileUrl = `https://tenistalent.vercel.app/player/${playerData._id}`;
    navigator.clipboard.writeText(profileUrl);
    alert('¡Link copiado al portapapeles!');
  };

  const handleEmailShare = () => {
    const profileUrl = `https://tenistalent.vercel.app/player/${playerData._id}`;
    const subject = encodeURIComponent(`Perfil de ${playerData.fullName || playerData.nombre} - PadelScout AI`);
    const body = encodeURIComponent(`Hola,\n\nTe comparto mi perfil de jugador:\n\n${profileUrl}\n\nSaludos`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Hero Section - Foto y Info Principal */}
        <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            
            {/* Foto de Perfil */}
            <div className="relative aspect-square lg:aspect-auto bg-gradient-to-br from-slate-900 to-slate-800">
              {playerData?.fotoPerfil ? (
                <img 
                  src={playerData.fotoPerfil} 
                  alt={playerData.fullName || playerData.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-lime-400 flex items-center justify-center">
                    <span className="text-6xl font-black text-slate-900">
                      {(playerData?.fullName || playerData?.nombre || 'P').charAt(0)}
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-lime-400 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  🏓 Activo
                </span>
              </div>
            </div>

            {/* Info Principal */}
            <div className="lg:col-span-2 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-extrabold text-white mb-2">
                    {playerData?.fullName || playerData?.nombre || 'Jugador'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400">
                    {playerData?.country && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {playerData.country}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {age} años
                    </span>
                    {playerData?.ranking && (
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {playerData.ranking}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="bg-lime-400 text-slate-900 font-bold px-4 py-2 rounded-xl hover:bg-white transition-all flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {playerData?.position && (
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Posición</p>
                    <p className="text-lg font-bold text-white">{playerData.position}</p>
                  </div>
                )}
                {playerData?.playingLevel && (
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Nivel</p>
                    <p className="text-lg font-bold text-white">{playerData.playingLevel}</p>
                  </div>
                )}
                {playerData?.yearsPlaying && (
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Experiencia</p>
                    <p className="text-lg font-bold text-white">{playerData.yearsPlaying} años</p>
                  </div>
                )}
                {playerData?.weeklyHours && (
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Entreno</p>
                    <p className="text-lg font-bold text-white">{playerData.weeklyHours}h/sem</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleCopyLink}
                  className="flex-1 bg-slate-900 border border-slate-700 text-white font-semibold px-4 py-3 rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Link
                </button>
                <button 
                  onClick={handleEmailShare}
                  className="flex-1 bg-slate-900 border border-slate-700 text-white font-semibold px-4 py-3 rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Información Técnica */}
        <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
          <h2 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Perfil Técnico
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Golpe Potente */}
            {playerData?.strongestShot && (
              <div className="bg-gradient-to-br from-lime-400/10 to-transparent border border-lime-400/30 rounded-xl p-6">
                <p className="text-xs text-lime-400 uppercase font-bold mb-2">Golpe más Potente</p>
                <p className="text-2xl font-black text-white">{playerData.strongestShot}</p>
              </div>
            )}

            {/* Estilo de Juego */}
            {playerData?.playingStyle && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Estilo de Juego</p>
                <p className="text-xl font-bold text-white">{playerData.playingStyle}</p>
              </div>
            )}

            {/* Mejor Habilidad */}
            {playerData?.bestSkill && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Mejor Habilidad</p>
                <p className="text-xl font-bold text-white">{playerData.bestSkill}</p>
              </div>
            )}

            {/* Tipo de Saque */}
            {playerData?.serveType && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Tipo de Saque</p>
                <p className="text-xl font-bold text-white">{playerData.serveType}</p>
              </div>
            )}

            {/* Mano Dominante */}
            {playerData?.dominantHand && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Mano Dominante</p>
                <p className="text-xl font-bold text-white">{playerData.dominantHand}</p>
              </div>
            )}

            {/* Área de Mejora */}
            {playerData?.weakestShot && (
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-400/30 rounded-xl p-6">
                <p className="text-xs text-orange-400 uppercase font-bold mb-2">Área de Mejora</p>
                <p className="text-lg font-bold text-white">{playerData.weakestShot}</p>
              </div>
            )}
          </div>
        </section>

        {/* Info Adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Físico y Club */}
          <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
            <h2 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-6">📊 Datos Físicos</h2>
            <div className="space-y-4">
              {(playerData?.height || playerData?.weight) && (
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="text-slate-300 font-medium">Altura / Peso</span>
                  <span className="text-white font-bold">
                    {playerData.height > 0 && `${playerData.height} cm`}
                    {playerData.height > 0 && playerData.weight > 0 && ' / '}
                    {playerData.weight > 0 && `${playerData.weight} kg`}
                  </span>
                </div>
              )}
              {playerData?.currentClub && (
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="text-slate-300 font-medium">Club Actual</span>
                  <span className="text-white font-bold text-right">{playerData.currentClub}</span>
                </div>
              )}
              {playerData?.currentCoach && (
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="text-slate-300 font-medium">Entrenador</span>
                  <span className="text-white font-bold">{playerData.currentCoach}</span>
                </div>
              )}
              {playerData?.tournamentLevel && (
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="text-slate-300 font-medium">Nivel Torneos</span>
                  <span className="text-white font-bold text-right text-sm">{playerData.tournamentLevel}</span>
                </div>
              )}
            </div>
          </section>

          {/* Objetivos */}
          {playerData?.goals && (
            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
              <h2 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-6">🎯 Objetivos</h2>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <p className="text-white leading-relaxed">{playerData.goals}</p>
              </div>
              {playerData?.trainingFocus && (
                <div className="mt-4 flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="text-slate-300 font-medium">Enfoque</span>
                  <span className="text-lime-400 font-bold">{playerData.trainingFocus}</span>
                </div>
              )}
              {playerData?.availability && (
                <div className="mt-4 flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                  <span className="text-slate-300 font-medium">Disponibilidad</span>
                  <span className="text-lime-400 font-bold text-right text-sm">{playerData.availability}</span>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Videos Section */}
        <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-lime-400 uppercase tracking-wider flex items-center gap-2">
              <Play className="w-5 h-5" />
              Mis Videos
            </h2>
            <button 
              onClick={onUploadVideo}
              className="bg-lime-400 text-slate-900 font-bold px-4 py-2 rounded-xl hover:bg-white transition-all flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Subir Video
            </button>
          </div>

          {loadingVideos ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400">Cargando videos...</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video._id} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 hover:border-lime-400/50 transition-all group">
                  <div className="relative aspect-video bg-black">
                    <video 
                      src={video.url} 
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-bold text-white mb-2 line-clamp-2">{video.titulo}</h4>
                    {video.descripcion && (
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{video.descripcion}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-slate-500">
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
            <div className="text-center py-12 border-2 border-dashed border-slate-700 rounded-xl">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No hay videos aún</h3>
              <p className="text-slate-400 mb-6">Sube tus mejores jugadas para mostrar tu nivel</p>
              <button 
                onClick={onUploadVideo}
                className="bg-lime-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-white transition-all"
              >
                Subir Primer Video
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditProfileModal 
          playerData={playerData}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedPlayer) => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
};

export default ProfileView_PremiumDark;