import React, { useState, useEffect } from 'react';
import { Trophy, Video, BarChart3, Users, Zap, Target, Star, ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';

const Landing = ({ onLoginClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Video,
      title: 'Análisis de Video AI',
      description: 'Sube tus videos y obtén análisis técnico detallado con inteligencia artificial',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Estadísticas Avanzadas',
      description: 'Trackea tu progreso con métricas detalladas y gráficos interactivos',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Red de Scouts',
      description: 'Conecta con scouts profesionales y academias de tenis de élite',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: 'Portfolio Digital',
      description: 'Crea tu perfil profesional con torneos, logros y highlights',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Jugadores Activos' },
    { number: '1,200+', label: 'Videos Analizados' },
    { number: '50+', label: 'Scouts Profesionales' },
    { number: '30+', label: 'Academias Partner' }
  ];

  return (
    <div className="min-h-screen bg-dark-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full glass z-50 border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">TennisScout AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-dark-600 hover:text-primary-500 transition-colors">Features</a>
            <a href="#stats" className="text-dark-600 hover:text-primary-500 transition-colors">Estadísticas</a>
            <a href="#how-it-works" className="text-dark-600 hover:text-primary-500 transition-colors">Cómo Funciona</a>
          </div>

          <button 
            onClick={onLoginClick}
            className="btn-premium px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-glow"
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${50 - scrollY * 0.05}%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)`
          }}
        />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm text-dark-600">Powered by AI • Trusted by Professionals</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-slideUp">
            <span className="gradient-text">Lleva tu tenis</span>
            <br />
            <span className="text-dark-800">al siguiente nivel</span>
          </h1>

          <p className="text-xl md:text-2xl text-dark-500 mb-12 max-w-3xl mx-auto animate-fadeIn">
            La plataforma definitiva para jugadores de tenis ambiciosos. Análisis AI, estadísticas profesionales y conexión directa con scouts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp">
            <button 
              onClick={onLoginClick}
              className="btn-premium px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-glow flex items-center gap-2"
            >
              Empezar Gratis
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="px-8 py-4 glass hover:bg-dark-100 rounded-xl font-semibold text-lg transition-all flex items-center gap-2">
              <Play className="w-5 h-5 text-primary-500" />
              Ver Demo
            </button>
          </div>

          {/* Hero Image/Video Preview */}
          <div className="mt-20 relative">
            <div className="glass rounded-2xl p-4 shadow-premium">
              <div className="aspect-video bg-gradient-to-br from-dark-100 to-dark-200 rounded-xl relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80"
                  alt="Tennis player"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 glass px-4 py-2 rounded-xl shadow-glow animate-pulse">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                <span className="text-sm font-semibold text-dark-700">12.4 UTR</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 glass px-4 py-2 rounded-xl shadow-glow animate-pulse" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-dark-700">195 km/h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-dark-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Todo lo que necesitas</span>
              <br />
              <span className="text-dark-800">para destacar</span>
            </h2>
            <p className="text-xl text-dark-500 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para jugadores que quieren ser descubiertos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="glass rounded-2xl p-8 hover:bg-dark-100 transition-all card-hover group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-800 mb-3 group-hover:text-primary-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-dark-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-dark-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-4 text-dark-800">
              Cómo <span className="gradient-text">Funciona</span>
            </h2>
            <p className="text-xl text-dark-500">
              Tres pasos simples para comenzar tu viaje profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Crea tu Perfil',
                description: 'Regístrate y completa tu información básica, UTR rating y experiencia'
              },
              {
                step: '02',
                title: 'Sube tus Videos',
                description: 'Comparte highlights, entrenamientos y partidos. Nuestra AI los analiza automáticamente'
              },
              {
                step: '03',
                title: 'Conecta con Scouts',
                description: 'Los scouts profesionales descubrirán tu perfil y se pondrán en contacto contigo'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-dark-200/10 absolute -top-6 -left-2">
                  {step.step}
                </div>
                <div className="relative glass rounded-2xl p-8 hover:bg-dark-100 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center mb-6 shadow-glow">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-800 mb-3">{step.title}</h3>
                  <p className="text-dark-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-dark-800">Listo para ser</span>
            <br />
            <span className="gradient-text">descubierto?</span>
          </h2>
          <p className="text-xl text-dark-500 mb-12">
            Únete a cientos de jugadores que ya están usando TennisScout AI
          </p>
          <button 
            onClick={onLoginClick}
            className="btn-premium px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-glow flex items-center gap-3 mx-auto"
          >
            Crear Cuenta Gratis
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-dark-700">TennisScout AI</span>
            </div>
            <div className="text-dark-500 text-sm">
              © 2026 TennisScout AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;