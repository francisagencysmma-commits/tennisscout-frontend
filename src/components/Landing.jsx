import React from 'react';
import { ArrowRight, Video, TrendingUp, Shield, Users } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-lime-neon rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-lime-neon rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Logo */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-lime-neon to-green-400 bg-clip-text text-transparent">
                TennisScout
              </span>
              <span className="text-white"> AI</span>
            </h1>
            <p className="text-xl text-gray-400">La plataforma definitiva para jugadores de tenis</p>
          </div>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left side - Text */}
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Eleva tu juego al
                <span className="block bg-gradient-to-r from-lime-neon to-green-400 bg-clip-text text-transparent">
                  siguiente nivel
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Conecta con scouts profesionales, sube videos de tus partidos y 
                recibe análisis con IA para mejorar tu técnica.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onLoginClick}
                  className="px-8 py-4 bg-lime-neon text-black font-bold rounded-xl hover:shadow-lg hover:shadow-lime-neon/50 transition-all flex items-center justify-center gap-2 group"
                >
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                  Ver Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-lime-neon">500+</div>
                  <div className="text-sm text-gray-400">Jugadores</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-lime-neon">50+</div>
                  <div className="text-sm text-gray-400">Scouts</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-lime-neon">95%</div>
                  <div className="text-sm text-gray-400">Éxito</div>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-lime-neon/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border-2 border-lime-neon/30 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80" 
                  alt="Tennis Player"
                  className="w-full h-96 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-lime-neon/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-lime-neon rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-bold">Análisis en Tiempo Real</p>
                      <p className="text-gray-400 text-sm">Powered by AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/50 backdrop-blur-sm py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-xl text-gray-400">
              Herramientas profesionales para jugadores ambiciosos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 hover:border-lime-neon/50 transition-all group">
              <div className="w-14 h-14 bg-lime-neon/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-lime-neon/20 transition-all">
                <Video className="w-7 h-7 text-lime-neon" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Videos y Análisis</h3>
              <p className="text-gray-400">
                Sube videos de tus partidos y recibe análisis detallado con IA avanzada.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 hover:border-lime-neon/50 transition-all group">
              <div className="w-14 h-14 bg-lime-neon/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-lime-neon/20 transition-all">
                <Users className="w-7 h-7 text-lime-neon" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Conexión con Scouts</h3>
              <p className="text-gray-400">
                Los scouts pueden descubrir tu perfil y contactarte directamente.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 hover:border-lime-neon/50 transition-all group">
              <div className="w-14 h-14 bg-lime-neon/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-lime-neon/20 transition-all">
                <TrendingUp className="w-7 h-7 text-lime-neon" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Seguimiento de Progreso</h3>
              <p className="text-gray-400">
                Mide tu evolución con estadísticas detalladas y rankings actualizados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-neon/20 to-green-400/20 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Únete a cientos de jugadores que ya están mejorando su juego
          </p>
          <button
            onClick={onLoginClick}
            className="px-12 py-5 bg-lime-neon text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-lime-neon/50 transition-all hover:scale-105"
          >
            Crear mi Perfil Gratis
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;