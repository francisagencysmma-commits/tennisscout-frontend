import React, { useState, useEffect } from 'react';
import { Play, Upload, Calendar, Eye, Plus, Search, Filter } from 'lucide-react';
import UploadVideoModal from './Uploadvideomodal';

const VideosSection = ({ currentUser }) => {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('mis-videos'); // 'mis-videos' o 'explorar'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://tennisscout-backend.onrender.com/api/videos');
      const allVids = await response.json();
      
      setAllVideos(allVids);
      
      // Filtrar videos del usuario actual
      const userVideos = allVids.filter(video => 
        (video.jugadorId?._id || video.jugadorId) === currentUser._id
      );
      setVideos(userVideos);
    } catch (error) {
      console.error('Error cargando videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUploaded = () => {
    loadVideos();
    setShowUploadModal(false);
  };

  const filteredVideos = activeTab === 'mis-videos' 
    ? videos 
    : allVideos.filter(v => 
        (v.jugadorId?._id || v.jugadorId) !== currentUser._id &&
        (v.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         v.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">Videos de Pádel</h1>
            <p className="text-slate-400">Comparte y descubre jugadas increíbles</p>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-lime-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-white transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Subir Video
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('mis-videos')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'mis-videos'
                ? 'bg-lime-400 text-slate-900'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            Mis Videos ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('explorar')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'explorar'
                ? 'bg-lime-400 text-slate-900'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            Explorar ({allVideos.filter(v => (v.jugadorId?._id || v.jugadorId) !== currentUser._id).length})
          </button>
        </div>

        {/* Search (solo en explorar) */}
        {activeTab === 'explorar' && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl text-white focus:ring-lime-400 focus:border-lime-400 p-3 pl-12"
              />
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Cargando videos...</p>
          </div>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video._id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-lime-400/50 transition-all group">
                <div className="relative aspect-video bg-black">
                  <video 
                    src={video.url} 
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  />
                </div>
                
                <div className="p-4">
                  <h4 className="font-bold text-white mb-2 line-clamp-2">{video.titulo}</h4>
                  {video.descripcion && (
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{video.descripcion}</p>
                  )}
                  
                  {/* Jugador info (solo en explorar) */}
                  {activeTab === 'explorar' && video.jugadorId && (
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900">
                          {(video.jugadorId.nombre || video.jugadorId.fullName || 'U').charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-slate-300 font-medium">
                        {video.jugadorId.nombre || video.jugadorId.fullName || 'Jugador'}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(video.createdAt).toLocaleDateString('es-ES')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.vistas || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm border-2 border-dashed border-slate-700 rounded-xl">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {activeTab === 'mis-videos' ? 'No hay videos aún' : 'No se encontraron videos'}
            </h3>
            <p className="text-slate-400 mb-6">
              {activeTab === 'mis-videos' 
                ? 'Sube tu primer video para comenzar' 
                : 'Intenta con otra búsqueda'}
            </p>
            {activeTab === 'mis-videos' && (
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-lime-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-white transition-all"
              >
                Subir Video
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadVideoModal 
          onClose={() => setShowUploadModal(false)}
          onVideoUploaded={handleVideoUploaded}
        />
      )}
    </div>
  );
};

export default VideosSection;