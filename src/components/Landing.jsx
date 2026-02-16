import React from 'react';
import { Video, TrendingUp, Users, Trophy, ArrowRight, Play, Zap } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-neon text-black">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              TennisScout <span className="text-green-600">AI</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Análisis</a>
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Stats</a>
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Red</a>
            <a className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors" href="#">Proceso</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onLoginClick}
              className="hidden sm:block text-sm font-bold text-gray-900 hover:text-green-600 transition-colors px-4"
            >
              Login
            </button>
            <button 
              onClick={onLoginClick}
              className="bg-lime-neon rounded-lg px-6 py-2.5 text-sm font-bold text-gray-900 hover:brightness-110 transition-all shadow-lg"
            >
              Comenzar
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-96 h-96 bg-lime-neon rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container relative z-10 mx-auto px-6 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-green-500 bg-green-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-green-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  Scouting de Nueva Generación
                </div>

                <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-gray-900 md:text-7xl">
                  Eleva tu Carrera <br/>
                  <span className="text-green-600">con IA</span>
                </h1>

                <p className="max-w-xl text-lg text-gray-700 md:text-xl">
                  Sé descubierto. Analiza tu juego. Gana. Insights profesionales para la próxima generación de campeones impulsados por visión computacional.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={onLoginClick}
                    className="bg-lime-neon rounded-xl px-8 py-4 text-lg font-bold text-gray-900 hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    Comenzar Gratis
                  </button>
                  <button className="rounded-xl border-2 border-green-500 bg-white px-8 py-4 text-lg font-bold text-gray-900 hover:bg-green-50 transition-colors flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Ver Demo
                  </button>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-lime-neon/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden border-4 border-green-200 shadow-2xl">
                  <img 
                    alt="Jugador profesional de tenis" 
                    className="w-full h-96 object-cover" 
                    src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80";
                    }}
                  />
                  
                  {/* Floating card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border-2 border-green-200 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-lime-neon rounded-full flex items-center justify-center">
                        <Video className="w-6 h-6 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold">Análisis en Tiempo Real</p>
                        <p className="text-gray-600 text-sm">Powered by AI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y-2 border-green-200 bg-white py-12">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex flex-wrap items-center justify-around gap-8 text-center">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-green-600">500+</span>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600">Jugadores Activos</span>
              </div>
              <div className="h-12 w-px bg-green-200 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-green-600">1.2K+</span>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600">Videos Analizados</span>
              </div>
              <div className="h-12 w-px bg-green-200 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-green-600">85%</span>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600">Tasa de Éxito</span>
              </div>
              <div className="h-12 w-px bg-green-200 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-green-600">50+</span>
                <span className="text-sm font-medium uppercase tracking-widest text-gray-600">Academias Pro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-green-50 to-lime-50">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-gray-900 md:text-5xl">Impulsado por IA de Precisión</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-700">Nuestra plataforma usa visión computacional de última generación para analizar cada aspecto de tu juego.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group rounded-2xl p-8 transition-all hover:-translate-y-2 bg-white border-2 border-green-200 hover:border-green-400 hover:shadow-2xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-lime-neon group-hover:text-gray-900 transition-colors">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Análisis de Video IA</h3>
                <p className="text-gray-700 leading-relaxed">
                  Obtén feedback biomecánico instantáneo de tu saque, golpes de fondo y juego de pies. Compara tu forma con pros ATP/WTA.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl p-8 transition-all hover:-translate-y-2 bg-white border-2 border-green-200 hover:border-green-400 hover:shadow-2xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-lime-neon group-hover:text-gray-900 transition-colors">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Estadísticas Avanzadas</h3>
                <p className="text-gray-700 leading-relaxed">
                  Más allá del marcador. Rastrea errores no forzados, profundidad de ganadores y métricas de rotación con mapas de calor visuales.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl p-8 transition-all hover:-translate-y-2 bg-white border-2 border-green-200 hover:border-green-400 hover:shadow-2xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-lime-neon group-hover:text-gray-900 transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">Red de Scouts</h3>
                <p className="text-gray-700 leading-relaxed">
                  Conecta directamente con coaches universitarios y scouts profesionales. Tu perfil verificado por IA actúa como CV digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="mb-20 flex flex-col items-center justify-between gap-6 md:flex-row md:text-left">
              <div className="max-w-xl">
                <h2 className="text-3xl font-black text-gray-900 md:text-5xl">Tu Camino a los Profesionales</h2>
                <p className="mt-4 text-gray-700">Un proceso simple de tres pasos para transformar tu juego y visibilidad.</p>
              </div>
              <button 
                onClick={onLoginClick}
                className="bg-lime-neon rounded-xl px-8 py-4 text-lg font-bold text-gray-900 hover:scale-105 transition-transform shadow-xl"
              >
                Crear Perfil Gratis
              </button>
            </div>

            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 hidden h-1 w-full -translate-y-1/2 bg-green-200 md:block"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-lime-neon shadow-lg">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">Graba y Sube</h4>
                <p className="text-sm text-gray-700">Simplemente filma tu práctica o partido con cualquier smartphone y súbelo a nuestra nube segura.</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-lime-neon shadow-lg">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">Procesamiento IA</h4>
                <p className="text-sm text-gray-700">Nuestros algoritmos analizan miles de puntos de datos para generar tu perfil de rendimiento y highlights.</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-lime-neon shadow-lg">
                  <ArrowRight className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-gray-900">Comparte y Crece</h4>
                <p className="text-sm text-gray-700">Publica tu perfil en la red o comparte informes detallados con coaches para refinar tu entrenamiento.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-lime-neon via-green-300 to-lime-neon">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 md:text-5xl mb-4">¿Listo para un ace?</h2>
              <p className="text-lg font-medium text-gray-800 mb-10">Únete a la red élite de jugadores usando datos para dominar la cancha.</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={onLoginClick}
                  className="rounded-xl bg-gray-900 px-10 py-4 text-lg font-bold text-white hover:scale-105 transition-transform shadow-2xl"
                >
                  Únete Ahora
                </button>
                <button className="rounded-xl border-2 border-gray-900 bg-white px-10 py-4 text-lg font-bold text-gray-900 hover:bg-gray-100 transition-colors">
                  Ver Precios
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-green-200 bg-white py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-neon text-gray-900">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tight text-gray-900">TennisScout AI</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                El futuro del scouting y análisis de rendimiento en tenis. Empoderando atletas con insights de datos profesionales.
              </p>
            </div>

            <div>
              <h5 className="mb-6 font-bold text-gray-900">Producto</h5>
              <ul className="space-y-4 text-sm text-gray-700">
                <li><a className="hover:text-green-600 transition-colors" href="#">Análisis IA</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Portal Scout</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Seguimiento</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Comparación Pro</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-6 font-bold text-gray-900">Empresa</h5>
              <ul className="space-y-4 text-sm text-gray-700">
                <li><a className="hover:text-green-600 transition-colors" href="#">Nosotros</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Socios</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Carreras</a></li>
                <li><a className="hover:text-green-600 transition-colors" href="#">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-6 font-bold text-gray-900">Newsletter</h5>
              <p className="mb-4 text-sm text-gray-700">Mantente actualizado con las últimas funciones de IA.</p>
              <form className="flex flex-col gap-2">
                <input 
                  className="rounded-lg border-2 border-green-200 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200" 
                  placeholder="Tu email" 
                  type="email"
                />
                <button 
                  className="bg-lime-neon rounded-lg p-3 text-sm font-bold text-gray-900 hover:brightness-110 transition-all" 
                  type="submit"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t-2 border-green-200 pt-8 md:flex-row">
            <p className="text-xs text-gray-600">© 2024 TennisScout AI. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-gray-600">
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