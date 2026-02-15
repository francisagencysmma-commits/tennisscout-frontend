import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import Landing from './components/Landing';
import Footer from './components/Footer';
import ProfileView from './components/ProfileView';
import UploadVideo from './components/UploadVideo';
import PlayersList from './components/PlayersList';
import { Video, Upload, X, Calendar, Eye } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [videoTab, setVideoTab] = useState('mis-videos');
  const [showLanding, setShowLanding] = useState(true);

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
    try {
      const response = await fetch('https://tennisscout-backend.onrender.com/api/videos');
      const data = await response.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error cargando videos:', error);
      setVideos([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadVideos();
    }
  }, [isAuthenticated]);

  if (showLanding && !isAuthenticated) {
    return <Landing onLoginClick={() => setShowLanding(false)} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const renderVideos = () => {
    const videosToShow = videoTab === 'mis-videos' 
      ? videos.filter(video => video.jugadorId?._id === currentUser?._id || video.jugadorId === currentUser?._id)
      : videos;

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold" style={{color: '#000'}}>Videos</h2>
          <button 
            onClick={() => setShowUploadModal(true)} 
            className="px-6 py-3 rounded-xl font-bold flex items-center gap-2"
            style={{backgroundColor: '#cdff00', color: '#000'}}
          >
            <Upload className="w-4 h-4" />
            Subir Video
          </button>
        </div>

        <div className="flex gap-4" style={{borderBottom: '2px solid #e5e5e5'}}>
          <button 
            onClick={() => setVideoTab('mis-videos')} 
            className={`px-6 py-3 font-bold transition-all relative`}
            style={{color: videoTab === 'mis-videos' ? '#000' : '#999'}}
          >
            Mis Videos
            {videoTab === 'mis-videos' && (
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{backgroundColor: '#cdff00'}}></div>
            )}
          </button>
          <button 
            onClick={() => setVideoTab('explorar')} 
            className={`px-6 py-3 font-bold transition-all relative`}
            style={{color: videoTab === 'explorar' ? '#000' : '#999'}}
          >
            Explorar Videos
            {videoTab === 'explorar' && (
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{backgroundColor: '#cdff00'}}></div>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosToShow.length > 0 ? (
            videosToShow.map((video) => (
              <div key={video._id} className="bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform border-2" style={{borderColor: '#e5e5e5'}}>
                <div className="relative aspect-video" style={{backgroundColor: '#f5f5f5'}}>
                  {video.url ? (
                    <video src={video.url} className="w-full h-full object-cover" controls />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12" style={{color: '#999'}} />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="font-bold mb-2" style={{color: '#000'}}>{video.titulo}</h4>
                  <div className="flex items-center gap-4 text-sm" style={{color: '#666'}}>
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
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border-2" style={{borderColor: '#e5e5e5'}}>
              <Video className="w-16 h-16 mx-auto mb-4" style={{color: '#999'}} />
              <p className="mb-4" style={{color: '#666'}}>
                {videoTab === 'mis-videos' ? 'No has subido videos aún' : 'No hay videos disponibles'}
              </p>
              {videoTab === 'mis-videos' && (
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-3 rounded-xl font-bold"
                  style={{backgroundColor: '#cdff00', color: '#000'}}
                >
                  Subir tu primer video
                </button>
              )}
            </div>
          )}
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2" style={{borderColor: '#cdff00'}}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold" style={{color: '#000'}}>Subir Video</h2>
                  <button onClick={() => setShowUploadModal(false)} style={{color: '#999'}}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <UploadVideo 
                  playerId={currentUser?._id} 
                  onUploadSuccess={(video) => { 
                    setShowUploadModal(false); 
                    loadVideos(); 
                  }} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': 
        return <ProfileView playerData={currentUser} onUploadVideo={() => setShowUploadModal(true)} />;
      case 'videos': 
        return renderVideos();
      case 'explore': 
        return (<div className="animate-fadeIn"><PlayersList /></div>);
      default: 
        return <ProfileView playerData={currentUser} onUploadVideo={() => setShowUploadModal(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen" style={{backgroundColor: '#f5f5f5'}}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 flex flex-col">
        <Header playerData={currentUser} onLogout={handleLogout} />
        
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {renderSection()}
          </div>
          
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;