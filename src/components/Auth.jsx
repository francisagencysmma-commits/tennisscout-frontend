import React, { useState } from 'react';
import { login, register } from '../services/api';
import { User, Mail, Lock, Trophy, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    pais: '',
    edad: '',
    utrRating: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await register({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          pais: formData.pais,
          edad: parseInt(formData.edad),
          utrRating: parseFloat(formData.utrRating)
        });
      }

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('player', JSON.stringify(response.player));
        onAuthSuccess(response.player);
      } else {
        setError(response.error || 'Error en la autenticación');
      }
    } catch (err) {
      setError('Error de conexión. Verifica que el backend esté corriendo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Visual/Branding */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-dark-50 via-dark-100 to-dark-50 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          {/* Logo */}
          <div className="mb-12 animate-fadeIn">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-glow mb-6 mx-auto animate-glow">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-display font-bold text-center">
              <span className="gradient-text">TennisScout</span>
              <br />
              <span className="text-dark-800">AI</span>
            </h1>
          </div>

          {/* Features */}
          <div className="space-y-6 max-w-md">
            {[
              {
                icon: Sparkles,
                title: 'Análisis AI Avanzado',
                description: 'Obtén insights profesionales de tus videos de tenis'
              },
              {
                icon: Shield,
                title: 'Perfil Verificado',
                description: 'Destaca con badges y certificaciones profesionales'
              },
              {
                icon: Zap,
                title: 'Conexión Directa',
                description: 'Scouts y academias te encontrarán fácilmente'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-start gap-4 glass rounded-xl p-4 animate-slideUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center border border-primary-500/30 flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-dark-500">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-md">
            {[
              { number: '500+', label: 'Jugadores' },
              { number: '1.2K', label: 'Videos' },
              { number: '50+', label: 'Scouts' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                <div className="text-xs text-dark-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-dark-50 relative overflow-hidden">
        {/* Mobile background */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text">TennisScout AI</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-4xl font-display font-bold text-dark-800 mb-2">
              {isLogin ? '¡Bienvenido!' : '¡Únete ahora!'}
            </h2>
            <p className="text-dark-500">
              {isLogin 
                ? 'Inicia sesión para continuar tu viaje profesional' 
                : 'Crea tu cuenta y destaca entre los mejores'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 glass rounded-xl p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow'
                  : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow'
                  : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 text-sm animate-slideUp">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-slideUp">
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-12 pr-4 py-4 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-dark-400"
                    placeholder="Rafael Nadal"
                  />
                </div>
              </div>
            )}

            <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-dark-400"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-dark-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-dark-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-2">
                      País
                    </label>
                    <input
                      type="text"
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-dark-400"
                      placeholder="España"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark-700 mb-2">
                      Edad
                    </label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-dark-400"
                      placeholder="17"
                    />
                  </div>
                </div>

                <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    UTR Rating <span className="text-dark-500 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="utrRating"
                    value={formData.utrRating}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-dark-400"
                    placeholder="12.4"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-glow flex items-center justify-center gap-2 mt-8"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Cargando...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-dark-500">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary-500 font-semibold hover:text-primary-400 transition-colors"
            >
              {isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-dark-200">
            <div className="flex items-center justify-center gap-6 text-xs text-dark-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-500" />
                <span>Datos Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span>Gratis Siempre</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;