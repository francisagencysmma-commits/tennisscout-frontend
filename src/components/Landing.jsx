import React from 'react';
import { ArrowRight, TrendingUp, Video, Users, Trophy } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-neon/10 border border-lime-neon/20 rounded-full">
                <Trophy className="w-4 h-4 text-lime-neon" />
                <span className="text-sm font-semibold text-gray-700">Plataforma #1 de Reclutamiento</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Conecta tu <span className="text-lime-neon">Talento</span> con el Mundo
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                TennisScout AI usa inteligencia artificial para analizar tu juego, 
                crear tu perfil profesional y conectarte con academias y scouts de élite.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onLoginClick}
                  className="px-8 py-4 bg-lime-neon text-black font-bold rounded-xl hover:brightness-110 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Comenzar Gratis
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-lime-neon transition-all">
                  Ver Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Jugadores</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Academias</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Éxito</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[600px] animate-fadeIn">
              <div className="absolute inset-0 bg-lime-neon/10 rounded-3xl blur-3xl"></div>
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80"
                  alt="Jugador de tenis profesional"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80";
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Floating card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime-neon rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Análisis en Tiempo Real</div>
                      <div className="text-xl font-bold text-gray-900">IA Avanzada</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para destacar
          </h2>
          <p className="text-xl text-gray-600">
            Herramientas profesionales al alcance de tu mano
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-lime-neon/10 rounded-xl flex items-center justify-center mb-6">
              <Video className="w-6 h-6 text-lime-neon" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Análisis de Video IA</h3>
            <p className="text-gray-600">
              Sube tus videos y recibe análisis detallado de técnica, velocidad y estrategia.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-lime-neon/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-lime-neon" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Conexión con Scouts</h3>
            <p className="text-gray-600">
              Tu perfil es visible para academias y scouts buscando nuevo talento.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-lime-neon/10 rounded-xl flex items-center justify-center mb-6">
              <Trophy className="w-6 h-6 text-lime-neon" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Perfil Profesional</h3>
            <p className="text-gray-600">
              Crea un portafolio digital con tus mejores jugadas, estadísticas y logros.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-lime-neon to-yellow-400 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-xl text-black/80 mb-8">
            Únete a cientos de jugadores que ya están conectando con su futuro
          </p>
          <button 
            onClick={onLoginClick}
            className="px-10 py-5 bg-black text-lime-neon font-bold text-lg rounded-xl hover:scale-105 transition-all shadow-2xl"
          >
            Crear mi Perfil Gratis
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;