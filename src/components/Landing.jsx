import React, { useState } from 'react';
import { Trophy, Video, BarChart3, Users, Zap, ArrowRight, Play, CheckCircle2, TrendingUp } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full header-blur z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-neon rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-dark-deepest" />
            </div>
            <span className="text-2xl font-display font-bold text-dark-deepest">TennisScout AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-dark-base hover:text-lime-neon transition-colors font-medium">Features</a>
            <a href="#stats" className="text-dark-base hover:text-lime-neon transition-colors font-medium">Estadísticas</a>
            <a href="#how" className="text-dark-base hover:text-lime-neon transition-colors font-medium">Cómo Funciona</a>
          </div>

          <button 
            onClick={onLoginClick}
            className="btn-neon px-6 py-2.5 rounded-xl font-bold text-dark-deepest"
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-lime-neon/20 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-lime-neon" />
              <span className="text-sm font-bold text-dark-deepest uppercase">Next-Gen Scouting</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6">
              <span className="text-dark-deepest">Tu Futuro en el Tenis,</span>
              <br />
              <span className="gradient-text-lime">Impulsado por IA</span>
            </h1>

            <p className="text-xl text-dark-light mb-8 leading-relaxed">
              Crea tu perfil profesional, sube tus mejores jugadas y conéctate con las mejores academias del mundo. 
              Deja que nuestra IA analice tu juego y destaque tu potencial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onLoginClick}
                className="btn-neon px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
              >
                Empezar Gratis
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="px-8 py-4 bg-dark-deepest text-cream-50 rounded-xl font-bold text-lg hover:bg-dark-base transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Ver Demo
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slideUp">
            <div className="relative rounded-3xl overflow-hidden shadow-dark">
              <img 
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                alt="Tennis player"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deepest/80 to-transparent" />
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 bg-cream-50 rounded-2xl p-4 shadow-dark animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-lime-neon rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-dark-deepest" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-dark-deepest">204 km/h</div>
                    <div className="text-sm text-dark-light">Top Serve Speed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="py-12 px-6 bg-dark-deepest">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Jugadores Activos' },
            { number: '1.2K+', label: 'Videos Analizados' },
            { number: '85%', label: 'Scout Match Rate' },
            { number: '50+', label: 'Academias Partner' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-bold gradient-text-lime mb-2">{stat.number}</div>
              <div className="text-cream-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-4 text-dark-deepest">
              Características Principales
            </h2>
            <div className="w-24 h-1 bg-lime-neon mx-auto mb-6"></div>
            <p className="text-xl text-dark-light max-w-2xl mx-auto">
              Todo lo que necesitas para destacar y ser descubierto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: 'Análisis IA Avanzado',
                description: 'Nuestra IA analiza tus golpes, movimiento y estrategia en tiempo real',
                color: 'bg-lime-neon'
              },
              {
                icon: BarChart3,
                title: 'Estadísticas Profesionales',
                description: 'Trackea tu progreso con métricas detalladas y gráficos interactivos',
                color: 'bg-dark-deepest'
              },
              {
                icon: Users,
                title: 'Conexión Directa',
                description: 'Envía tu perfil a academias y scouts con un solo click',
                color: 'bg-forest-dark'
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i}
                  className="group p-8 bg-cream-50 rounded-2xl border-2 border-dark-deepest hover:border-lime-neon transition-all hover:-translate-y-2 shadow-dark"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${feature.color === 'bg-lime-neon' ? 'text-dark-deepest' : 'text-lime-neon'}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-dark-deepest">{feature.title}</h3>
                  <p className="text-dark-light leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Section - Dark */}
      <section className="py-20 px-6 section-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-display font-bold text-center mb-12">
            Tu Rendimiento en <span className="gradient-text-lime">Datos Reales</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold gradient-text-lime mb-2">204 km/h</div>
              <div className="text-cream-200 mb-2">Velocidad de Saque</div>
              <div className="w-full bg-dark-light rounded-full h-2">
                <div className="bg-lime-neon h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold gradient-text-lime mb-2">92%</div>
              <div className="text-cream-200 mb-2">Precisión de Derecha</div>
              <div className="w-full bg-dark-light rounded-full h-2">
                <div className="bg-lime-neon h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold gradient-text-lime mb-2">8.5 / 10</div>
              <div className="text-cream-200 mb-2">Rendimiento Físico</div>
              <div className="w-full bg-dark-light rounded-full h-2">
                <div className="bg-lime-neon h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 px-6 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-display font-bold text-center mb-16 text-dark-deepest">
            Cómo <span className="gradient-text-lime">Funciona</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Crea tu Perfil', description: 'Regístrate y completa tu información en menos de 2 minutos' },
              { step: '02', title: 'Sube tus Videos', description: 'Comparte tus mejores jugadas. Nuestra IA los analiza automáticamente' },
              { step: '03', title: 'Conecta con Scouts', description: 'Los scouts te descubren y contactan directamente' }
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="text-8xl font-bold text-lime-neon/20 mb-4">{item.step}</div>
                <div className="relative -mt-16">
                  <div className="w-16 h-16 bg-lime-neon rounded-full flex items-center justify-center mx-auto mb-6 glow-lime">
                    <CheckCircle2 className="w-8 h-8 text-dark-deepest" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-dark-deepest">{item.title}</h3>
                  <p className="text-dark-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-dark-deepest text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-display font-bold mb-6">
            <span className="text-cream-50">Listo para ser</span>
            <br />
            <span className="gradient-text-lime">descubierto?</span>
          </h2>
          <p className="text-xl text-cream-200 mb-12">
            Únete a cientos de jugadores que ya están usando TennisScout AI
          </p>
          <button 
            onClick={onLoginClick}
            className="btn-neon px-12 py-5 rounded-xl font-bold text-xl inline-flex items-center gap-3 animate-pulse-neon"
          >
            Crear Cuenta Gratis
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-deepest border-t border-lime-neon/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-neon rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-dark-deepest" />
              </div>
              <span className="text-xl font-display font-bold text-cream-50">TennisScout AI</span>
            </div>
            <div className="text-cream-300 text-sm">
              © 2026 TennisScout AI. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;