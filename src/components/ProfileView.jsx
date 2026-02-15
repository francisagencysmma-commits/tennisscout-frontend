import React from 'react';
import { Edit, Upload, Play, MapPin, Calendar, Trophy, Ruler, Clock, Activity, Zap } from 'lucide-react';

const ProfileView = ({ playerData, onUploadVideo }) => {
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

  const age = calculateAge(playerData?.dateOfBirth);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Section: Photo + Info + Physical */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Photo */}
        <div className="lg:col-span-1">
          <div className="bg-black rounded-2xl overflow-hidden aspect-[3/4] relative">
            {playerData?.fotoPerfil ? (
              <img 
                src={playerData.fotoPerfil} 
                alt={playerData.fullName || playerData.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">
                {(playerData?.fullName || playerData?.nombre || 'T').charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Player Info */}
        <div className="lg:col-span-1 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-neon">
            <Trophy className="w-3 h-3 text-black" />
            <span className="text-xs font-bold uppercase text-black">Pro Circuit</span>
          </div>

          {playerData?.country && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-lime-neon" />
              <span className="text-gray-700">{playerData.country}</span>
            </div>
          )}

          <h1 className="text-4xl font-bold text-black leading-tight">
            {playerData?.fullName || playerData?.nombre || 'Player Name'}
          </h1>

          {playerData?.nationalRanking && (
            <div className="text-lg">
              <span className="text-gray-600">Ranking Nacional: </span>
              <span className="font-bold text-lime-neon">{playerData.nationalRanking}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white rounded-lg p-3 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase mb-1 text-gray-600">Edad</div>
              <div className="text-lg font-bold text-black">{age} años</div>
            </div>

            {playerData?.handedness && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200">
                <div className="text-xs font-bold uppercase mb-1 text-gray-600">Mano</div>
                <div className="text-lg font-bold text-black">{playerData.handedness}</div>
              </div>
            )}

            {playerData?.nationalRanking && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200">
                <div className="text-xs font-bold uppercase mb-1 text-gray-600">Ranking</div>
                <div className="text-lg font-bold text-black">{playerData.nationalRanking}</div>
              </div>
            )}

            {playerData?.currentCoachOrAcademy && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200">
                <div className="text-xs font-bold uppercase mb-1 text-gray-600">Entrenador</div>
                <div className="text-lg font-bold text-black">{playerData.currentCoachOrAcademy}</div>
              </div>
            )}
          </div>

          <button className="w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 bg-lime-neon text-black hover:opacity-90 text-sm">
            <Edit className="w-4 h-4" />
            Editar Perfil
          </button>
        </div>

        {/* Physical Stats */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-lime-neon" />
            <h3 className="text-lg font-bold text-black">Físico y Equipo</h3>
          </div>

          <div className="space-y-2">
            {(playerData?.height || playerData?.weight) && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black text-sm">Altura / Peso</span>
                </div>
                <span className="font-bold text-black text-sm">
                  {playerData.height > 0 && `${playerData.height} cm`}
                  {playerData.height > 0 && playerData.weight > 0 && ' / '}
                  {playerData.weight > 0 && `${playerData.weight} kg`}
                </span>
              </div>
            )}

            {playerData?.yearsPlaying > 0 && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black text-sm">Años Jugando</span>
                </div>
                <span className="font-bold text-black text-sm">{playerData.yearsPlaying} años</span>
              </div>
            )}

            {playerData?.ageStartedPlaying > 0 && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black text-sm">Empezó a los</span>
                </div>
                <span className="font-bold text-black text-sm">{playerData.ageStartedPlaying} años</span>
              </div>
            )}

            {playerData?.officialTournamentsPlayed > 0 && (
              <div className="bg-white rounded-lg p-3 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black text-sm">Torneos</span>
                </div>
                <span className="font-bold text-black text-sm">{playerData.officialTournamentsPlayed}</span>
              </div>
            )}

            {playerData?.weeklyTrainingHours > 0 && (
              <div className="bg-lime-neon rounded-lg p-3 border-2 border-lime-neon">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-black" />
                  <span className="font-bold text-black text-sm">Disponibilidad</span>
                </div>
                <div className="font-bold text-black text-sm">
                  🟢 {playerData.weeklyTrainingHours}h semanales
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Info - MÁS COMPACTO */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-4">Información Técnica</h2>

        <div className="grid md:grid-cols-4 gap-4">
          {playerData?.strongestStroke && (
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase mb-1 text-gray-600">Golpe Más Potente</div>
              <div className="text-2xl font-bold mb-1 text-black italic">
                {playerData.strongestStroke}
              </div>
              <div className="text-xs text-gray-600">Dominio invertido</div>
            </div>
          )}

          {playerData?.playingStyle && (
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase mb-1 text-gray-600">Estilo de Juego</div>
              <div className="text-2xl font-bold mb-1 text-black">
                {playerData.playingStyle}
              </div>
              <div className="text-xs text-gray-600">Pista Rápida</div>
            </div>
          )}

          {playerData?.firstServeConsistency > 0 && (
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase mb-1 text-gray-600">1er Saque</div>
              <div className="relative pt-2 flex justify-center">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e5e5" strokeWidth="6" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="35" 
                      fill="none" 
                      stroke="#cdff00" 
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - playerData.firstServeConsistency / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-black">{playerData.firstServeConsistency}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {playerData?.injuryHistory && (
            <div className="bg-black rounded-xl p-4 text-white">
              <div className="text-xs font-bold uppercase mb-1 text-lime-neon">Lesiones</div>
              <div className="text-sm font-bold mb-2 text-white">{playerData.injuryHistory}</div>
              <div className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-lime-neon text-black">
                ● Recuperado
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Videos - MÁS COMPACTO */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-lime-neon" />
            <h2 className="text-2xl font-bold text-black">Mis Mejores Jugadas</h2>
          </div>
          <button 
            onClick={onUploadVideo}
            className="px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 bg-black text-white hover:opacity-90 text-sm"
          >
            <Upload className="w-4 h-4" />
            Añadir Nuevo Clip
          </button>
        </div>

        <div className="bg-white rounded-xl p-8 border-2 border-gray-200 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Play className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-black">No hay videos aún</h3>
          <p className="mb-4 text-gray-600 text-sm">Sube tus mejores jugadas</p>
          <button 
            onClick={onUploadVideo}
            className="px-6 py-2.5 rounded-xl font-bold bg-lime-neon text-black hover:opacity-90 text-sm"
          >
            Subir Primer Clip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;