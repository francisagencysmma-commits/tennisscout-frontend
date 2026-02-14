import React from 'react';
import { Mail, FileDown, Share2, Phone } from 'lucide-react';

const ActionButtons = ({ playerData }) => {
  const handleContactAcademy = () => {
    alert(`Contactando con ${playerData.contact.academy}...`);
  };

  const handleExportPDF = () => {
    alert('Generando PDF del perfil...');
  };

  const handleShare = () => {
    alert('Compartiendo perfil...');
  };

  const handleCall = () => {
    alert(`Llamando a ${playerData.contact.coach}...`);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Acciones Rápidas</h3>
      
      <div className="space-y-3">
        <button
          onClick={handleContactAcademy}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Mail className="w-5 h-5" />
          Contactar Academia
        </button>

        <button
          onClick={handleExportPDF}
          className="w-full bg-white hover:bg-slate-50 text-slate-900 px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-primary-400 transition-all duration-300"
        >
          <FileDown className="w-5 h-5" />
          Exportar PDF
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
            Compartir
          </button>

          <button
            onClick={handleCall}
            className="bg-tennis-green hover:bg-tennis-green/90 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            Llamar
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Información de Contacto</h4>
        <div className="space-y-2 text-sm text-slate-600">
          <p><span className="font-medium">Academia:</span> {playerData.contact.academy}</p>
          <p><span className="font-medium">Entrenador:</span> {playerData.contact.coach}</p>
          <p><span className="font-medium">Email:</span> {playerData.contact.email}</p>
          <p><span className="font-medium">Teléfono:</span> {playerData.contact.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
