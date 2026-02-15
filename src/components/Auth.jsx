import React, { useState } from 'react';
import { login, register } from '../services/api';
import { User, Mail, Lock, Trophy, ArrowRight } from 'lucide-react';
import OnboardingForm from './OnboardingForm';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [tempPlayer, setTempPlayer] = useState(null);
  
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

        console.log('Respuesta registro completa:', response);

        if (response.token) {
          // Verificar qué campo tiene el ID
          const playerId = response.player._id || response.player.id || response.id;
          console.log('Player ID encontrado:', playerId);
          console.log('Player completo:', response.player);

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
      console.error('Error completo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (onboardingData) => {
    try {
      const token = localStorage.getItem('token');
      const playerId = tempPlayer._id || tempPlayer.id;
      
      console.log('=== INICIO ACTUALIZACIÓN ===');
      console.log('Player ID:', playerId);
      console.log('Token:', token ? 'Existe' : 'NO EXISTE');
      console.log('Datos a enviar:', onboardingData);
      
      if (!playerId) {
        throw new Error('No se encontró el ID del jugador');
      }

      const url = `https://tennisscout-backend.onrender.com/api/players/${playerId}`;
      console.log('URL:', url);

      const response = await fetch(url, {
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

      console.log('Status de respuesta:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const updatedPlayer = await response.json();
      
      console.log('Jugador actualizado exitosamente:', updatedPlayer);
      console.log('=== FIN ACTUALIZACIÓN ===');
      
      localStorage.setItem('player', JSON.stringify(updatedPlayer));
      onAuthSuccess(updatedPlayer);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      alert(`Error guardando datos: ${error.message}. Puedes editar tu perfil después.`);
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
            <span className="text-white">AI</span>
          </h1>
          <p className="text-gray-300 text-center max-w-md mb-12">
            Crea tu perfil profesional y conecta con scouts y academias
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-white relative">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-lime-neon rounded-xl flex items-center justify-center mx-auto mb-4 shadow-neon">
              <Trophy className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl font-display font-bold gradient-text-lime">TennisScout AI</h1>
          </div>

          <div className="mb-8 animate-fadeIn">
            <h2 className="text-4xl font-display font-bold text-black mb-2">
              {isLogin ? 'Bienvenido' : 'Únete Ahora'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu perfil profesional'}
            </p>
          </div>

          <div className="flex gap-2 mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                isLogin ? 'bg-lime-neon text-black shadow-neon' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                !isLogin ? 'bg-lime-neon text-black shadow-neon' : 'text-gray-600'
              }`}
            >
              Registro
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-black mb-2">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-lime-neon transition-all"
                    placeholder="Rafael Nadal"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-black mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-lime-neon transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 text-black rounded-xl focus:border-lime-neon transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">País</label>
                    <input
                      type="text"
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-lime-neon"
                      placeholder="España"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-lime-neon"
                      placeholder="17"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">UTR Rating (opcional)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="utrRating"
                    value={formData.utrRating}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-lime-neon"
                    placeholder="12.4"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-neon w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 text-black"
            >
              {loading ? 'Cargando...' : (
                <>
                  <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600 text-sm">
            {isLogin ? "¿No tienes cuenta?" : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-black font-bold hover:text-lime-neon"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;