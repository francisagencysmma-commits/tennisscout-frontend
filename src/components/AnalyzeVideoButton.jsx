// components/AnalyzeVideoButton.jsx - Frontend

import React, { useState } from 'react';
import { Zap, Download, Loader, Lock } from 'lucide-react';

const AnalyzeVideoButton = ({ video, playerName, isPremium }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!isPremium) {
      alert('Esta función requiere suscripción Premium. ¡Actualiza tu cuenta!');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://tennisscout-backend.onrender.com/api/video-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          videoUrl: video.url,
          playerName: playerName,
          playerId: video.jugadorId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en análisis');
      }

      setAnalysis(data.analysis);
      setPdfUrl(data.pdfUrl);
      alert('¡Análisis completado! Descarga tu PDF.');

    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      alert('Error al analizar video: ' + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Botón Analizar */}
      <button
        onClick={handleAnalyze}
        disabled={analyzing}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          isPremium 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {analyzing ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Analizando con IA...
          </>
        ) : (
          <>
            {isPremium ? <Zap className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            {isPremium ? 'Análisis IA Premium' : 'Requiere Premium'}
          </>
        )}
      </button>

      {/* Botón Descargar PDF */}
      {pdfUrl && (
        <a
          href={pdfUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-lime-neon text-black font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
        >
          <Download className="w-5 h-5" />
          Descargar Informe PDF
        </a>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Preview del análisis */}
      {analysis && (
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 max-h-64 overflow-y-auto">
          <h4 className="font-bold text-black mb-2">Vista previa del análisis:</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{analysis.substring(0, 500)}...</p>
        </div>
      )}
    </div>
  );
};

export default AnalyzeVideoButton;