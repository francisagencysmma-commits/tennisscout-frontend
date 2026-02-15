import React, { useState } from 'react';
import { login, register } from '../services/api';
import { User, Mail, Lock, Trophy, ArrowRight, Shield } from 'lucide-react';

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await login({ email: formData.email, password: formData.password });
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
      setError('Error de conexión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Branding */}
      <div className="hidden lg:flex relative bg-forest-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
            alt="Tennis"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="w-20 h-20 bg-lime-neon rounded-2xl flex items-center justify-center shadow-neon mb-6 animate-pulse-neon">
            <Trophy className="w-12 h-12 text-dark-deepest" />
          </div>
          <h1 className="text-5xl font-display font-bold text-center mb-4">
            <span className="gradient-text-lime">TennisScout</span>
            <br />
            <span className="text-cream-50">AI</span>
          </h1>
          <p className="text-cream-200 text-center max-w-md mb-12">
            Master the Court with AI-Driven Insights
          </p>

          <div className="space-y-6 max-w-md w-full">
            {[
              { icon: Trophy, title: 'AI Stroke Analysis', desc: 'Real-time biomechanical feedback' },
              { icon: Shield, title: 'Scout Reporting', desc: 'Professional-grade PDF reports' },
              { icon: User, title: 'Performance Tracking', desc: 'Data-driven historical metrics' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4 bg-forest-light/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-lime-neon/20 rounded-lg flex items-center justify-center border border-lime-neon/30">
                    <Icon className="w-6 h-6 text-lime-neon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream-50 mb-1">{item.title}</h3>
                    <p className="text-sm text-cream-300">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-cream-50 relative">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-lime-neon rounded-xl flex items-center justify-center mx-auto mb-4 shadow-neon">
              <Trophy className="w-10 h-10 text-dark-deepest" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text-lime">TennisScout AI</h1>
          </div>

          <div className="mb-8 animate-fadeIn">
            <h2 className="text-4xl font-display font-bold text-dark-deepest mb-2">
              {isLogin ? 'Welcome Back' : 'Join the Network'}
            </h2>
            <p className="text-dark-light">
              {isLogin ? 'Log in to your scout dashboard' : 'Create your player account'}
            </p>
          </div>

          <div className="flex gap-2 mb-8 bg-dark-deepest/5 rounded-xl p-1">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                isLogin ? 'bg-lime-neon text-dark-deepest shadow-neon' : 'text-dark-light'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                !isLogin ? 'bg-lime-neon text-dark-deepest shadow-neon' : 'text-dark-light'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border-2 border-red-600 rounded-xl text-red-900 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-dark-deepest mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-light" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-dark-deepest/10 text-dark-deepest rounded-xl focus:border-lime-neon transition-all"
                    placeholder="Rafael Nadal"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-dark-deepest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-light" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-dark-deepest/10 text-dark-deepest rounded-xl focus:border-lime-neon transition-all"
                  placeholder="scout@tennisai.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-dark-deepest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-light" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-dark-deepest/10 text-dark-deepest rounded-xl focus:border-lime-neon transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-dark-deepest mb-2">País</label>
                    <input
                      type="text"
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white border-2 border-dark-deepest/10 rounded-xl focus:border-lime-neon"
                      placeholder="España"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-dark-deepest mb-2">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white border-2 border-dark-deepest/10 rounded-xl focus:border-lime-neon"
                      placeholder="17"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark-deepest mb-2">UTR Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    name="utrRating"
                    value={formData.utrRating}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border-2 border-dark-deepest/10 rounded-xl focus:border-lime-neon"
                    placeholder="12.4"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-neon w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Loading...' : (
                <>
                  <span>{isLogin ? 'Get Started' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-dark-light text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-dark-deepest font-bold hover:text-lime-neon"
            >
              {isLogin ? 'Join the Network' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;