import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import PlayersList from './components/PlayersList';
import UploadVideo from './components/UploadVideo';
import { playerData } from './data/playerData';
import { Trophy, TrendingUp, DollarSign, Award, Calendar, User, Clock, Target, Zap, Activity, Video, Eye, Star, HardDrive, Filter, Play, Download, Share2, Upload, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Verificar si hay usuario logueado al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const player = localStorage.getItem('player');
    if (token && player) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(player));
    }
  }, []);

  const handleAuthSuccess = (player) => {
    setIsAuthenticated(true);
    setCurrentUser(player);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const loadVideos = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/videos');
    const data = await response.json();
    // Asegurarse de que data sea un array
    setVideos(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error cargando videos:', error);
    setVideos([]); // Si hay error, array vacío
  }
};

  useEffect(() => {
    if (isAuthenticated) {
      loadVideos();
    }
  }, [isAuthenticated]);

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Render Home/Profile Section (Pantalla 4 - Power Analysis)
  const renderProfile = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Video + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Video */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                alt="Match highlight"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                  Featured Highlight
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Match Highlights</h3>
            </div>
          </div>
        </div>

        {/* Power Analysis Radar */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-6">Power Analysis</h3>
          
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={[
              { skill: 'Serve Power', value: 85 },
              { skill: 'Consistency', value: 78 },
              { skill: 'Footwork', value: 92 },
              { skill: 'Mental', value: 88 },
              { skill: 'Volleys', value: 75 },
            ]}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar 
                dataKey="value" 
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.5}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Avg. Serve Speed</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">195</span>
            <span className="text-lg text-gray-500">km/h</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+8%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-600">Win Rate</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">78</span>
            <span className="text-lg text-gray-500">%</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Forehand RPM</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">2,900</span>
            <span className="text-lg text-gray-500">rpm</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+5%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Stats Section (Pantalla 3)
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
      { name: 'Forehand', value: 42, color: '#15803d' },
      { name: 'Backhand', value: 28, color: '#ca8a04' },
      { name: 'Serve', value: 18, color: '#7c3aed' },
      { name: 'Volley', value: 12, color: '#22c55e' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Total Matches</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">156</span>
              <span className="text-sm text-primary-600 font-medium">+24</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last 6 months</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Avg Match Duration</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">2h 18m</span>
              <span className="text-sm text-gray-400">-12m</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Per match</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Break Points Won</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">64%</span>
              <span className="text-sm text-primary-600 font-medium">+8%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Success rate</p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Peak Performance</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">94/100</span>
              <span className="text-sm text-primary-600 font-medium">+6</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Performance index</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="serveSpeed" 
                  stroke="#15803d" 
                  strokeWidth={3}
                  dot={{ fill: '#15803d', r: 4 }}
                  name="Serve Speed"
                />
                <Line 
                  type="monotone" 
                  dataKey="winRate" 
                  stroke="#ca8a04" 
                  strokeWidth={3}
                  dot={{ fill: '#ca8a04', r: 4 }}
                  name="Win Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Shot Distribution */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="text-lg font-serif font-semibold text-gray-900 mb-6">Shot Distribution</h3>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Match Intensity */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif font-semibold text-gray-900">Match Intensity Analysis</h3>
            <div className="flex gap-4">
              <span className="text-sm text-gray-600">Heart Rate</span>
              <span className="text-sm text-gray-600">Intensity</span>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl"></div>
        </div>
      </div>
    );
  };

  // Render Videos Section (Pantalla 2)
  const renderVideos = () => {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Subir Video</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium">
            All Videos <span className="ml-1 text-gray-500">({videos.length})</span>
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
            Serves <span className="ml-1 text-gray-400">(0)</span>
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
            Rallies <span className="ml-1 text-gray-400">(0)</span>
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
            Match Highlights <span className="ml-1 text-gray-400">(0)</span>
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
            Training <span className="ml-1 text-gray-400">(0)</span>
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={video._id} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-200">
                  {video.url ? (
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Video className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                    {video.duracion || '0:00'}
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium">{video.rating || 0}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{video.titulo}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 ml-auto">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No hay videos aún</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Subir tu primer video
              </button>
            </div>
          )}
        </div>

        {/* Video Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <Video className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{videos.length}</div>
            <div className="text-sm text-gray-600">Total Videos</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <Eye className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {videos.reduce((acc, v) => acc + (v.vistas || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <Star className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {videos.length > 0 
                ? (videos.reduce((acc, v) => acc + (v.rating || 0), 0) / videos.length).toFixed(1)
                : '0'
              }/5
            </div>
            <div className="text-sm text-gray-600">Avg. Rating</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-card p-6 text-center">
            <HardDrive className="w-10 h-10 text-primary-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">0 GB</div>
            <div className="text-sm text-gray-600">Storage Used</div>
          </div>
        </div>

        {/* Modal de Subir Video */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">Subir Video</h2>
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <UploadVideo 
  playerId={currentUser?.id} 
  onUploadSuccess={(video) => {
    setShowUploadModal(false);
    loadVideos(); // Recargar videos
    setTimeout(() => {
      loadVideos(); // Recargar de nuevo después de 1 segundo
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

  // Render Tournaments Section (Pantalla 1)
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
        color: 'from-green-50 to-emerald-50'
      },
      {
        icon: '🏆',
        title: 'Top 10 Junior Ranking',
        org: 'ITF Juniors',
        year: '2024',
        color: 'from-blue-50 to-cyan-50'
      },
      {
        icon: '🎯',
        title: 'Best Serve Award',
        org: 'European Junior Circuit',
        year: '2024',
        color: 'from-amber-50 to-yellow-50'
      },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Tournaments Played</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">24</span>
              <span className="text-sm text-primary-600 font-medium">+6</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Career Win Rate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">78%</span>
              <span className="text-sm text-primary-600 font-medium">+5%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-gray-600">Total Prize Money</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">€32K</span>
              <span className="text-sm text-primary-600 font-medium">+€8K</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Ranking Points</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">1,450</span>
              <span className="text-sm text-primary-600 font-medium">+250</span>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-6">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-gradient-to-br ${achievement.color} rounded-xl p-6`}>
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.org}</p>
                <p className="text-sm text-gray-500">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          <button className="px-4 py-3 text-sm font-medium text-gray-900 border-b-2 border-primary-600">
            Completed Tournaments
          </button>
          <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900">
            Upcoming Tournaments
          </button>
        </div>

        {/* Tournaments List */}
        <div className="space-y-4">
          {tournaments.map((tournament, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-serif font-bold text-gray-900">{tournament.name}</h4>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      tournament.result === 'Winner' ? 'bg-green-100 text-green-700' :
                      tournament.result === 'Runner-up' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {tournament.result}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <span>📍</span>
                      {tournament.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {tournament.date}
                    </span>
                    <span>Surface: <span className="font-medium text-gray-900">{tournament.surface}</span></span>
                    <span>Level: <span className="font-medium text-gray-900">{tournament.level}</span></span>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{tournament.points} pts</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{tournament.prize}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{tournament.matches} matches</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{tournament.winRate}</span>
                    </span>
                  </div>
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {tournament.medal}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-6">2024 Tournament Calendar</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">July</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">3 tournaments</span>
                <span className="text-gray-400">›</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">August</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">4 tournaments</span>
                <span className="text-gray-400">›</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Determine which section to render
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
    <div className="flex min-h-screen bg-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 flex flex-col">
        <Header playerData={playerData} />
        
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