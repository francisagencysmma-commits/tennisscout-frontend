import React, { useState } from 'react';
import { login, register } from '../services/api';
import { User, Mail, Lock, Trophy, Eye, EyeOff } from 'lucide-react';
import OnboardingForm from './OnboardingForm';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [tempPlayer, setTempPlayer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    pais: '',
    edad: ''
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
        
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('player', JSON.stringify(response.player));
          onAuthSuccess(response.player);
        } else {
          setError(response.error || 'Error en login');
        }
      } else {
        response = await register({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          pais: formData.pais,
          edad: parseInt(formData.edad)
        });

        if (response.token) {
          const playerId = response.player._id || response.player.id;
          localStorage.setItem('token', response.token);
          localStorage.setItem('player', JSON.stringify(response.player));
          
          setTempPlayer({
            ...response.player,
            _id: playerId,
            id: playerId
          });
          setShowOnboarding(true);
        } else {
          setError(response.error || 'Error en registro');
        }
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (onboardingData) => {
    try {
      const token = localStorage.getItem('token');
      const playerId = tempPlayer._id || tempPlayer.id;
      
      if (!playerId) {
        throw new Error('No se encontró el ID del jugador');
      }

      const response = await fetch(`https://tennisscout-backend.onrender.com/api/players/${playerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...onboardingData,
          fullName: onboardingData.fullName || tempPlayer.nombre
        })
      });

      if (!response.ok) {
        throw new Error('Error actualizando perfil');
      }

      const updatedPlayer = await response.json();
      localStorage.setItem('player', JSON.stringify(updatedPlayer));
      onAuthSuccess(updatedPlayer);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      alert(`Error guardando datos: ${error.message}`);
      onAuthSuccess(tempPlayer);
    }
  };

  const handleOnboardingSkip = () => {
    onAuthSuccess(tempPlayer);
  };

  if (showOnboarding) {
    return (
      <OnboardingForm 
        initialData={tempPlayer}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50">
      {/* Left Section: Hero (Hidden on mobile) */}
      <div className="relative hidden lg:flex w-full items-center justify-center lg:w-3/5">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1612534847738-b3af9bc42abe?w=1200&q=80')"
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-green-900/40"></div>
        </div>

        <div className="relative z-10 px-12 xl:px-24">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-lime-neon p-2 rounded-lg shadow-lg shadow-lime-neon/50">
              <Trophy className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">PadelScout AI</h1>
          </div>

          <div className="max-w-xl">
            <h2 className="text-5xl xl:text-6xl font-black leading-tight mb-6 text-white">
              Domina la Pista con <span className="text-lime-neon">IA Avanzada</span>
            </h2>
            <p className="text-lg text-gray-200 mb-12">
              Únete a la red élite de scouts, entrenadores y jugadores profesionales de pádel.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-neon/90 text-black shadow-lg shadow-lime-neon/30">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Análisis de Golpes IA</h3>
                  <p className="text-sm text-gray-300">Feedback técnico en tiempo real de tu bandeja, volea y remate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-12 flex items-center gap-2 text-xs font-medium text-gray-300 uppercase tracking-widest">
          <span className="h-[1px] w-8 bg-lime-neon"></span>
          El Futuro del Pádel
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="flex w-full flex-col items-center justify-center p-4 sm:p-6 lg:w-2/5 lg:p-12 bg-white min-h-screen">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:hidden">
          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-lime-neon" />
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">PadelScout AI</h1>
        </div>

        <div className="w-full max-w-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-green-50 to-lime-50 border-2 border-green-200 shadow-xl">
          <div className="mb-6 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Bienvenido' : 'Únete Ahora'}
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              {isLogin ? 'Inicia sesión en tu dashboard' : 'Crea tu perfil de jugador'}
            </p>
          </div>

          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border-2 border-red-400 rounded-xl text-red-800 text-xs sm:text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Nombre Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none text-gray-500">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-3 sm:p-4 pl-10 sm:pl-12 placeholder-gray-500 transition-all"
                    placeholder="Alejandro Galán"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-3 sm:p-4 pl-10 sm:pl-12 placeholder-gray-500 transition-all"
                  placeholder="scout@padelai.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-900">Contraseña</label>
                {isLogin && (
                  <a className="text-xs text-green-600 hover:underline font-medium" href="#">¿Olvidaste?</a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-3 sm:p-4 pl-10 sm:pl-12 pr-10 sm:pr-12 placeholder-gray-500 transition-all"
                  placeholder="••••••••"
                />
                <div 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 cursor-pointer text-gray-500 hover:text-green-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
              </div>
            </div>

            {!isLogin && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">País</label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-3 sm:p-4 placeholder-gray-500"
                    placeholder="España"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">Edad</label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-3 sm:p-4 placeholder-gray-500"
                    placeholder="25"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 rounded-xl bg-lime-neon text-gray-900 font-black text-base sm:text-lg hover:brightness-110 hover:shadow-lg transition-all duration-200 disabled:opacity-50 shadow-lg"
            >
              {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-700">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            {' '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-green-600 font-bold hover:underline"
            >
              {isLogin ? 'Únete' : 'Inicia Sesión'}
            </button>
          </p>
        </div>

        <div className="hidden sm:flex mt-auto pt-6 sm:pt-8 gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-gray-600">
          <a className="hover:text-green-600 transition-colors" href="#">Privacidad</a>
          <a className="hover:text-green-600 transition-colors" href="#">Términos</a>
          <a className="hover:text-green-600 transition-colors" href="#">Soporte</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;