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
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Photo */}
        <div className="lg:col-span-1">
          <div className="bg-black rounded-3xl overflow-hidden aspect-[3/4] relative">
            {playerData?.fotoPerfil ? (
              <img 
                src={playerData.fotoPerfil} 
                alt={playerData.fullName || playerData.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                {(playerData?.fullName || playerData?.nombre || 'T').charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Player Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-neon">
            <Trophy className="w-4 h-4 text-black" />
            <span className="text-xs font-bold uppercase text-black">Pro Circuit</span>
          </div>

          {playerData?.country && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-lime-neon" />
              <span className="text-gray-700">{playerData.country}</span>
            </div>
          )}

          <h1 className="text-5xl font-bold text-black">
            {playerData?.fullName || playerData?.nombre || 'Player Name'}
          </h1>

          {playerData?.nationalRanking && (
            <div className="text-xl">
              <span className="text-gray-600">Ranking Nacional: </span>
              <span className="font-bold text-lime-neon">{playerData.nationalRanking}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase mb-1 text-gray-600">Edad / Nacimiento</div>
              <div className="text-xl font-bold text-black">
                {age} años {playerData?.dateOfBirth && `(${formatDate(playerData.dateOfBirth)})`}
              </div>
            </div>

            {playerData?.handedness && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <div className="text-xs font-bold uppercase mb-1 text-gray-600">Mano Dominante</div>
                <div className="text-xl font-bold text-black">{playerData.handedness}</div>
              </div>
            )}

            {playerData?.nationalRanking && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <div className="text-xs font-bold uppercase mb-1 text-gray-600">Ranking</div>
                <div className="text-xl font-bold text-black">{playerData.nationalRanking}</div>
              </div>
            )}

            {playerData?.currentCoachOrAcademy && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <div className="text-xs font-bold uppercase mb-1 text-gray-600">Entrenador</div>
                <div className="text-xl font-bold text-black">{playerData.currentCoachOrAcademy}</div>
              </div>
            )}
          </div>

          <button className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-lime-neon text-black hover:opacity-90">
            <Edit className="w-5 h-5" />
            Editar Perfil
          </button>
        </div>

        {/* Physical Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-lime-neon" />
            <h3 className="text-xl font-bold text-black">Físico y Equipo</h3>
          </div>

          <div className="space-y-3">
            {(playerData?.height || playerData?.weight) && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black">Altura / Peso</span>
                </div>
                <span className="font-bold text-black">
                  {playerData.height > 0 && `${playerData.height} cm`}
                  {playerData.height > 0 && playerData.weight > 0 && ' / '}
                  {playerData.weight > 0 && `${playerData.weight} kg`}
                </span>
              </div>
            )}

            {playerData?.yearsPlaying > 0 && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black">Años Jugando</span>
                </div>
                <span className="font-bold text-black">{playerData.yearsPlaying} años</span>
              </div>
            )}

            {playerData?.ageStartedPlaying > 0 && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black">Empezó a los</span>
                </div>
                <span className="font-bold text-black">{playerData.ageStartedPlaying} años</span>
              </div>
            )}

            {playerData?.officialTournamentsPlayed > 0 && (
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-black">Torneos Oficiales</span>
                </div>
                <span className="font-bold text-black">{playerData.officialTournamentsPlayed}</span>
              </div>
            )}

            {playerData?.weeklyTrainingHours > 0 && (
              <div className="bg-lime-neon rounded-xl p-4 border-2 border-lime-neon">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-black" />
                  <span className="font-bold text-black">Disponibilidad</span>
                </div>
                <div className="font-bold text-black">
                  🟢 {playerData.weeklyTrainingHours}h semanales
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Info */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black">Información Técnica</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {playerData?.strongestStroke && (
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="text-sm font-bold uppercase mb-2 text-gray-600">Golpe Más Potente</div>
              <div className="text-3xl font-bold mb-2 text-black italic">
                {playerData.strongestStroke}
              </div>
              <div className="text-sm text-gray-600">Dominio de derecha invertida</div>
            </div>
          )}

          {playerData?.playingStyle && (
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="text-sm font-bold uppercase mb-2 text-gray-600">Estilo de Juego</div>
              <div className="text-3xl font-bold mb-2 text-black">
                {playerData.playingStyle}
              </div>
              <div className="text-sm text-gray-600">Preferencia: Pista Rápida</div>
            </div>
          )}

          {playerData?.firstServeConsistency > 0 && (
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <div className="text-sm font-bold uppercase mb-2 text-gray-600">Consistencia 1er Saque</div>
              <div className="relative pt-2 flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e5e5" strokeWidth="8" />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="56" 
                      fill="none" 
                      stroke="#cdff00" 
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - playerData.firstServeConsistency / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-black">{playerData.firstServeConsistency}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {playerData?.injuryHistory && (
            <div className="bg-black rounded-2xl p-6 text-white">
              <div className="text-sm font-bold uppercase mb-2 text-lime-neon">Historial Lesiones</div>
              <div className="text-lg font-bold mb-2 text-white">{playerData.injuryHistory}</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-lime-neon text-black">
                ● Totalmente recuperado
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Videos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Play className="w-6 h-6 text-lime-neon" />
            <h2 className="text-3xl font-bold text-black">Mis Mejores Jugadas</h2>
          </div>
          <button 
            onClick={onUploadVideo}
            className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 bg-black text-white hover:opacity-90"
          >
            <Upload className="w-5 h-5" />
            Añadir Nuevo Clip
          </button>
        </div>

        <div className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-black">No hay videos aún</h3>
          <p className="mb-6 text-gray-600">Sube tus mejores jugadas para mostrar tu nivel</p>
          <button 
            onClick={onUploadVideo}
            className="px-8 py-3 rounded-xl font-bold bg-lime-neon text-black hover:opacity-90"
          >
            Subir Primer Clip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;