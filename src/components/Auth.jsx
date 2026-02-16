import React, { useState } from 'react';
import { login, register } from '../services/api';
import { User, Mail, Lock, Trophy, Eye, EyeOff, MapPin, Calendar } from 'lucide-react';
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
          edad: parseInt(formData.edad),
          utrRating: parseFloat(formData.utrRating) || 0
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
      {/* Left Section: Hero & Branding */}
      <div className="relative hidden w-full items-start justify-center lg:flex lg:w-3/5 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1200&q=80')"
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-green-900/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-12 xl:px-24 pt-7">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-lime-neon p-2 rounded-lg shadow-lg shadow-lime-neon/50">
              <Trophy className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">TennisScout AI</h1>
          </div>

          <div className="max-w-xl">
            <h2 className="text-5xl xl:text-6xl font-black leading-tight mb-6 text-white">
              Domina la Cancha con <span className="text-lime-neon">IA Avanzada</span>
            </h2>
            <p className="text-lg text-gray-200 mb-12">
              Únete a la red élite de scouts, coaches y jugadores profesionales usando análisis de movimiento de próxima generación.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-neon/90 text-black shadow-lg shadow-lime-neon/30">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Análisis de Golpes IA</h3>
                  <p className="text-sm text-gray-300">Feedback biomecánico en tiempo real de cada saque y volea.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-neon/90 text-black shadow-lg shadow-lime-neon/30">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Informes Scout</h3>
                  <p className="text-sm text-gray-300">Genera reportes PDF profesionales para reclutadores en segundos.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-neon/90 text-black shadow-lg shadow-lime-neon/30">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Seguimiento de Rendimiento</h3>
                  <p className="text-sm text-gray-300">Visualiza tu crecimiento con métricas históricas basadas en datos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="absolute bottom-8 left-12 flex items-center gap-2 text-xs font-medium text-gray-300 uppercase tracking-widest">
          <span className="h-[1px] w-8 bg-lime-neon"></span>
          El Futuro del Tenis Profesional
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-2/5 lg:p-12 bg-white">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <Trophy className="w-8 h-8 text-lime-neon" />
          <h1 className="text-2xl font-black tracking-tight text-gray-900">TennisScout AI</h1>
        </div>

        <div className="w-full max-w-md rounded-2xl p-8 lg:p-10 bg-gradient-to-br from-green-50 to-lime-50 border-2 border-green-200 shadow-xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Bienvenido' : 'Únete Ahora'}
            </h2>
            <p className="text-gray-700">
              {isLogin ? 'Inicia sesión en tu dashboard' : 'Crea tu cuenta de scout'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-xl text-red-800 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Nombre Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-4 pl-12 placeholder-gray-500 transition-all"
                    placeholder="Rafael Nadal"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-4 pl-12 placeholder-gray-500 transition-all"
                  placeholder="scout@tennisai.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-900">Contraseña</label>
                {isLogin && (
                  <a className="text-xs text-green-600 hover:underline font-medium" href="#">¿Olvidaste tu contraseña?</a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-4 pl-12 pr-12 placeholder-gray-500 transition-all"
                  placeholder="••••••••"
                />
                <div 
                  className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer text-gray-500 hover:text-green-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">País</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-4 pl-11 placeholder-gray-500"
                        placeholder="España"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-4 placeholder-gray-500"
                      placeholder="17"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">UTR Rating (opcional)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="utrRating"
                    value={formData.utrRating}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-green-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-lime-neon focus:border-lime-neon block p-4 placeholder-gray-500"
                    placeholder="12.4"
                  />
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex items-center">
                <input
                  className="w-4 h-4 text-lime-neon bg-white border-2 border-green-300 rounded focus:ring-lime-neon"
                  id="remember"
                  type="checkbox"
                />
                <label className="ml-2 text-sm text-gray-700" htmlFor="remember">
                  Mantener sesión iniciada por 30 días
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-lime-neon text-gray-900 font-black text-lg hover:brightness-110 hover:shadow-[0_0_20px_rgba(205,255,0,0.4)] transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 shadow-lg"
            >
              {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-green-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-br from-green-50 to-lime-50 px-2 text-gray-600 font-medium">O continúa con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-green-200 bg-white hover:bg-green-50 transition-colors">
              <span className="text-sm font-medium text-gray-900">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-green-200 bg-white hover:bg-green-50 transition-colors">
              <span className="text-sm font-medium text-gray-900">Apple</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-700">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            {' '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-green-600 font-bold hover:underline"
            >
              {isLogin ? 'Únete a la Red' : 'Inicia Sesión'}
            </button>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 w-full max-w-md">
          <p className="text-center text-[10px] uppercase tracking-widest text-gray-600 mb-6 font-bold">
            Confiado por Socios Técnicos Globalmente
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-1 font-black text-lg text-green-600">
              <Trophy className="w-5 h-5" /> SECURE
            </div>
            <div className="flex items-center gap-1 font-black text-lg text-green-600">
              <Trophy className="w-5 h-5" /> ATP-TECH
            </div>
            <div className="flex items-center gap-1 font-black text-lg text-green-600">
              <Trophy className="w-5 h-5" /> WTA-CERT
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-auto pt-8 flex gap-6 text-[11px] text-gray-600">
          <a className="hover:text-green-600 transition-colors" href="#">Privacidad</a>
          <a className="hover:text-green-600 transition-colors" href="#">Términos</a>
          <a className="hover:text-green-600 transition-colors" href="#">Soporte</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;