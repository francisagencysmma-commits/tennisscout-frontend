import React from 'react';
import { Edit, Upload, Play, MapPin, Trophy, Zap, Target, TrendingUp, Award, Clock } from 'lucide-react';

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

  const age = calculateAge(playerData?.dateOfBirth);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Hero Section - Photo + Main Info */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg border-2 border-gray-100">
        <div className="grid lg:grid-cols-5 gap-6 p-8">
          {/* Photo Column */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-neon to-yellow-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-[3/4] border-4 border-white shadow-2xl transform group-hover:scale-[1.02] transition-transform">
                {playerData?.fotoPerfil ? (
                  <img 
                    src={playerData.fotoPerfil} 
                    alt={playerData.fullName || playerData.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <span className="text-7xl font-bold text-lime-neon">
                      {(playerData?.fullName || playerData?.nombre || 'T').charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-1.5 bg-lime-neon rounded-full shadow-lg">
                  <span className="text-xs font-bold uppercase text-black">⚡ Pro Circuit</span>
                </div>
                {playerData?.country && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{playerData.country}</span>
                  </div>
                )}
              </div>

              <h1 className="text-5xl font-bold text-black mb-2 leading-tight">
                {playerData?.fullName || playerData?.nombre || 'Player Name'}
              </h1>

              {playerData?.nationalRanking && (
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-gray-500">Ranking Nacional:</span>
                  <span className="text-3xl font-bold text-lime-neon">{playerData.nationalRanking}</span>
                </div>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-lime-neon hover:shadow-lg transition-all">
                <div className="text-xs text-gray-500 mb-1">Edad</div>
                <div className="text-2xl font-bold text-black">{age}</div>
              </div>

              {playerData?.handedness && (
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-lime-neon hover:shadow-lg transition-all">
                  <div className="text-xs text-gray-500 mb-1">Mano</div>
                  <div className="text-2xl font-bold text-black">{playerData.handedness}</div>
                </div>
              )}

              {playerData?.height && (
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-lime-neon hover:shadow-lg transition-all">
                  <div className="text-xs text-gray-500 mb-1">Altura</div>
                  <div className="text-2xl font-bold text-black">{playerData.height}<span className="text-sm">cm</span></div>
                </div>
              )}

              {playerData?.weight && (
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-lime-neon hover:shadow-lg transition-all">
                  <div className="text-xs text-gray-500 mb-1">Peso</div>
                  <div className="text-2xl font-bold text-black">{playerData.weight}<span className="text-sm">kg</span></div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button className="mt-6 w-full py-3.5 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl">
              <Edit className="w-5 h-5" />
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid md:grid-cols-4 gap-4">
        {playerData?.yearsPlaying > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-600">Años Jugando</span>
            </div>
            <div className="text-3xl font-bold text-black">{playerData.yearsPlaying}</div>
          </div>
        )}

        {playerData?.ageStartedPlaying > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl border border-purple-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-600">Empezó a los</span>
            </div>
            <div className="text-3xl font-bold text-black">{playerData.ageStartedPlaying} años</div>
          </div>
        )}

        {playerData?.officialTournamentsPlayed > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-2xl border border-orange-100 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-600">Torneos</span>
            </div>
            <div className="text-3xl font-bold text-black">{playerData.officialTournamentsPlayed}</div>
          </div>
        )}

        {playerData?.weeklyTrainingHours > 0 && (
          <div className="bg-gradient-to-br from-lime-50 to-white p-5 rounded-2xl border border-lime-200 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-lime-neon rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <span className="text-sm font-medium text-gray-600">Horas Semanales</span>
            </div>
            <div className="text-3xl font-bold text-black">{playerData.weeklyTrainingHours}h</div>
          </div>
        )}
      </div>

      {/* Playing Style Section */}
      {(playerData?.strongestStroke || playerData?.playingStyle || playerData?.firstServeConsistency || playerData?.currentCoachOrAcademy) && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-lime-neon" />
            <h2 className="text-3xl font-bold text-black">Estilo de Juego</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {playerData?.strongestStroke && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-neon/20 to-yellow-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-50 p-5 rounded-xl border-2 border-gray-200 group-hover:border-lime-neon transition-all">
                  <div className="text-xs font-bold uppercase text-gray-500 mb-2">Golpe Potente</div>
                  <div className="text-2xl font-bold text-black italic mb-1">{playerData.strongestStroke}</div>
                  <div className="text-xs text-gray-600">Arma principal</div>
                </div>
              </div>
            )}

            {playerData?.playingStyle && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-50 p-5 rounded-xl border-2 border-gray-200 group-hover:border-blue-500 transition-all">
                  <div className="text-xs font-bold uppercase text-gray-500 mb-2">Estilo</div>
                  <div className="text-2xl font-bold text-black mb-1">{playerData.playingStyle}</div>
                  <div className="text-xs text-gray-600">Estrategia</div>
                </div>
              </div>
            )}

            {playerData?.firstServeConsistency > 0 && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-lime-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-50 p-5 rounded-xl border-2 border-gray-200 group-hover:border-green-500 transition-all">
                  <div className="text-xs font-bold uppercase text-gray-500 mb-2">1er Saque</div>
                  <div className="flex items-center justify-center my-2">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e5e5" strokeWidth="4" />
                        <circle 
                          cx="32" 
                          cy="32" 
                          r="28" 
                          fill="none" 
                          stroke="#cdff00" 
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - playerData.firstServeConsistency / 100)}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-black">{playerData.firstServeConsistency}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 text-center">Consistencia</div>
                </div>
              </div>
            )}

            {playerData?.currentCoachOrAcademy && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-50 p-5 rounded-xl border-2 border-gray-200 group-hover:border-purple-500 transition-all">
                  <div className="text-xs font-bold uppercase text-gray-500 mb-2">Entrenador</div>
                  <div className="text-2xl font-bold text-black mb-1">{playerData.currentCoachOrAcademy}</div>
                  <div className="text-xs text-gray-600">Coach actual</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Injury History */}
      {playerData?.injuryHistory && (
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-lime-neon mb-2">Historial de Lesiones</div>
              <div className="text-xl font-bold mb-2">{playerData.injuryHistory}</div>
            </div>
            <div className="px-4 py-2 bg-lime-neon rounded-full">
              <span className="text-sm font-bold text-black">✓ Recuperado</span>
            </div>
          </div>
        </div>
      )}

      {/* Videos Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-neon to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-black">Mejores Jugadas</h2>
          </div>
          <button 
            onClick={onUploadVideo}
            className="px-6 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
          >
            <Upload className="w-5 h-5" />
            Añadir Clip
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center hover:border-lime-neon transition-all">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-black">Sin videos todavía</h3>
          <p className="mb-6 text-gray-600">Sube tus mejores momentos y destaca tu talento</p>
          <button 
            onClick={onUploadVideo}
            className="px-8 py-3 bg-lime-neon text-black rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Subir Primer Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;