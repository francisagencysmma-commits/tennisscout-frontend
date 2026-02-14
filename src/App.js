import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import PlayersList from './components/PlayersList';
import UploadVideo from './components/UploadVideo';
import { playerData } from './data/playerData';
import { Trophy, TrendingUp, DollarSign, Award, Calendar, User, Clock, Target, Zap, Activity, Video, Eye, Star, HardDrive, Filter, Play, Download, Share2, Upload, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Landing from './components/Landing';

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
    }
  }, []);

  const handleAuthSuccess = async (player) => {
    setIsAuthenticated(true);
    setCurrentUser(player);
    
    try {
      const response = await fetch(`https://tennisscout-backend.onrender.com/api/players/${player.id}`);
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
  };

  const loadVideos = async () => {
    try {
      const response = await fetch('https://tennisscout-backend.onrender.com/api/videos');
      const data = await response.json();
      console.log('Videos cargados:', data);
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

  const renderProfile = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-dark-100">
              <img 
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                alt="Match highlight"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-4 left-4">
                <span className="glass px-3 py-1.5 rounded-lg text-sm font-medium text-dark-700">
                  Featured Highlight
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-dark-800 mb-6">Match Highlights</h3>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-serif font-semibold text-dark-800 mb-6">Power Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={[
              { skill: 'Serve', value: 85 },
              { skill: 'Consistency', value: 78 },
              { skill: 'Footwork', value: 92 },
              { skill: 'Mental', value: 88 },
              { skill: 'Volleys', value: 75 },
            ]}>
              <PolarGrid stroke="#3f3f46" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: '#a1a1aa', fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar 
                dataKey="value" 
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 hover:bg-dark-100 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center border border-orange-500/30">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-sm text-dark-500">Avg. Serve Speed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">195</span>
            <span className="text-lg text-dark-500">km/h</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+8%</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 hover:bg-dark-100 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center border border-amber-500/30">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm text-dark-500">Win Rate</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">78</span>
            <span className="text-lg text-dark-500">%</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12%</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 hover:bg-dark-100 transition-all group">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center border border-red-500/30">
              <Activity className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-sm text-dark-500">Forehand RPM</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">2,900</span>
            <span className="text-lg text-dark-500">rpm</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+5%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStats = () => {
    const performanceData = [
      { month: 'Jan', serveSpeed: 185, winRate: 65 },
      { month: 'Feb', serveSpeed: 187, winRate: 68 },
      { month: 'Mar', serveSpeed: 190, winRate: 72 },
      { month: 'Apr', serveSpeed: 192, winRate: 75 },
      { month: 'May', serveSpeed: 193, winRate: 76 },
      { month: 'Jun', serveSpeed: 195, winRate: 78 },
    ];

    const shotData = [
      { name: 'Forehand', value: 42, color: '#22c55e' },
      { name: 'Backhand', value: 28, color: '#f59e0b' },
      { name: 'Serve', value: 18, color: '#a78bfa' },
      { name: 'Volley', value: 12, color: '#60a5fa' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-primary-400" />
              <span className="text-sm text-dark-500">Total Matches</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">156</span>
              <span className="text-sm text-primary-500 font-medium">+24</span>
            </div>
            <p className="text-xs text-dark-400 mt-2">Last 6 months</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary-400" />
              <span className="text-sm text-dark-500">Avg Match Duration</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">2h 18m</span>
              <span className="text-sm text-dark-400">-12m</span>
            </div>
            <p className="text-xs text-dark-400 mt-2">Per match</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-primary-400" />
              <span className="text-sm text-dark-500">Break Points Won</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">64%</span>
              <span className="text-sm text-primary-500 font-medium">+8%</span>
            </div>
            <p className="text-xs text-dark-400 mt-2">Success rate</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-primary-400" />
              <span className="text-sm text-dark-500">Peak Performance</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">94/100</span>
              <span className="text-sm text-primary-500 font-medium">+6</span>
            </div>
            <p className="text-xs text-dark-400 mt-2">Performance index</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-serif font-semibold text-dark-800 mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="month" stroke="#a1a1aa" style={{ fontSize: '12px' }} />
                <YAxis stroke="#a1a1aa" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#27272a', 
                    border: '1px solid #3f3f46',
                    borderRadius: '8px',
                    color: '#fafafa'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="serveSpeed" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 4 }}
                  name="Serve Speed"
                />
                <Line 
                  type="monotone" 
                  dataKey="winRate" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', r: 4 }}
                  name="Win Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-serif font-semibold text-dark-800 mb-6">Shot Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={shotData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {shotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#27272a', 
                    border: '1px solid #3f3f46',
                    borderRadius: '8px',
                    color: '#fafafa'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif font-semibold text-dark-800">Match Intensity Analysis</h3>
            <div className="flex gap-4">
              <span className="text-sm text-dark-500">Heart Rate</span>
              <span className="text-sm text-dark-500">Intensity</span>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-r from-primary-600/20 to-primary-800/20 rounded-xl border border-primary-500/30"></div>
        </div>
      </div>
    );
  };
  const renderVideos = () => {
    const videosToShow = videoTab === 'mis-videos' 
      ? videos.filter(video => video.jugadorId?._id === currentUser?.id || video.jugadorId === currentUser?.id)
      : videos;

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full px-4 py-2.5 bg-dark-100 border border-dark-200 text-dark-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 shadow-glow"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Subir Video</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 glass hover:bg-dark-100 rounded-xl">
              <Filter className="w-4 h-4 text-dark-600" />
              <span className="text-sm font-medium text-dark-700">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-4 border-b border-dark-200">
          <button 
            onClick={() => setVideoTab('mis-videos')}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              videoTab === 'mis-videos'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-dark-500 hover:text-dark-700'
            }`}
          >
            Mis Videos
          </button>
          <button 
            onClick={() => setVideoTab('explorar')}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              videoTab === 'explorar'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-dark-500 hover:text-dark-700'
            }`}
          >
            Explorar Todos
          </button>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-dark-100 text-dark-800 rounded-lg text-sm font-medium">
            All Videos <span className="ml-1 text-dark-500">({videosToShow.length})</span>
          </button>
          <button className="px-4 py-2 text-dark-500 hover:bg-dark-100 rounded-lg text-sm font-medium">
            Serves <span className="ml-1 text-dark-400">(0)</span>
          </button>
          <button className="px-4 py-2 text-dark-500 hover:bg-dark-100 rounded-lg text-sm font-medium">
            Rallies <span className="ml-1 text-dark-400">(0)</span>
          </button>
          <button className="px-4 py-2 text-dark-500 hover:bg-dark-100 rounded-lg text-sm font-medium">
            Match Highlights <span className="ml-1 text-dark-400">(0)</span>
          </button>
          <button className="px-4 py-2 text-dark-500 hover:bg-dark-100 rounded-lg text-sm font-medium">
            Training <span className="ml-1 text-dark-400">(0)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosToShow.length > 0 ? (
            videosToShow.map((video, index) => (
              <div key={video._id} className="glass rounded-2xl overflow-hidden hover:bg-dark-100 transition-all group">
                <div className="relative aspect-video bg-dark-200">
                  {video.url ? (
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-dark-100">
                      <Video className="w-12 h-12 text-dark-400" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                    {video.duracion || '0:00'}
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-1 glass px-2 py-1 rounded">
                    <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                    <span className="text-xs font-medium text-dark-700">{video.rating || 0}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-dark-800 mb-2 group-hover:text-primary-400 transition-colors">
                    {video.titulo}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-dark-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {video.vistas || 0}
                    </span>
                  </div>
                  
                  {video.tags && video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {video.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-primary-600/20 text-primary-400 rounded text-xs border border-primary-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-3 border-t border-dark-200">
                    <button className="flex items-center gap-1.5 text-sm text-dark-500 hover:text-primary-400 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-dark-500 hover:text-primary-400 transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Video className="w-16 h-16 text-dark-300 mx-auto mb-4" />
              <p className="text-dark-500 mb-4">
                {videoTab === 'mis-videos' ? 'No has subido videos aún' : 'No hay videos disponibles'}
              </p>
              {videoTab === 'mis-videos' && (
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-glow"
                >
                  Subir tu primer video
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6 text-center">
            <Video className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-dark-800 mb-1">
              {videoTab === 'mis-videos' 
                ? videos.filter(v => v.jugadorId?._id === currentUser?.id || v.jugadorId === currentUser?.id).length
                : videos.length
              }
            </div>
            <div className="text-sm text-dark-500">
              {videoTab === 'mis-videos' ? 'Mis Videos' : 'Total Videos'}
            </div>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <Eye className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-dark-800 mb-1">
              {videosToShow.reduce((acc, v) => acc + (v.vistas || 0), 0)}
            </div>
            <div className="text-sm text-dark-500">Total Views</div>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <Star className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-dark-800 mb-1">
              {videosToShow.length > 0 
                ? (videosToShow.reduce((acc, v) => acc + (v.rating || 0), 0) / videosToShow.length).toFixed(1)
                : '0'
              }/5
            </div>
            <div className="text-sm text-dark-500">Avg. Rating</div>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center">
            <HardDrive className="w-10 h-10 text-primary-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-dark-800 mb-1">0 GB</div>
            <div className="text-sm text-dark-500">Storage Used</div>
          </div>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-serif font-bold text-dark-800">Subir Video</h2>
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="text-dark-400 hover:text-dark-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <UploadVideo 
                  playerId={currentUser?.id} 
                  onUploadSuccess={(video) => {
                    setShowUploadModal(false);
                    loadVideos();
                    setTimeout(() => {
                      loadVideos();
                    }, 1000);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTournaments = () => {
    const tournaments = [
      {
        name: 'Spanish Junior Open',
        result: 'Winner',
        location: 'Barcelona, Spain',
        date: 'Jun 15, 2024',
        surface: 'Clay',
        level: 'Grade 1',
        points: 250,
        prize: '€5,000',
        matches: 7,
        winRate: '100% win rate',
        medal: '🥇'
      },
      {
        name: 'European Junior Masters',
        result: 'Runner-up',
        location: 'Paris, France',
        date: 'May 28, 2024',
        surface: 'Clay',
        level: 'Grade A',
        points: 180,
        prize: '€3,000',
        matches: 6,
        winRate: '83% win rate',
        medal: '🥈'
      },
      {
        name: 'Mediterranean Cup',
        result: 'Semi-Final',
        location: 'Rome, Italy',
        date: 'May 10, 2024',
        surface: 'Clay',
        level: 'Grade 2',
        points: 120,
        prize: '€1,500',
        matches: 5,
        winRate: '80% win rate',
        medal: '#4'
      },
    ];

    const achievements = [
      {
        icon: '📈',
        title: 'Most Improved Player',
        org: 'Spanish Tennis Federation',
        year: '2024',
        color: 'from-green-600/20 to-emerald-600/20 border-green-500/30'
      },
      {
        icon: '🏆',
        title: 'Top 10 Junior Ranking',
        org: 'ITF Juniors',
        year: '2024',
        color: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30'
      },
      {
        icon: '🎯',
        title: 'Best Serve Award',
        org: 'European Junior Circuit',
        year: '2024',
        color: 'from-amber-600/20 to-yellow-600/20 border-amber-500/30'
      },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Trophy className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm text-dark-500">Tournaments</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">24</span>
              <span className="text-sm text-primary-500 font-medium">+6</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center border border-green-500/30">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-sm text-dark-500">Win Rate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">78%</span>
              <span className="text-sm text-primary-500 font-medium">+5%</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-sm text-dark-500">Prize Money</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">€32K</span>
              <span className="text-sm text-primary-500 font-medium">+€8K</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-sm text-dark-500">Points</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-dark-800">1,450</span>
              <span className="text-sm text-primary-500 font-medium">+250</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-serif font-semibold text-dark-800 mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-gradient-to-br ${achievement.color} border rounded-xl p-6`}>
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="font-semibold text-dark-800 mb-2">{achievement.title}</h4>
                <p className="text-sm text-dark-600">{achievement.org}</p>
                <p className="text-sm text-dark-500">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 border-b border-dark-200">
          <button className="px-4 py-3 text-sm font-medium text-primary-500 border-b-2 border-primary-500">
            Completed Tournaments
          </button>
          <button className="px-4 py-3 text-sm font-medium text-dark-500 hover:text-dark-700">
            Upcoming Tournaments
          </button>
        </div>

        <div className="space-y-4">
          {tournaments.map((tournament, index) => (
            <div key={index} className="glass rounded-2xl p-6 hover:bg-dark-100 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-serif font-bold text-dark-800">{tournament.name}</h4>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                      tournament.result === 'Winner' ? 'bg-green-600/20 text-green-400 border-green-500/30' :
                      tournament.result === 'Runner-up' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' :
                      'bg-dark-100 text-dark-600 border-dark-200'
                    }`}>
                      {tournament.result}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-dark-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <span>📍</span>
                      {tournament.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {tournament.date}
                    </span>
                    <span>Surface: <span className="font-medium text-dark-700">{tournament.surface}</span></span>
                    <span>Level: <span className="font-medium text-dark-700">{tournament.level}</span></span>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1.5 text-dark-500">
                      <Trophy className="w-4 h-4" />
                      <span className="font-medium text-dark-700">{tournament.points} pts</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-dark-500">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium text-dark-700">{tournament.prize}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-dark-500">
                      <User className="w-4 h-4" />
                      <span className="font-medium text-dark-700">{tournament.matches} matches</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-dark-500">
                      <Target className="w-4 h-4" />
                      <span className="font-medium text-dark-700">{tournament.winRate}</span>
                    </span>
                  </div>
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center text-3xl shadow-glow">
                  {tournament.medal}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfile();
      case 'stats':
        return renderStats();
      case 'videos':
        return renderVideos();
      case 'tournaments':
        return renderTournaments();
      case 'explore':
        return (
          <div className="animate-fadeIn">
            <PlayersList />
          </div>
        );
      default:
        return renderProfile();
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 flex flex-col">
        <Header playerData={currentUser} onLogout={handleLogout} />
        
        <div className="flex-1 px-8 pb-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
