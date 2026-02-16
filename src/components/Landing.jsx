import React from 'react';
import { Video, TrendingUp, Users, Trophy, ArrowRight, Play, Zap } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black">
      {/* Court Lines Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, rgba(205,255,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(205,255,0,0.1) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }}></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-neon text-black">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              TennisScout <span className="text-lime-neon">AI</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium text-white/70 hover:text-lime-neon transition-colors" href="#">Análisis</a>
            <a className="text-sm font-medium text-white/70 hover:text-lime-neon transition-colors" href="#">Stats</a>
            <a className="text-sm font-medium text-white/70 hover:text-lime-neon transition-colors" href="#">Red</a>
            <a className="text-sm font-medium text-white/70 hover:text-lime-neon transition-colors" href="#">Proceso</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onLoginClick}
              className="hidden sm:block text-sm font-bold text-white hover:text-lime-neon transition-colors px-4"
            >
              Login
            </button>
            <button 
              onClick={onLoginClick}
              className="bg-gradient-to-r from-lime-neon to-green-400 rounded-lg px-6 py-2.5 text-sm font-bold text-black hover:shadow-[0_0_20px_rgba(205,255,0,0.4)] transition-all"
            >
              Comenzar
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Jugador profesional de tenis" 
              className="h-full w-full object-cover" 
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90"></div>
          </div>

          <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-6 lg:px-20">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-neon/30 bg-lime-neon/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-lime-neon">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-neon opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-neon"></span>
                </span>
                Scouting de Nueva Generación
              </div>

              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl">
                Eleva tu Carrera <br/>
                <span className="text-lime-neon">con IA</span>
              </h1>

              <p className="max-w-xl text-lg text-white/70 md:text-xl">
                Sé descubierto. Analiza tu juego. Gana. Insights profesionales para la próxima generación de campeones impulsados por visión computacional.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={onLoginClick}
                  className="bg-gradient-to-r from-lime-neon to-green-400 rounded-xl px-8 py-4 text-lg font-bold text-black hover:scale-[1.02] transition-transform shadow-lg"
                >
                  Comenzar Gratis
                </button>
                <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Ver Demo
                </button>
              </div>
            </div>
          </div>

          {/* Court Lines Decoration */}
          <div className="absolute bottom-0 right-0 h-1/2 w-1/2 opacity-10 pointer-events-none">
            <div className="absolute right-20 bottom-0 h-full w-2 bg-white"></div>
            <div className="absolute right-0 bottom-20 h-2 w-full bg-white"></div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-white/5 bg-black/50 py-12 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex flex-wrap items-center justify-around gap-8 text-center">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-lime-neon">500+</span>
                <span className="text-sm font-medium uppercase tracking-widest text-white/50">Jugadores Activos</span>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-lime-neon">1.2K+</span>
                <span className="text-sm font-medium uppercase tracking-widest text-white/50">Videos Analizados</span>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-lime-neon">85%</span>
                <span className="text-sm font-medium uppercase tracking-widest text-white/50">Tasa de Éxito</span>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-lime-neon">50+</span>
                <span className="text-sm font-medium uppercase tracking-widest text-white/50">Academias Pro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-black text-white md:text-5xl">Impulsado por IA de Precisión</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">Nuestra plataforma usa visión computacional de última generación para analizar cada aspecto de tu juego.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group rounded-2xl p-8 transition-all hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-neon/50">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-lime-neon/20 text-lime-neon group-hover:bg-lime-neon group-hover:text-black transition-colors">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Análisis de Video IA</h3>
                <p className="text-white/60 leading-relaxed">
                  Obtén feedback biomecánico instantáneo de tu saque, golpes de fondo y juego de pies. Compara tu forma con pros ATP/WTA.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl p-8 transition-all hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-neon/50">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-lime-neon/20 text-lime-neon group-hover:bg-lime-neon group-hover:text-black transition-colors">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Estadísticas Avanzadas</h3>
                <p className="text-white/60 leading-relaxed">
                  Más allá del marcador. Rastrea errores no forzados, profundidad de ganadores y métricas de rotación con mapas de calor visuales.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl p-8 transition-all hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-neon/50">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-lime-neon/20 text-lime-neon group-hover:bg-lime-neon group-hover:text-black transition-colors">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Red de Scouts</h3>
                <p className="text-white/60 leading-relaxed">
                  Conecta directamente con coaches universitarios y scouts profesionales. Tu perfil verificado por IA actúa como CV digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white/5 py-24 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="mb-20 flex flex-col items-center justify-between gap-6 md:flex-row md:text-left">
              <div className="max-w-xl">
                <h2 className="text-3xl font-black text-white md:text-5xl">Tu Camino a los Profesionales</h2>
                <p className="mt-4 text-white/60">Un proceso simple de tres pasos para transformar tu juego y visibilidad.</p>
              </div>
              <button 
                onClick={onLoginClick}
                className="bg-gradient-to-r from-lime-neon to-green-400 rounded-xl px-8 py-4 text-lg font-bold text-black hover:scale-105 transition-transform"
              >
                Crear Perfil Gratis
              </button>
            </div>

            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-white/5 md:block"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black border-4 border-lime-neon">
                  <Trophy className="w-8 h-8 text-lime-neon" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Graba y Sube</h4>
                <p className="text-sm text-white/50">Simplemente filma tu práctica o partido con cualquier smartphone y súbelo a nuestra nube segura.</p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black border-4 border-lime-neon">
                  <Zap className="w-8 h-8 text-lime-neon" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Procesamiento IA</h4>
                <p className="text-sm text-white/50">Nuestros algoritmos analizan miles de puntos de datos para generar tu perfil de rendimiento y highlights.</p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center">
                <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black border-4 border-lime-neon">
                  <ArrowRight className="w-8 h-8 text-lime-neon" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Comparte y Crece</h4>
                <p className="text-sm text-white/50">Publica tu perfil en la red o comparte informes detallados con coaches para refinar tu entrenamiento.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-lime-neon to-green-400 px-10 py-16 text-center text-black">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '100px 100px'
              }}></div>
              
              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="text-4xl font-black md:text-5xl">¿Listo para un ace?</h2>
                <p className="mt-4 text-lg font-medium opacity-80">Únete a la red élite de jugadores usando datos para dominar la cancha.</p>
                
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={onLoginClick}
                    className="rounded-xl bg-black px-10 py-4 text-lg font-bold text-white hover:scale-105 transition-transform"
                  >
                    Únete Ahora
                  </button>
                  <button className="rounded-xl border-2 border-black/20 px-10 py-4 text-lg font-bold hover:bg-black/10 transition-colors">
                    Ver Precios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-neon text-black">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tight text-white">TennisScout AI</span>
              </div>
              <p className="text-sm leading-relaxed text-white/50">
                El futuro del scouting y análisis de rendimiento en tenis. Empoderando atletas con insights de datos profesionales.
              </p>
            </div>

            <div>
              <h5 className="mb-6 font-bold text-white">Producto</h5>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a className="hover:text-lime-neon transition-colors" href="#">Análisis IA</a></li>
                <li><a className="hover:text-lime-neon transition-colors" href="#">Portal Scout</a></li>
                <li><a className="hover:text-lime-neon transition-colors" href="#">Seguimiento</a></li>
                <li><a className="hover:text-lime-neon transition-colors" href="#">Comparación Pro</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-6 font-bold text-white">Empresa</h5>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a className="hover:text-lime-neon transition-colors" href="#">Nosotros</a></li>
                <li><a className="hover:text-lime-neon transition-colors" href="#">Socios</a></li>
                <li><a className="hover:text-lime-neon transition-colors" href="#">Carreras</a></li>
                <li><a className="hover:text-lime-neon transition-colors" href="#">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-6 font-bold text-white">Newsletter</h5>
              <p className="mb-4 text-sm text-white/50">Mantente actualizado con las últimas funciones de IA.</p>
              <form className="flex flex-col gap-2">
                <input 
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 focus:border-lime-neon focus:ring-lime-neon" 
                  placeholder="Tu email" 
                  type="email"
                />
                <button 
                  className="bg-gradient-to-r from-lime-neon to-green-400 rounded-lg p-3 text-sm font-bold text-black" 
                  type="submit"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
            <p className="text-xs text-white/30">© 2024 TennisScout AI. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-white/30">
              <a className="hover:text-white transition-colors" href="#">Twitter</a>
              <a className="hover:text-white transition-colors" href="#">Instagram</a>
              <a className="hover:text-white transition-colors" href="#">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;