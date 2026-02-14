import React, { useState } from 'react';
import { uploadVideo } from '../services/api';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

const UploadVideo = ({ playerId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tags: '',
    duracion: ''
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('video/')) {
        setError('Por favor selecciona un archivo de video');
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('El video no puede superar los 100MB');
        return;
      }
      setFile(selectedFile);
      setError('');
      console.log('✅ Archivo seleccionado:', selectedFile.name);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📤 Iniciando subida...');
    console.log('Player ID:', playerId);
    console.log('Archivo:', file);
    console.log('Form Data:', formData);
    
    if (!file) {
      setError('Por favor selecciona un video');
      return;
    }

    if (!formData.titulo) {
      setError('Por favor ingresa un título');
      return;
    }

    if (!playerId) {
      setError('Error: No se encontró el ID del jugador');
      console.error('Player ID no definido');
      return;
    }

    setUploading(true);
    setProgress(10);
    setError('');

    try {
      const data = new FormData();
      data.append('video', file);
      data.append('jugadorId', playerId);
      data.append('titulo', formData.titulo);
      data.append('descripcion', formData.descripcion);
      data.append('duracion', formData.duracion);
      data.append('tags', JSON.stringify(formData.tags.split(',').map(t => t.trim()).filter(t => t)));

      console.log('📦 FormData preparado, enviando...');
      setProgress(30);

      const response = await uploadVideo(data);
      console.log('✅ Respuesta del servidor:', response);

      setProgress(100);
      setSuccess(true);
      
      setTimeout(() => {
        setFile(null);
        setFormData({
          titulo: '',
          descripcion: '',
          tags: '',
          duracion: ''
        });
        setSuccess(false);
        if (onUploadSuccess) onUploadSuccess(response.video);
      }, 2000);

    } catch (err) {
      console.error('❌ Error completo:', err);
      setError('Error al subir el video: ' + (err.message || 'Error desconocido'));
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Subir Video</h3>

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600" />
          <span className="text-green-700">¡Video subido exitosamente!</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Archivo de Video
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
              disabled={uploading}
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-1">
                    Click para seleccionar un video
                  </p>
                  <p className="text-xs text-gray-500">
                    MP4, MOV, AVI (máx. 100MB)
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Ej: Servicio ganador - Semifinal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            disabled={uploading}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe el video..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (separados por comas)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              disabled={uploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Servicio, Winner, Final"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duración
            </label>
            <input
              type="text"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              disabled={uploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="2:34"
            />
          </div>
        </div>

        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subiendo video...</span>
              <span className="font-medium text-primary-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Subiendo...' : 'Subir Video'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
