import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicProfile from './components/PublicProfile';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import Landing from './components/Landing';
import ProfileView from './components/ProfileView';
import UploadVideo from './components/UploadVideo';
import PlayersList from './components/PlayersList';
import { Video, Upload, X, Calendar, Eye } from 'lucide-react';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [videoTab, setVideoTab] = useState('mis-videos');
  const [showLanding, setShowLanding] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const player = localStorage.getItem('player');
    if (token && player) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(player));
      setShowLanding(false);
    }
  }, []);

  const handleAuthSuccess = async (player) => {
    setIsAuthenticated(true);
    setCurrentUser(player);
    
    try {
      const response = await fetch(`https://tennisscout-backend.onrender.com/api/players/${player._id || player.id}`);
      const fullPlayerData = await response.json();
      setCurrentUser(fullPlayerData);
      localStorage.setItem('player', JSON.stringify(fullPlayerData));
    } catch (error) {
      console.error('Error cargando datos del jugador:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowLanding(true);
  };

  const loadVideos = async () => {
    setLoadingVideos(true);
    console.log('=== CARGANDO VIDEOS ===');
    try {
      const response = await fetch('https://tennisscout-backend.onrender.com/api/videos');
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Videos recibidos:', data);
      console.log('Total videos:', Array.isArray(data) ? data.length : 0);
      
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando videos:', error);
      setVideos([]);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Usuario autenticado, cargando videos...');
      loadVideos();
    }
  }, [isAuthenticated]);

  if (showLanding && !isAuthenticated) {
    return <Landing onLoginClick={() => setShowLanding(false)} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const handleOpenUploadModal = () => {
    console.log('Abriendo modal de upload');
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    console.log('Cerrando modal de upload');
    setShowUploadModal(false);
  };

  const handleVideoUploadSuccess = async (newVideo) => {
    console.log('=== VIDEO SUBIDO CON ÉXITO ===');
    console.log('Nuevo video:', newVideo);
    
    // Cerrar modal
    setShowUploadModal(false);
    
    // Esperar 1 segundo y recargar
    setTimeout(async () => {
      console.log('Recargando lista de videos...');
      await loadVideos();
      
      // Si estamos en profile, cambiar a videos
      if (activeSection === 'profile') {
        setActiveSection('videos');
        setVideoTab('mis-videos');
      }
    }, 1000);
  };

  const renderVideos = () => {
    console.log('=== RENDERIZANDO VIDEOS ===');
    console.log('Current User ID:', currentUser?._id);
    console.log('Total videos en state:', videos.length);
    
    const videosToShow = videoTab === 'mis-videos' 
      ? videos.filter(video => {
          const videoPlayerId = video.jugadorId?._id || video.jugadorId;
          const match = videoPlayerId === currentUser?._id;
          console.log(`Video ${video._id}: jugadorId=${videoPlayerId}, match=${match}`);
          return match;
        })
      : videos;

    console.log('Videos a mostrar:', videosToShow.length);

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-black">Videos</h2>
          <button 
            onClick={handleOpenUploadModal}
            className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 bg-lime-neon text-black hover:brightness-105 transition-all"
          >
            <Upload className="w-4 h-4" />
            Subir Video
          </button>
        </div>

        <div className="flex gap-4 border-b-2 border-gray-200">
          <button 
            onClick={() => setVideoTab('mis-videos')} 
            className={`px-6 py-3 font-bold transition-all relative ${
              videoTab === 'mis-videos' ? 'text-black' : 'text-gray-400'
            }`}
          >
            Mis Videos
            {videoTab === 'mis-videos' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-neon"></div>
            )}
          </button>
          <button 
            onClick={() => setVideoTab('explorar')} 
            className={`px-6 py-3 font-bold transition-all relative ${
              videoTab === 'explorar' ? 'text-black' : 'text-gray-400'
            }`}
          >
            Explorar Videos
            {videoTab === 'explorar' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-neon"></div>
            )}
          </button>
        </div>

        {loadingVideos ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-lime-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando videos...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosToShow.length > 0 ? (
              videosToShow.map((video) => (
                <div key={video._id} className="bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform border-2 border-gray-200 shadow-lg">
                  <div className="relative aspect-video bg-gray-200">
                    {video.url ? (
                      <video src={video.url} className="w-full h-full object-cover" controls />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-bold mb-2 text-black">{video.titulo}</h4>
                    {video.descripcion && (
                      <p className="text-sm text-gray-600 mb-2">{video.descripcion}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(video.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {video.vistas || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-2xl border-2 border-gray-200">
                <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="mb-4 text-gray-600 font-medium">
                  {videoTab === 'mis-videos' ? 'No has subido videos aún' : 'No hay videos disponibles'}
                </p>
                {videoTab === 'mis-videos' && (
                  <button 
                    onClick={handleOpenUploadModal}
                    className="px-6 py-3 rounded-xl font-bold bg-lime-neon text-black hover:brightness-105 transition-all"
                  >
                    Subir tu primer video
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': 
        return <ProfileView playerData={currentUser} onUploadVideo={handleOpenUploadModal} />;
      case 'videos': 
        return renderVideos();
      case 'explore': 
        return (<div className="animate-fadeIn"><PlayersList /></div>);
      default: 
        return <ProfileView playerData={currentUser} onUploadVideo={handleOpenUploadModal} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
  activeSection={activeSection} 
  setActiveSection={setActiveSection}
/>
      
      <main className="flex-1 flex flex-col">
        <Header playerData={currentUser} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {renderSection()}
          </div>
          
          <Footer />
        </div>
      </main>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-lime-neon shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-black">Subir Video</h2>
                <button 
                  onClick={handleCloseUploadModal}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <UploadVideo 
                playerId={currentUser?._id} 
                onUploadSuccess={handleVideoUploadSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;