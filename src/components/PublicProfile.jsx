import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://tennisscout-backend.onrender.com/api/players/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlayerData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Perfil no encontrado</h2>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-lime-neon text-black font-bold rounded-xl">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-lime-neon" />
            <span className="text-xl font-black">TennisScout AI</span>
          </div>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-lime-neon text-black font-bold rounded-lg">
            Crear mi Perfil
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4">{playerData.fullName || playerData.nombre}</h1>
          <p className="text-gray-600">Edad: {playerData.edad} años</p>
          <p className="text-gray-600">País: {playerData.country || playerData.pais}</p>
        </div>

        <div className="mt-8 bg-lime-neon rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">¿Eres scout o entrenador?</h3>
          <button onClick={() => navigate('/')} className="px-8 py-4 bg-black text-lime-neon font-bold rounded-xl">
            Crear Cuenta Gratis
          </button>
        </div>
      </main>
    </div>
  );
};

export default PublicProfile;
