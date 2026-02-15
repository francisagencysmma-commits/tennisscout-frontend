import React from 'react';
import { Edit, Upload, Play, MapPin, Calendar, Trophy, ArrowRight, Plus } from 'lucide-react';

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
    <main className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 flex flex-col md:flex-row">
          {/* Photo */}
          <div 
            className="md:w-1/3 aspect-[3/4] md:aspect-auto bg-cover bg-center min-h-[350px]"
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

          {/* Info */}
          <div className="p-8 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-lime-neon/20 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-lime-neon/30">
                  PRO CIRCUIT
                </span>
                {playerData?.country && (
                  <span className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    {playerData.country}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-extrabold text-black mb-1">
                {playerData?.fullName || playerData?.nombre || 'Player Name'}
              </h1>

              {playerData?.nationalRanking && (
                <p className="text-xl text-gray-600 font-medium mb-6">
                  Ranking Nacional: <span className="text-black font-bold">{playerData.nationalRanking}</span>
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col border-l-2 border-lime-neon pl-3">
                  <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Edad / Nacimiento</span>
                  <span className="text-lg font-bold text-black">
                    {age} años {playerData?.dateOfBirth && `(${formatDate(playerData.dateOfBirth)})`}
                  </span>
                </div>

                {playerData?.handedness && (
                  <div className="flex flex-col border-l-2 border-lime-neon pl-3">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Mano Dominante</span>
                    <span className="text-lg font-bold text-black">{playerData.handedness}</span>
                  </div>
                )}

                {playerData?.nationalRanking && (
                  <div className="flex flex-col border-l-2 border-lime-neon pl-3 mt-4">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Ranking Nacional</span>
                    <span className="text-lg font-bold text-black">{playerData.nationalRanking}</span>
                  </div>
                )}

                {playerData?.currentCoachOrAcademy && (
                  <div className="flex flex-col border-l-2 border-lime-neon pl-3 mt-4">
                    <span className="text-[10px] uppercase text-gray-600 font-bold tracking-tighter">Entrenador</span>
                    <span className="text-lg font-bold text-black">{playerData.currentCoachOrAcademy}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-lime-neon w-full text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md">
                <Edit className="w-5 h-5" />
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Equipment & Physical Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-lime-neon" />
            Físico y Equipo
          </h3>

          <div className="space-y-4">
            {(playerData?.height || playerData?.weight) && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Años Jugando</span>
                </div>
                <span className="font-bold">{playerData.yearsPlaying} años</span>
              </div>
            )}

            {playerData?.ageStartedPlaying > 0 && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">👶</span>
                  <span className="text-sm font-medium">Empezó a los</span>
                </div>
                <span className="font-bold">{playerData.ageStartedPlaying} años</span>
              </div>
            )}

            {playerData?.officialTournamentsPlayed > 0 && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Disponibilidad</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  {playerData.weeklyTrainingHours}h semanales
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* IA Powered Stats Dashboard */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">Información Técnica</h2>
          <button className="text-sm font-bold flex items-center gap-1 text-gray-600 hover:text-black">
            Ver informe completo <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Most Powerful Shot */}
          {playerData?.strongestStroke && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Golpe más potente</p>
              <p className="text-2xl font-black italic text-black">{playerData.strongestStroke}</p>
              <div className="mt-4 p-2 bg-lime-neon/10 rounded-lg text-[11px] font-medium">
                Dominio de derecha invertida
              </div>
            </div>
          )}

          {/* Playing Style */}
          {playerData?.playingStyle && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Estilo de Juego</p>
              <p className="text-xl font-black text-black">{playerData.playingStyle}</p>
              <p className="text-[10px] mt-4 font-bold text-gray-600">Preferencia: Pista Rápida</p>
            </div>
          )}

          {/* 1st Serve Consistency */}
          {playerData?.firstServeConsistency > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
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
                    className="text-lime-neon" 
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
          )}

          {/* Injury History */}
          {playerData?.injuryHistory && (
            <div className="bg-black p-6 rounded-xl border border-black shadow-lg text-white">
              <p className="text-[10px] uppercase font-bold text-lime-neon mb-1">Historial Lesiones</p>
              <p className="text-sm font-medium">{playerData.injuryHistory}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-lime-neon rounded-full"></span>
                <span className="text-[11px] font-bold text-lime-neon">Totalmente recuperado</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <Play className="w-6 h-6 text-lime-neon" />
            Mis Mejores Jugadas
          </h2>
          <button 
            onClick={onUploadVideo}
            className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            Añadir Nuevo Clip
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-12 border-2 border-dashed border-gray-300 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-black">No hay videos aún</h3>
          <p className="mb-6 text-gray-600">Sube tus mejores jugadas para mostrar tu talento</p>
          <button 
            onClick={onUploadVideo}
            className="px-8 py-3 bg-lime-neon text-black rounded-lg font-bold hover:brightness-105 transition-all"
          >
            Subir Primer Video
          </button>
        </div>
      </section>

      {/* Ranking Progress Footer */}
      <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-xl font-extrabold mb-2 italic uppercase text-black">Trayectoria Ascendente</h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              {playerData?.fullName || playerData?.nombre} está en constante progreso. 
              Su dedicación y rendimiento lo sitúan como una promesa sólida en el circuito.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center min-w-[120px]">
              <p className="text-[10px] font-black text-gray-600 uppercase">Puntos</p>
              <p className="text-2xl font-black text-black">1,420</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center min-w-[120px]">
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