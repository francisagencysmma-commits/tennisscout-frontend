import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const OnboardingForm_Complete = ({ initialData, onComplete, onSkip }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.nombre || '',
    dateOfBirth: '',
    country: initialData?.pais || '',
    
    // Posición y técnica
    position: '', // Drive o Revés
    dominantHand: '',
    serveType: '',
    
    // Nivel
    playingLevel: '',
    yearsPlaying: '',
    ranking: '',
    
    // Golpes
    strongestShot: '',
    bestSkills: [],
    weakestShot: '',
    
    // Estilo
    playingStyle: '',
    
    // Físico
    height: '',
    weight: '',
    
    // Competitivo
    hasCompetitiveExperience: false,
    tournamentLevel: '',
    currentClub: '',
    currentCoach: '',
    
    // Entrenamiento
    weeklyHours: '',
    trainingFocus: '',
    
    // Objetivos
    goals: '',
    availability: '',
    weeklyAvailability: []
  });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availabilityGrid, setAvailabilityGrid] = useState([]);

  const skills = ['Red', 'Fondo', 'Control', 'Potencia', 'Velocidad', 'Táctica'];
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const times = ['Mañana', 'Tarde', 'Noche'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => {
      const newSkills = prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill];
      setFormData(f => ({ ...f, bestSkills: newSkills }));
      return newSkills;
    });
  };

  const toggleAvailability = (day, time) => {
    const key = `${day}-${time}`;
    setAvailabilityGrid(prev => {
      const newGrid = prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key];
      setFormData(f => ({ ...f, weeklyAvailability: newGrid }));
      return newGrid;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto z-50">
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <header className="text-center mb-10 relative">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Configura tu Perfil</h1>
            <p className="text-slate-400">Personaliza tu estilo de juego para destacar</p>
            <button 
              onClick={onSkip}
              className="absolute top-0 right-0 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Información Básica */}
            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
              <h2 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-6">📋 Información Básica</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="Alejandro Galán"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">País *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="España"
                  />
                </div>
              </div>
            </section>

            {/* Posición en Pista */}
            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Posición */}
                <div>
                  <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">Posición en Pista *</label>
                  <div className="flex gap-4">
                    {['Drive', 'Revés'].map(pos => (
                      <label key={pos} className={`flex-1 flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.position === pos 
                          ? 'border-lime-400 bg-lime-400/10 text-lime-400' 
                          : 'border-slate-700 text-white hover:bg-slate-700'
                      }`}>
                        <input
                          type="radio"
                          name="position"
                          value={pos}
                          checked={formData.position === pos}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <span className="text-lg font-bold">{pos}</span>
                        <span className="text-xs opacity-70">{pos === 'Drive' ? 'Derecha' : 'Izquierda'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tipo de Saque */}
                <div>
                  <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">Tipo de Saque *</label>
                  <select
                    name="serveType"
                    value={formData.serveType}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Cortado">Saque Cortado (Efecto)</option>
                    <option value="Plano">Saque Plano (Potencia)</option>
                    <option value="Liftado">Saque Liftado</option>
                    <option value="Bandeja">Bandeja Saque</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Habilidades Técnicas */}
            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Golpe Potente */}
                <div>
                  <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">Golpe más Potente *</label>
                  <div className="space-y-3">
                    {[
                      { value: 'Bandeja', desc: 'Control y profundidad táctica' },
                      { value: 'Víbora', desc: 'Efecto lateral agresivo' },
                      { value: 'Remate', desc: 'Potencia para sacar por tres' },
                      { value: 'Volea', desc: 'Reflejos y red' },
                      { value: 'Dejada', desc: 'Precisión y tacto' }
                    ].map(shot => (
                      <label key={shot.value} className={`flex items-center p-4 bg-slate-900/50 rounded-xl border cursor-pointer transition-colors ${
                        formData.strongestShot === shot.value ? 'border-lime-400' : 'border-slate-700 hover:border-lime-400/50'
                      }`}>
                        <input
                          type="radio"
                          name="strongestShot"
                          value={shot.value}
                          checked={formData.strongestShot === shot.value}
                          onChange={handleChange}
                          className="w-5 h-5 text-lime-400 focus:ring-offset-slate-800"
                          required
                        />
                        <div className="ml-4">
                          <span className="block text-white font-medium">{shot.value}</span>
                          <span className="text-xs text-slate-400">{shot.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mejor Habilidad y Área de Mejora */}
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">Mejor Habilidad</label>
                    <div className="grid grid-cols-3 gap-2">
                      {skills.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`py-2 px-1 rounded-lg border text-xs font-bold transition-all uppercase ${
                            selectedSkills.includes(skill)
                              ? 'border-lime-400 bg-lime-400/10 text-lime-400'
                              : 'border-slate-700 text-white hover:bg-slate-700'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-2">Área de mejora</label>
                    <input
                      type="text"
                      name="weakestShot"
                      value={formData.weakestShot}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                      placeholder="Ej: Mi revés de doble mano..."
                    />
                    <p className="mt-2 text-xs text-slate-500 italic">Golpe o situación que más te cuesta</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-2">Estilo de Juego *</label>
                    <select
                      name="playingStyle"
                      value={formData.playingStyle}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Agresivo">Agresivo (ataque constante)</option>
                      <option value="Defensivo">Defensivo (contraataque)</option>
                      <option value="Equilibrado">Equilibrado (versátil)</option>
                      <option value="Táctico">Táctico (cerebral)</option>
                      <option value="Potencia">Potencia pura</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Nivel y Experiencia */}
            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
              <h2 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-6">📊 Nivel y Experiencia</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Nivel Actual *</label>
                  <select
                    name="playingLevel"
                    value={formData.playingLevel}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Competición">Competición</option>
                    <option value="Profesional">Profesional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Años Jugando *</label>
                  <input
                    type="number"
                    name="yearsPlaying"
                    value={formData.yearsPlaying}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Ranking</label>
                  <input
                    type="text"
                    name="ranking"
                    value={formData.ranking}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="#150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Mano *</label>
                  <select
                    name="dominantHand"
                    value={formData.dominantHand}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Diestro">Diestro</option>
                    <option value="Zurdo">Zurdo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="180"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Club Actual</label>
                  <input
                    type="text"
                    name="currentClub"
                    value={formData.currentClub}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="Club Pádel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Entrenador</label>
                  <input
                    type="text"
                    name="currentCoach"
                    value={formData.currentCoach}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    placeholder="Nombre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hasCompetitiveExperience"
                      checked={formData.hasCompetitiveExperience}
                      onChange={handleChange}
                      className="w-5 h-5 text-lime-400 focus:ring-lime-400 border-gray-300 rounded"
                    />
                    <span className="text-sm text-slate-300 font-medium">Tengo experiencia en torneos</span>
                  </label>
                </div>
                {formData.hasCompetitiveExperience && (
                  <div>
                    <select
                      name="tournamentLevel"
                      value={formData.tournamentLevel}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    >
                      <option value="">Nivel de torneos...</option>
                      <option value="Local">Local (club)</option>
                      <option value="Regional">Regional</option>
                      <option value="Nacional">Nacional</option>
                      <option value="Internacional">Internacional</option>
                      <option value="Profesional">Profesional (WPT/APT)</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            {/* Objetivos y Disponibilidad */}
            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Objetivos */}
                <div>
                  <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">Objetivos de Temporada *</label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-4 resize-none"
                    placeholder="¿Qué quieres conseguir? (Ej: Subir ranking, mejorar técnica...)"
                    rows="6"
                  />
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Horas semanales *</label>
                    <input
                      type="number"
                      name="weeklyHours"
                      value={formData.weeklyHours}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                      placeholder="10"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Enfoque *</label>
                    <select
                      name="trainingFocus"
                      value={formData.trainingFocus}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Técnica">Técnica</option>
                      <option value="Físico">Físico</option>
                      <option value="Táctico">Táctico</option>
                      <option value="Mental">Mental</option>
                      <option value="Equilibrado">Equilibrado</option>
                    </select>
                  </div>
                </div>

                {/* Disponibilidad Grid */}
                <div>
                  <label className="block text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">Disponibilidad Semanal</label>
                  <div className="grid grid-cols-8 gap-1 bg-slate-900 p-3 rounded-xl border border-slate-700 overflow-hidden">
                    {/* Header */}
                    <div className="text-[10px] text-slate-500 flex items-center justify-center">Hora</div>
                    {days.map(day => (
                      <div key={day} className="text-[10px] text-slate-400 font-bold text-center">{day}</div>
                    ))}
                    
                    {/* Rows */}
                    {times.map(time => (
                      <React.Fragment key={time}>
                        <div className="text-[10px] text-slate-500 py-2 border-t border-slate-800 flex items-center justify-center">
                          {time}
                        </div>
                        {days.map(day => {
                          const key = `${day}-${time}`;
                          const isActive = availabilityGrid.includes(key);
                          return (
                            <div
                              key={key}
                              onClick={() => toggleAvailability(day, time)}
                              className={`border-t border-slate-800 rounded-sm cursor-pointer transition-all ${
                                isActive ? 'bg-lime-400 hover:bg-lime-500' : 'hover:bg-slate-700'
                              }`}
                            />
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-500 text-right italic">Click para marcar disponibilidad</p>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Disponibilidad general *</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Tiempo completo">Tiempo completo</option>
                      <option value="Parcial">Parcial (20h+)</option>
                      <option value="Fines de semana">Fines de semana</option>
                      <option value="Flexible">Flexible</option>
                      <option value="Limitada">Limitada</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <footer className="flex items-center justify-end gap-4 pb-12">
              <button
                type="button"
                onClick={onSkip}
                className="px-6 py-3 text-slate-400 font-bold hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-10 py-3 bg-lime-400 text-slate-900 font-black rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all uppercase tracking-widest flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Guardar Perfil
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm_Complete;