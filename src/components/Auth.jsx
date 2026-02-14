import React, { useState } from 'react';
import { login, register } from '../services/api';
import { User, Mail, Lock, Trophy } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">TennisScout AI</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta de jugador'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              isLogin
                ? 'bg-white text-primary-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              !isLogin
                ? 'bg-white text-primary-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Mateo Silva"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="mateo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="España"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="17"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UTR Rating (opcional)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="utrRating"
                  value={formData.utrRating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="12.4"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-primary-600 font-medium hover:text-primary-700"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;