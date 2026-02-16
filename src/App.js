import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileView from './components/ProfileView';
import VideosSection from './components/VideosSection';
import PublicProfile from './components/PublicProfile';
import UploadVideoModal from './components/Uploadvideomodal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const playerData = localStorage.getItem('player');
    
    if (token && playerData) {
      try {
        const player = JSON.parse(playerData);
        setCurrentUser(player);
        setIsAuthenticated(true);
        console.log('Usuario autenticado:', player);
      } catch (error) {
        console.error('Error parsing player data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('player');
      }
    }
  }, []);

  const handleAuthSuccess = (playerData) => {
    setCurrentUser(playerData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveSection('profile');
  };

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleVideoUploaded = () => {
    setShowUploadModal(false);
    // Recargar la sección de videos si estamos en ella
    if (activeSection === 'videos') {
      window.location.reload();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': 
        return <ProfileView playerData={currentUser} onUploadVideo={handleOpenUploadModal} />;
      case 'videos': 
        return <VideosSection currentUser={currentUser} />;
      default: 
        return <ProfileView playerData={currentUser} onUploadVideo={handleOpenUploadModal} />;
    }
  };

  return (
    <Router>
      <Routes>
        {/* Ruta pública para perfiles compartidos */}
        <Route path="/player/:id" element={<PublicProfile />} />
        
        {/* Ruta principal */}
        <Route path="/*" element={
          <>
            {!isAuthenticated ? (
              showAuthModal || isAuthenticated === false ? (
                <Auth onAuthSuccess={handleAuthSuccess} />
              ) : (
                <Landing onLoginClick={() => setShowAuthModal(true)} />
              )
            ) : (
              /* Layout principal con sidebar */
              <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Sidebar */}
                <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                
                {/* Main content area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Header */}
                  <Header playerData={currentUser} onLogout={handleLogout} />
                  
                  {/* Content */}
                  <main className="flex-1 overflow-y-auto">
                    {renderSection()}
                  </main>
                </div>
              </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
              <UploadVideoModal 
                onClose={() => setShowUploadModal(false)}
                onVideoUploaded={handleVideoUploaded}
              />
            )}
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;