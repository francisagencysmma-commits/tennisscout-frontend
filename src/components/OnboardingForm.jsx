import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, X } from 'lucide-react';

const OnboardingForm = ({ initialData, onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fotoPerfil: '',
    
    // Basic Info
    fullName: initialData?.nombre || '',
    dateOfBirth: '',
    country: initialData?.pais || '',
    
    // Physical
    handedness: '', // Left or Right
    height: '', // cm
    weight: '', // kg
    
    // Experience
    yearsPlaying: '',
    ageStartedPlaying: '',
    
    // Competition
    officialTournamentsPlayed: '',
    nationalRanking: '',
    
    // Training
    currentCoachOrAcademy: '',
    weeklyTrainingHours: '',
    
    // Playing Style
    strongestStroke: '',
    playingStyle: '',
    firstServeConsistency: '', // percentage
    
    // Health
    injuryHistory: '',
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'tennisscout');

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dfiw0rscm/image/upload`,
        { method: 'POST', body: formDataUpload }
      );
      const data = await res.json();
      setFormData({ ...formData, fotoPerfil: data.secure_url });
    } catch (error) {
      console.error('Error subiendo foto:', error);
    }
    setUploading(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    onComplete(formData);
  };

  const totalSteps = 5;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold" style={{color: '#000'}}>Completa tu Perfil</h2>
              <p style={{color: '#666'}}>Paso {step} de {totalSteps}</p>
            </div>
            <button onClick={onSkip} style={{color: '#999'}}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(step / totalSteps) * 100}%`,
                backgroundColor: '#cdff00'
              }}
            ></div>
          </div>

          {/* STEP 1: Photo & Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4" style={{color: '#000'}}>📸 Foto y Datos Básicos</h3>
              
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden" style={{border: '4px solid #cdff00'}}>
                  {formData.fotoPerfil ? (
                    <img src={formData.fotoPerfil} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-12 h-12" style={{color: '#999'}} />
                  )}
                </div>
                <label className="px-6 py-3 rounded-xl font-bold cursor-pointer" style={{backgroundColor: '#cdff00', color: '#000'}}>
                  {uploading ? 'Subiendo...' : 'Subir Foto'}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploading} />
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="Rafael Nadal Parera"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="España"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Physical Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4" style={{color: '#000'}}>💪 Físico y Equipo</h3>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Left or Right Hand</label>
                <select
                  name="handedness"
                  value={formData.handedness}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                >
                  <option value="">Selecciona...</option>
                  <option value="Diestro">Diestro (Right)</option>
                  <option value="Zurdo">Zurdo (Left)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                    style={{borderColor: '#e5e5e5', color: '#000'}}
                    placeholder="188"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                    style={{borderColor: '#e5e5e5', color: '#000'}}
                    placeholder="82"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Years Playing</label>
                  <input
                    type="number"
                    name="yearsPlaying"
                    value={formData.yearsPlaying}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                    style={{borderColor: '#e5e5e5', color: '#000'}}
                    placeholder="18"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Age Started Playing</label>
                  <input
                    type="number"
                    name="ageStartedPlaying"
                    value={formData.ageStartedPlaying}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 rounded-xl"
                    style={{borderColor: '#e5e5e5', color: '#000'}}
                    placeholder="6"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Competition */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4" style={{color: '#000'}}>🏆 Competición</h3>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Official Tournaments Played</label>
                <input
                  type="number"
                  name="officialTournamentsPlayed"
                  value={formData.officialTournamentsPlayed}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>National Ranking</label>
                <input
                  type="text"
                  name="nationalRanking"
                  value={formData.nationalRanking}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="#12"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Training & Coaching */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4" style={{color: '#000'}}>🎾 Entrenamiento</h3>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Current Coach or Academy</label>
                <input
                  type="text"
                  name="currentCoachOrAcademy"
                  value={formData.currentCoachOrAcademy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="Carlos Ferrero"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Weekly Training Hours</label>
                <input
                  type="number"
                  name="weeklyTrainingHours"
                  value={formData.weeklyTrainingHours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="20"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Playing Style & Health */}
          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4" style={{color: '#000'}}>⚡ Estilo y Salud</h3>
              
              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Strongest Stroke</label>
                <select
                  name="strongestStroke"
                  value={formData.strongestStroke}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                >
                  <option value="">Selecciona...</option>
                  <option value="Forehand">Forehand</option>
                  <option value="Backhand">Backhand</option>
                  <option value="Serve">Serve</option>
                  <option value="Volley">Volley</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Playing Style</label>
                <select
                  name="playingStyle"
                  value={formData.playingStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                >
                  <option value="">Selecciona...</option>
                  <option value="Aggressive Baseliner">Aggressive Baseliner</option>
                  <option value="Defensive Baseliner">Defensive Baseliner</option>
                  <option value="All-Court">All-Court</option>
                  <option value="Serve & Volley">Serve & Volley</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>First Serve Consistency (%)</label>
                <input
                  type="number"
                  name="firstServeConsistency"
                  value={formData.firstServeConsistency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  placeholder="65"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#000'}}>Injury History</label>
                <textarea
                  name="injuryHistory"
                  value={formData.injuryHistory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl"
                  style={{borderColor: '#e5e5e5', color: '#000'}}
                  rows="3"
                  placeholder="Ej: Esguince de tobillo (Dic 2023), totalmente recuperado"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6" style={{borderTop: '1px solid #e5e5e5'}}>
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 border-2 rounded-xl font-bold"
                style={{borderColor: '#000', color: '#000'}}
              >
                <ArrowLeft className="w-5 h-5" />
                Atrás
              </button>
            ) : (
              <button
                onClick={onSkip}
                className="px-6 py-3 font-bold"
                style={{color: '#999'}}
              >
                Saltar
              </button>
            )}

            {step < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-8 py-3 rounded-xl font-bold flex items-center gap-2"
                style={{backgroundColor: '#cdff00', color: '#000'}}
              >
                Siguiente
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl font-bold flex items-center gap-2"
                style={{backgroundColor: '#cdff00', color: '#000'}}
              >
                Completar Perfil
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;