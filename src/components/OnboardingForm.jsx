import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const OnboardingForm_Padel = ({ initialData, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: initialData?.nombre || '',
    dateOfBirth: '',
    country: initialData?.pais || '',
    
    // Información técnica específica de pádel
    playingSide: '', // Derecha o Izquierda
    position: '', // Drive (derecha) o Revés (izquierda)
    playingLevel: '', // Principiante, Intermedio, Avanzado, Profesional
    yearsPlaying: '',
    
    // Golpes y técnicas
    strongestShot: '', // Bandeja, Víbora, Remate, Volea, etc.
    bestSkill: '', // Red, Fondo, Potencia, Control, etc.
    weakestShot: '',
    serveType: '', // Plana, Cortada, Liftada
    
    // Estilo de juego
    playingStyle: '', // Agresivo, Defensivo, Equilibrado, Táctico
    preferredSurface: '', // Césped artificial, Cemento, Cristal
    
    // Físico
    height: '',
    weight: '',
    dominantHand: '', // Diestro, Zurdo
    
    // Experiencia competitiva
    hasCompetitiveExperience: false,
    tournamentLevel: '', // Local, Regional, Nacional, Internacional
    ranking: '',
    currentClub: '',
    currentCoach: '',
    
    // Entrenamiento
    weeklyHours: '',
    trainingFocus: '', // Técnica, Físico, Táctico, Mental
    
    // Objetivos
    goals: '', // Mejorar ranking, Profesionalizarse, Diversión, etc.
    availability: '' // Tiempo disponible para entrenar más
  });

  const questions = [
    {
      id: 'basic',
      title: '👋 Información Básica',
      description: 'Empecemos con lo esencial',
      fields: [
        { name: 'fullName', label: 'Nombre Completo', type: 'text', required: true, placeholder: 'Alejandro Galán' },
        { name: 'dateOfBirth', label: 'Fecha de Nacimiento', type: 'date', required: true },
        { name: 'country', label: 'País', type: 'text', required: true, placeholder: 'España' }
      ]
    },
    {
      id: 'position',
      title: '🎾 Tu Posición en Pista',
      description: '¿Dónde juegas normalmente?',
      fields: [
        { 
          name: 'position', 
          label: '¿En qué posición juegas?', 
          type: 'select', 
          required: true,
          options: ['Drive (Derecha)', 'Revés (Izquierda)', 'Ambas posiciones']
        },
        { 
          name: 'playingSide', 
          label: '¿Qué lado prefieres?', 
          type: 'select', 
          required: true,
          options: ['Derecha', 'Izquierda', 'Sin preferencia']
        },
        { 
          name: 'dominantHand', 
          label: 'Mano dominante', 
          type: 'select', 
          required: true,
          options: ['Diestro', 'Zurdo']
        }
      ]
    },
    {
      id: 'level',
      title: '📊 Tu Nivel',
      description: 'Cuéntanos sobre tu experiencia',
      fields: [
        { 
          name: 'playingLevel', 
          label: '¿Cuál es tu nivel actual?', 
          type: 'select', 
          required: true,
          options: ['Principiante (< 1 año)', 'Intermedio (1-3 años)', 'Avanzado (3-5 años)', 'Competición (5+ años)', 'Profesional']
        },
        { name: 'yearsPlaying', label: '¿Cuántos años llevas jugando?', type: 'number', required: true, placeholder: '5' },
        { name: 'ranking', label: 'Ranking (si tienes)', type: 'text', required: false, placeholder: '#150 Nacional' }
      ]
    },
    {
      id: 'shots',
      title: '💪 Tus Golpes',
      description: 'Identifica tus fortalezas y áreas de mejora',
      fields: [
        { 
          name: 'strongestShot', 
          label: '¿Cuál es tu golpe más potente?', 
          type: 'select', 
          required: true,
          options: ['Bandeja', 'Víbora', 'Remate', 'Volea', 'Dejada', 'Globo', 'Contraataque']
        },
        { 
          name: 'weakestShot', 
          label: '¿Qué golpe necesitas mejorar?', 
          type: 'select', 
          required: true,
          options: ['Bandeja', 'Víbora', 'Remate', 'Volea', 'Dejada', 'Globo', 'Contraataque']
        },
        { 
          name: 'bestSkill', 
          label: '¿Dónde destacas más?', 
          type: 'select', 
          required: true,
          options: ['Juego de Red', 'Juego de Fondo', 'Potencia', 'Control', 'Velocidad', 'Táctica', 'Resistencia']
        }
      ]
    },
    {
      id: 'style',
      title: '🎯 Tu Estilo de Juego',
      description: '¿Cómo juegas?',
      fields: [
        { 
          name: 'playingStyle', 
          label: 'Define tu estilo', 
          type: 'select', 
          required: true,
          options: ['Agresivo (ataque constante)', 'Defensivo (contraataque)', 'Equilibrado (versátil)', 'Táctico (cerebral)', 'Potencia pura']
        },
        { 
          name: 'serveType', 
          label: 'Tipo de saque preferido', 
          type: 'select', 
          required: true,
          options: ['Plano (potencia)', 'Cortado (control)', 'Liftado (efecto)', 'Bandeja saque', 'Varía según rival']
        },
        { 
          name: 'preferredSurface', 
          label: 'Superficie favorita', 
          type: 'select', 
          required: false,
          options: ['Césped artificial', 'Cemento/Hormigón', 'Cristal', 'Moqueta', 'No tengo preferencia']
        }
      ]
    },
    {
      id: 'physical',
      title: '🏋️ Información Física',
      description: 'Datos para análisis biomecánico',
      fields: [
        { name: 'height', label: 'Altura (cm)', type: 'number', required: false, placeholder: '180' },
        { name: 'weight', label: 'Peso (kg)', type: 'number', required: false, placeholder: '75' }
      ]
    },
    {
      id: 'experience',
      title: '🏆 Experiencia Competitiva',
      description: 'Tu trayectoria en torneos',
      fields: [
        { 
          name: 'hasCompetitiveExperience', 
          label: '¿Has jugado torneos?', 
          type: 'checkbox', 
          required: false 
        },
        { 
          name: 'tournamentLevel', 
          label: '¿A qué nivel?', 
          type: 'select', 
          required: false,
          options: ['Local (club)', 'Regional (provincia)', 'Nacional', 'Internacional', 'Circuito profesional (WPT/APT)']
        },
        { name: 'currentClub', label: 'Club actual', type: 'text', required: false, placeholder: 'Real Club de Pádel' },
        { name: 'currentCoach', label: 'Entrenador actual', type: 'text', required: false, placeholder: 'Juan Martín Díaz' }
      ]
    },
    {
      id: 'training',
      title: '📅 Entrenamiento',
      description: 'Tu rutina actual',
      fields: [
        { name: 'weeklyHours', label: 'Horas semanales de entreno', type: 'number', required: true, placeholder: '10' },
        { 
          name: 'trainingFocus', 
          label: '¿En qué te enfocas más?', 
          type: 'select', 
          required: true,
          options: ['Técnica', 'Físico/Preparación', 'Táctico/Estrategia', 'Mental/Psicológico', 'Todo equilibrado']
        }
      ]
    },
    {
      id: 'goals',
      title: '🎯 Tus Objetivos',
      description: '¿Qué buscas conseguir?',
      fields: [
        { 
          name: 'goals', 
          label: 'Objetivo principal', 
          type: 'select', 
          required: true,
          options: [
            'Mejorar mi ranking', 
            'Profesionalizarme', 
            'Llegar al circuito WPT',
            'Ganar torneos locales',
            'Mejorar técnica',
            'Jugar por diversión y mejorar',
            'Ser descubierto por scouts'
          ]
        },
        { 
          name: 'availability', 
          label: 'Disponibilidad para entrenar más', 
          type: 'select', 
          required: true,
          options: ['Tiempo completo (profesional)', 'Parcial (20h+ semana)', 'Fines de semana', 'Flexible', 'Limitada (trabajo/estudios)']
        }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    // Validar campos requeridos
    const requiredFields = currentQuestion.fields.filter(f => f.required);
    const allFilled = requiredFields.every(field => formData[field.name]);
    
    if (!allFilled) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative animate-fadeIn">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-t-2xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-lime-neon transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{currentQuestion.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{currentQuestion.description}</p>
          </div>
          <button 
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {currentQuestion.fields.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20 transition-all"
                >
                  <option value="">Selecciona una opción</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleChange}
                    className="w-5 h-5 text-lime-neon focus:ring-lime-neon border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Sí, tengo experiencia en torneos</span>
                </label>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-lime-neon focus:ring-2 focus:ring-lime-neon/20 transition-all"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </button>

          <div className="text-sm text-gray-600 font-medium">
            Paso {currentStep + 1} de {totalSteps}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-lime-neon text-black font-bold rounded-xl hover:brightness-110 transition-all shadow-lg"
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <Check className="w-4 h-4" />
                Finalizar
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm_Padel;