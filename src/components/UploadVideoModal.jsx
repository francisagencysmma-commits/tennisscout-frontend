import React, { useState } from 'react';
import { X, Upload, Loader, Check } from 'lucide-react';

const UploadVideoModal = ({ onClose, onVideoUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    videoFile: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB
        alert('El video es muy grande. Máximo 100MB.');
        return;
      }
      setFormData(prev => ({ ...prev, videoFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.videoFile) {
      alert('Por favor selecciona un video');
      return;
    }

    setUploading(true);
    setUploadProgress(10);

    try {
      // 1. Subir video a Cloudinary
      const videoFormData = new FormData();
      videoFormData.append('file', formData.videoFile);
      videoFormData.append('upload_preset', 'tennisscout');
      
      setUploadProgress(30);
      
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dfiw0rscm/video/upload',
        {
          method: 'POST',
          body: videoFormData
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      
      if (!cloudinaryData.secure_url) {
        throw new Error('Error subiendo video a Cloudinary');
      }

      setUploadProgress(70);

      // 2. Guardar en backend
      const token = localStorage.getItem('token');
      const player = JSON.parse(localStorage.getItem('player'));

      const backendResponse = await fetch('https://tennisscout-backend.onrender.com/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          url: cloudinaryData.secure_url,
          duracion: Math.round(cloudinaryData.duration || 0),
          jugadorId: player._id || player.id
        })
      });

      if (!backendResponse.ok) {
        throw new Error('Error guardando video en base de datos');
      }

      setUploadProgress(100);
      alert('¡Video subido correctamente!');
      onVideoUploaded();
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error subiendo video: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border-2 border-slate-700 shadow-2xl">
        
        {/* Header */}
        <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Upload className="w-6 h-6 text-lime-400" />
            Subir Video
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={uploading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-2">
              Título del Video *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              disabled={uploading}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3 disabled:opacity-50"
              placeholder="Ej: Mi mejor remate del torneo"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              disabled={uploading}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3 resize-none disabled:opacity-50"
              placeholder="Describe tu jugada..."
              rows="4"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-2">
              Archivo de Video *
            </label>
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-lime-400 transition-all">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="hidden"
                id="video-upload"
              />
              <label 
                htmlFor="video-upload" 
                className={`cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                {formData.videoFile ? (
                  <div>
                    <p className="text-white font-medium mb-1">{formData.videoFile.name}</p>
                    <p className="text-slate-400 text-sm">
                      {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-medium mb-1">Click para seleccionar video</p>
                    <p className="text-slate-400 text-sm">MP4, MOV, AVI (máx 100MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div>
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-lime-400 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-center text-slate-400 text-sm mt-2">
                Subiendo... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-6 py-3 border-2 border-slate-700 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.videoFile}
              className="flex-1 px-6 py-3 bg-lime-400 text-slate-900 font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Subir Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoModal;