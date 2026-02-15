import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

const UploadVideo = ({ playerId, onUploadSuccess }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  console.log('=== UploadVideo Component ===');
  console.log('Player ID recibido:', playerId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Archivo seleccionado:', file);
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setError('');
    } else {
      setError('Por favor selecciona un archivo de video válido');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== INICIO SUBIDA VIDEO ===');
    console.log('Player ID:', playerId);
    console.log('Título:', titulo);
    console.log('Descripción:', descripcion);
    console.log('Archivo:', videoFile);

    if (!videoFile || !titulo) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!playerId) {
      setError('Error: No se encontró el ID del jugador');
      console.error('playerId es undefined o null');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      // 1. Subir video a Cloudinary
      console.log('Paso 1: Subiendo a Cloudinary...');
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('upload_preset', 'tennisscout');
      formData.append('resource_type', 'video');

      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dfiw0rscm/video/upload',
        {
          method: 'POST',
          body: formData
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error('Error subiendo video a Cloudinary');
      }

      const cloudinaryData = await cloudinaryResponse.json();
      console.log('Video subido a Cloudinary:', cloudinaryData.secure_url);

      setUploadProgress(50);

      // 2. Guardar en backend
      console.log('Paso 2: Guardando en backend...');
      const videoData = {
        jugadorId: playerId,
        titulo: titulo,
        descripcion: descripcion,
        url: cloudinaryData.secure_url,
        duracion: Math.floor(cloudinaryData.duration || 0)
      };

      console.log('Datos a enviar al backend:', videoData);

      const backendResponse = await fetch('https://tennisscout-backend.onrender.com/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(videoData)
      });

      console.log('Status del backend:', backendResponse.status);

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        console.error('Error del backend:', errorText);
        throw new Error(`Error guardando video: ${errorText}`);
      }

      const savedVideo = await backendResponse.json();
      console.log('Video guardado en backend:', savedVideo);

      setUploadProgress(100);
      setSuccess(true);

      setTimeout(() => {
        console.log('Llamando onUploadSuccess con:', savedVideo);
        onUploadSuccess(savedVideo);
      }, 1000);

    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message || 'Error subiendo el video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Debug Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs">
        <strong>Debug Info:</strong>
        <div>Player ID: {playerId || 'undefined'}</div>
        <div>Token: {localStorage.getItem('token') ? 'Existe' : 'No existe'}</div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-700">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-green-700">¡Video subido con éxito!</p>
            <p className="text-sm text-green-600">Tu video se está procesando...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-bold text-black mb-2">Seleccionar Video</label>
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
              disabled={uploading}
            />
            <label
              htmlFor="video-upload"
              className={`flex items-center justify-center gap-3 w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                videoFile 
                  ? 'border-lime-neon bg-lime-neon/5' 
                  : 'border-gray-300 hover:border-lime-neon hover:bg-gray-50'
              } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Upload className="w-6 h-6 text-gray-400" />
              <div className="text-center">
                <p className="font-bold text-black">
                  {videoFile ? videoFile.name : 'Click para seleccionar video'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {videoFile ? `${(videoFile.size / 1024 / 1024).toFixed(2)} MB` : 'Formatos: MP4, MOV, AVI'}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-black mb-2">Título del Video</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            disabled={uploading}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-neon transition-all text-black"
            placeholder="Ej: Match Point - Madrid Open"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-black mb-2">Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            disabled={uploading}
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-lime-neon transition-all text-black resize-none"
            placeholder="Describe tu jugada..."
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-black">Subiendo video...</span>
              <span className="text-gray-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-lime-neon h-full transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading || !videoFile || !titulo}
          className="w-full py-4 bg-lime-neon text-black font-bold rounded-xl hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Subir Video
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;