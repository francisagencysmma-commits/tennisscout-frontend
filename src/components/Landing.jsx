import React from 'react';
import { Video, TrendingUp, Users, Trophy, ArrowRight, Play, Zap } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-lime-neon text-black">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-base sm:text-xl font-black tracking-tight text-gray-900">
              TennisScout <span className="text-green-600">AI</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Análisis</a>
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Stats</a>
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Red</a>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onLoginClick}
              className="hidden sm:block text-xs sm:text-sm font-bold text-gray-900 hover:text-green-600 transition-colors px-2 sm:px-4"
            >
              Login
            </button>
            <button 
              onClick={onLoginClick}
              className="bg-lime-neon rounded-lg px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-gray-900 hover:brightness-110 transition-all shadow-lg"
            >
              Comenzar
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-20 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-lime-neon rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-green-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left - Text */}
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-green-500 bg-green-100 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-green-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  Scouting Nueva Generación
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
                  Eleva tu Carrera <br/>
                  <span className="text-green-600">con IA</span>
                </h1>

                <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-700">
                  Sé descubierto. Analiza tu juego. Gana. Insights profesionales para la próxima generación de campeones.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                  <button 
                    onClick={onLoginClick}
                    className="bg-lime-neon rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-gray-900 hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    Comenzar Gratis
                  </button>
                  <button className="rounded-xl border-2 border-green-500 bg-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-gray-900 hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    Ver Demo
                  </button>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative order-first lg:order-last">
                <div className="absolute inset-0 bg-lime-neon/20 rounded-2xl sm:rounded-3xl blur-2xl"></div>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-green-200 shadow-2xl">
                  <img 
                    alt="Jugador profesional de tenis" 
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover" 
                    src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80";
                    }}
                  />
                  
                  {/* Floating card */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm border-2 border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lime-neon rounded-full flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-sm sm:text-base">Análisis en Tiempo Real</p>
                        <p className="text-gray-600 text-xs sm:text-sm">Powered by AI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y-2 border-green-200 bg-white py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-around gap-6 sm:gap-8 text-center">
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-4xl font-black text-green-600">500+</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest text-gray-600">Jugadores</span>
              </div>
              <div className="h-8 sm:h-12 w-px bg-green-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-4xl font-black text-green-600">1.2K+</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest text-gray-600">Videos</span>
              </div>
              <div className="h-8 sm:h-12 w-px bg-green-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-4xl font-black text-green-600">85%</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest text-gray-600">Éxito</span>
              </div>
              <div className="h-8 sm:h-12 w-px bg-green-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-4xl font-black text-green-600">50+</span>
                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-widest text-gray-600">Academias</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-24 bg-gradient-to-b from-green-50 to-lime-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="mb-12 sm:mb-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900">Impulsado por IA de Precisión</h2>
              <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-gray-700">Nuestra plataforma usa visión computacional de última generación.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1 */}
              <div className="group rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-2 bg-white border-2 border-green-200 hover:border-green-400 hover:shadow-2xl">
                <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-lime-neon group-hover:text-gray-900 transition-colors">
                  <Video className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-gray-900">Análisis de Video IA</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Obtén feedback biomecánico instantáneo de tu saque, golpes de fondo y juego de pies.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-2 bg-white border-2 border-green-200 hover:border-green-400 hover:shadow-2xl">
                <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-lime-neon group-hover:text-gray-900 transition-colors">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-gray-900">Estadísticas Avanzadas</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Más allá del marcador. Rastrea errores no forzados y profundidad con mapas de calor.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-2 bg-white border-2 border-green-200 hover:border-green-400 hover:shadow-2xl md:col-span-1 md:col-start-2">
                <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-lime-neon group-hover:text-gray-900 transition-colors">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-gray-900">Red de Scouts</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Conecta directamente con coaches universitarios y scouts profesionales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-12 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="mb-12 sm:mb-20 flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between text-center md:text-left">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900">Tu Camino a los Profesionales</h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700">Un proceso simple de tres pasos.</p>
              </div>
              <button 
                onClick={onLoginClick}
                className="bg-lime-neon rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-gray-900 hover:scale-105 transition-transform shadow-xl whitespace-nowrap"
              >
                Crear Perfil Gratis
              </button>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {/* Connection Line - Hidden on mobile */}
              <div className="absolute top-8 left-0 hidden h-1 w-full -translate-y-1/2 bg-green-200 md:block" style={{ top: '32px' }}></div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white border-4 border-lime-neon shadow-lg">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">Graba y Sube</h4>
                <p className="text-xs sm:text-sm text-gray-700 max-w-xs">Filma tu práctica con cualquier smartphone y súbelo a nuestra nube.</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white border-4 border-lime-neon shadow-lg">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">Procesamiento IA</h4>
                <p className="text-xs sm:text-sm text-gray-700 max-w-xs">Nuestros algoritmos analizan miles de puntos de datos.</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white border-4 border-lime-neon shadow-lg">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">Comparte y Crece</h4>
                <p className="text-xs sm:text-sm text-gray-700 max-w-xs">Publica tu perfil o comparte informes con coaches.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-24 bg-gradient-to-r from-lime-neon via-green-300 to-lime-neon">
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4">¿Listo para un ace?</h2>
              <p className="text-base sm:text-lg font-medium text-gray-800 mb-6 sm:mb-10 max-w-2xl mx-auto">Únete a la red élite de jugadores usando datos para dominar la cancha.</p>
              
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <button 
                  onClick={onLoginClick}
                  className="rounded-xl bg-gray-900 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white hover:scale-105 transition-transform shadow-2xl"
                >
                  Únete Ahora
                </button>
                <button className="rounded-xl border-2 border-gray-900 bg-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-gray-900 hover:bg-gray-100 transition-colors">
                  Ver Precios
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-green-200 bg-white py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-lime-neon text-gray-900">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-base sm:text-lg font-black tracking-tight text-gray-900">TennisScout AI</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
                El futuro del scouting y análisis de rendimiento en tenis.
              </p>
            </div>

            <div>
              <h5 className="mb-4 sm:mb-6 font-bold text-gray-900 text-sm sm:text-base">Producto</h5>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
                <li><a className="hover:text-green-600 transition-colors" href="#">Análisis IA</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Portal Scout</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Seguimiento</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 sm:mb-6 font-bold text-gray-900 text-sm sm:text-base">Empresa</h5>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-700">
                <li><a className="hover:text-green-600 transition-colors" href="#">Nosotros</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Socios</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-4 sm:mb-6 font-bold text-gray-900 text-sm sm:text-base">Newsletter</h5>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-700">Mantente actualizado</p>
              <form className="flex flex-col gap-2">
                <input 
                  className="rounded-lg border-2 border-green-200 bg-white p-2 sm:p-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200" 
                  placeholder="Tu email" 
                  type="email"
                />
                <button 
                  className="bg-lime-neon rounded-lg p-2 sm:p-3 text-xs sm:text-sm font-bold text-gray-900 hover:brightness-110 transition-all" 
                  type="submit"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t-2 border-green-200 pt-6 sm:pt-8">
            <p className="text-[10px] sm:text-xs text-gray-600 text-center sm:text-left">© 2024 TennisScout AI. Todos los derechos reservados.</p>
            <div className="flex gap-4 sm:gap-6 text-gray-600 text-xs sm:text-sm">
              <a className="hover:text-green-600 transition-colors" href="#">Twitter</a>
              <a className="hover:text-green-600 transition-colors" href="#">Instagram</a>
              <a className="hover:text-green-600 transition-colors" href="#">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;