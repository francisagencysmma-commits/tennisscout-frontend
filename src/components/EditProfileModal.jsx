import React, { useState } from 'react';
import { X, Upload, Loader } from 'lucide-react';

const EditProfileModal = ({ playerData, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    fullName: playerData?.fullName || playerData?.nombre || '',
    email: playerData?.email || '',
    country: playerData?.country || playerData?.pais || '',
    dateOfBirth: playerData?.dateOfBirth ? playerData.dateOfBirth.split('T')[0] : '',
    handedness: playerData?.handedness || '',
    playingStyle: playerData?.playingStyle || '',
    nationalRanking: playerData?.nationalRanking || '',
    height: playerData?.height || '',
    weight: playerData?.weight || '',
    strongestStroke: playerData?.strongestStroke || '',
    firstServeConsistency: playerData?.firstServeConsistency || '',
    currentCoachOrAcademy: playerData?.currentCoachOrAcademy || '',
    yearsPlaying: playerData?.yearsPlaying || '',
    weeklyTrainingHours: playerData?.weeklyTrainingHours || '',
    fotoPerfil: playerData?.fotoPerfil || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy grande. Máximo 5MB.');
      return;
    }

    setUploadingPhoto(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'tennisscout');

      const response = await fetch('https://api.cloudinary.com/v1_1/dfiw0rscm/image/upload', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await response.json();
      
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          fotoPerfil: data.secure_url
        }));
        alert('Foto subida correctamente');
      }
    } catch (error) {
      console.error('Error subiendo foto:', error);
      alert('Error subiendo foto. Intenta de nuevo.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const playerId = playerData._id || playerData.id;

      const response = await fetch(`https://tennisscout-backend.onrender.com/api/players/${playerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error actualizando perfil');
      }

      const updatedPlayer = await response.json();
      localStorage.setItem('player', JSON.stringify(updatedPlayer));
      
      alert('Perfil actualizado correctamente');
      onSave(updatedPlayer);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Error actualizando perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-lime-neon shadow-2xl my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-black">Editar Perfil</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Foto de Perfil */}
          <div className="text-center">
            <label className="block text-sm font-bold text-gray-900 mb-3">Foto de Perfil</label>
            <div className="flex flex-col items-center gap-4">
              {formData.fotoPerfil ? (
                <img 
                  src={formData.fotoPerfil} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-lime-neon"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-4 border-lime-neon">
                  <span className="text-4xl font-bold text-lime-neon">
                    {formData.fullName.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              
              <label className="cursor-pointer px-6 py-3 bg-lime-neon text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center gap-2">
                {uploadingPhoto ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Cambiar Foto
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploadingPhoto}
                />
              </label>
            </div>
          </div>

          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4 border-b-2 border-lime-neon pb-2">Información Personal</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">País *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>
            </div>
          </div>

          {/* Información Técnica */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4 border-b-2 border-lime-neon pb-2">Información Técnica</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mano Dominante</label>
                <select
                  name="handedness"
                  value={formData.handedness}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Derecha">Derecha</option>
                  <option value="Izquierda">Izquierda</option>
                  <option value="Ambidiestro">Ambidiestro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Estilo de Juego</label>
                <select
                  name="playingStyle"
                  value={formData.playingStyle}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Agresivo de fondo">Agresivo de fondo</option>
                  <option value="Defensivo">Defensivo</option>
                  <option value="Saque y volea">Saque y volea</option>
                  <option value="Todoterreno">Todoterreno</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Golpe más Potente</label>
                <input
                  type="text"
                  name="strongestStroke"
                  value={formData.strongestStroke}
                  onChange={handleChange}
                  placeholder="Ej: Derecha"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Ranking Nacional</label>
                <input
                  type="text"
                  name="nationalRanking"
                  value={formData.nationalRanking}
                  onChange={handleChange}
                  placeholder="Ej: #15"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>
            </div>
          </div>

          {/* Información Física */}
          <div>
            <h3 className="text-lg font-bold text-black mb-4 border-b-2 border-lime-neon pb-2">Información Física</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Altura (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="175"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="70"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Consistencia 1er Saque (%)</label>
                <input
                  type="number"
                  name="firstServeConsistency"
                  value={formData.firstServeConsistency}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="75"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Entrenador / Academia</label>
                <input
                  type="text"
                  name="currentCoachOrAcademy"
                  value={formData.currentCoachOrAcademy}
                  onChange={handleChange}
                  placeholder="Rafa Nadal Academy"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Años Jugando</label>
                <input
                  type="number"
                  name="yearsPlaying"
                  value={formData.yearsPlaying}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Horas Entrenamiento/Semana</label>
                <input
                  type="number"
                  name="weeklyTrainingHours"
                  value={formData.weeklyTrainingHours}
                  onChange={handleChange}
                  placeholder="20"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20"
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4 border-t-2 border-gray-200 sticky bottom-0 bg-white pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-lime-neon text-black font-bold rounded-xl hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;