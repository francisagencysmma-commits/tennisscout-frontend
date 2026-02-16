import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileView from './components/ProfileView';
import PublicProfile from './components/PublicProfile';

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

  const renderVideos = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Mis Videos</h2>
            <div className="text-center py-12">
              <p className="text-slate-400 mb-6">Sección de videos en desarrollo</p>
              <button 
                onClick={handleOpenUploadModal}
                className="bg-lime-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-white transition-all"
              >
                Subir Video
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': 
        return <ProfileView playerData={currentUser} onUploadVideo={handleOpenUploadModal} />;
      case 'videos': 
        return renderVideos();
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
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;