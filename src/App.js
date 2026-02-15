import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import Landing from './components/Landing';
import Footer from './components/Footer';
import PlayersList from './components/PlayersList';
import UploadVideo from './components/UploadVideo';
import { Trophy, TrendingUp, Zap, Activity, Video, Eye, Star, HardDrive, Filter, Upload, X, Calendar, Download, Share2, Target, Clock, DollarSign, User, CheckCircle2, Award } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

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
    setShowLanding(true);
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

  // RENDER PROFILE SECTION
  const renderProfile = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Video + Radar */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card-dark rounded-2xl overflow-hidden hover:shadow-neon-lg transition-all">
            <div className="relative aspect-video bg-dark-light">
              <img 
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80"
                alt="Match highlight"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deepest via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="badge-lime">Featured Highlight</span>
              </div>
              <div className="absolute top-4 right-4">
                <button className="px-4 py-2 bg-lime-neon text-dark-deepest rounded-lg font-bold hover:scale-105 transition-transform">
                  Watch Full Match
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-lime-neon mb-2">Latest Match Highlights</h3>
              <p className="text-cream-300 text-sm">Barcelona Open - Finals • June 2024</p>
            </div>
          </div>
        </div>

        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-lg font-bold text-lime-neon mb-6">Power Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={[
              { skill: 'Serve', value: 85 },
              { skill: 'Consistency', value: 78 },
              { skill: 'Footwork', value: 92 },
              { skill: 'Mental', value: 88 },
              { skill: 'Volleys', value: 75 },
            ]}>
              <PolarGrid stroke="#3a3a3a" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#fefef8', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar dataKey="value" stroke="#cdff00" fill="#cdff00" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-center">
            <p className="text-cream-300 text-sm">Overall Performance</p>
            <p className="text-3xl font-bold gradient-text-lime">83.6/100</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Zap, label: 'Avg. Serve Speed', value: '195', unit: 'km/h', change: '+8%', color: 'from-orange-500 to-red-500' },
          { icon: Trophy, label: 'Win Rate', value: '78', unit: '%', change: '+12%', color: 'from-lime-neon to-lime-bright' },
          { icon: Activity, label: 'Forehand RPM', value: '2,900', unit: 'rpm', change: '+5%', color: 'from-blue-500 to-cyan-500' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card-dark rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-cream-200">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold gradient-text-lime">{stat.value}</span>
                <span className="text-lg text-cream-300">{stat.unit}</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-lime-neon">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.change}</span>
                <span className="text-cream-300 text-xs ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="card-dark rounded-2xl p-6">
        <h3 className="text-xl font-bold text-lime-neon mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { icon: Trophy, text: 'Won Barcelona Junior Open', time: '2 days ago', color: 'bg-lime-neon' },
            { icon: Video, text: 'Uploaded new training video', time: '1 week ago', color: 'bg-blue-500' },
            { icon: Award, text: 'Reached UTR 12.5 milestone', time: '2 weeks ago', color: 'bg-purple-500' }
          ].map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-dark-light rounded-lg transition-colors">
                <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-cream-50 font-medium">{activity.text}</p>
                  <p className="text-cream-300 text-sm">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // RENDER STATS SECTION
  const renderStats = () => {
    const performanceData = [
      { month: 'Jan', serveSpeed: 185, winRate: 65, consistency: 70 },
      { month: 'Feb', serveSpeed: 187, winRate: 68, consistency: 72 },
      { month: 'Mar', serveSpeed: 190, winRate: 72, consistency: 75 },
      { month: 'Apr', serveSpeed: 192, winRate: 75, consistency: 78 },
      { month: 'May', serveSpeed: 193, winRate: 76, consistency: 80 },
      { month: 'Jun', serveSpeed: 195, winRate: 78, consistency: 82 },
    ];

    const shotData = [
      { name: 'Forehand', value: 42, color: '#cdff00' },
      { name: 'Backhand', value: 28, color: '#2d5a2d' },
      { name: 'Serve', value: 18, color: '#1e3a1e' },
      { name: 'Volley', value: 12, color: '#e0ff4d' },
    ];

    const monthlyStats = [
      { month: 'Jan', matches: 12, wins: 8, losses: 4 },
      { month: 'Feb', matches: 15, wins: 11, losses: 4 },
      { month: 'Mar', matches: 18, wins: 14, losses: 4 },
      { month: 'Apr', matches: 14, wins: 11, losses: 3 },
      { month: 'May', matches: 16, wins: 13, losses: 3 },
      { month: 'Jun', matches: 20, wins: 17, losses: 3 },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Activity, label: 'Total Matches', value: '156', change: '+24', subtext: 'This year' },
            { icon: Clock, label: 'Avg Duration', value: '2h 18m', change: '-12m', subtext: 'Per match' },
            { icon: Target, label: 'Break Points', value: '64%', change: '+8%', subtext: 'Success rate' },
            { icon: Zap, label: 'Peak Performance', value: '94/100', change: '+6', subtext: 'Personal best' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card-dark rounded-2xl p-6 hover:shadow-neon transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-lime-neon" />
                  <span className="text-sm text-cream-200">{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-cream-50">{stat.value}</span>
                  <span className="text-sm text-lime-neon font-medium">{stat.change}</span>
                </div>
                <p className="text-xs text-cream-300">{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-lg font-bold text-lime-neon mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                <XAxis dataKey="month" stroke="#fefef8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#fefef8" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #cdff00', borderRadius: '8px', color: '#fefef8' }} />
                <Line type="monotone" dataKey="serveSpeed" stroke="#cdff00" strokeWidth={3} dot={{ fill: '#cdff00', r: 4 }} name="Serve Speed" />
                <Line type="monotone" dataKey="winRate" stroke="#2d5a2d" strokeWidth={3} dot={{ fill: '#2d5a2d', r: 4 }} name="Win Rate" />
                <Line type="monotone" dataKey="consistency" stroke="#e0ff4d" strokeWidth={2} dot={{ fill: '#e0ff4d', r: 3 }} name="Consistency" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-lg font-bold text-lime-neon mb-6">Shot Distribution</h3>
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
                  {shotData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #cdff00', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-lg font-bold text-lime-neon mb-6">Monthly Match Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
              <XAxis dataKey="month" stroke="#fefef8" />
              <YAxis stroke="#fefef8" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #cdff00', borderRadius: '8px' }} />
              <Bar dataKey="wins" fill="#cdff00" name="Wins" />
              <Bar dataKey="losses" fill="#ff4444" name="Losses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Stats Table */}
        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-lg font-bold text-lime-neon mb-6">Detailed Performance Metrics</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-dark-light rounded-xl">
              <p className="text-cream-300 text-sm mb-2">First Serve %</p>
              <p className="text-3xl font-bold gradient-text-lime">68%</p>
              <div className="mt-2 w-full bg-dark-base h-2 rounded-full">
                <div className="bg-lime-neon h-2 rounded-full" style={{width: '68%'}}></div>
              </div>
            </div>
            <div className="p-4 bg-dark-light rounded-xl">
              <p className="text-cream-300 text-sm mb-2">Return Points Won</p>
              <p className="text-3xl font-bold gradient-text-lime">45%</p>
              <div className="mt-2 w-full bg-dark-base h-2 rounded-full">
                <div className="bg-lime-neon h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
            <div className="p-4 bg-dark-light rounded-xl">
              <p className="text-cream-300 text-sm mb-2">Aces per Match</p>
              <p className="text-3xl font-bold gradient-text-lime">8.5</p>
              <div className="mt-2 w-full bg-dark-base h-2 rounded-full">
                <div className="bg-lime-neon h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // RENDER VIDEOS SECTION
  const renderVideos = () => {
    const videosToShow = videoTab === 'mis-videos' 
      ? videos.filter(video => video.jugadorId?._id === currentUser?.id || video.jugadorId === currentUser?.id)
      : videos;

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 max-w-md w-full">
            <input 
              type="text" 
              placeholder="Search videos..." 
              className="w-full px-4 py-3 bg-dark-deepest border-2 border-dark-light text-cream-50 rounded-xl focus:border-lime-neon transition-all placeholder-cream-300" 
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowUploadModal(true)} 
              className="btn-neon px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Video</span>
            </button>
            <button className="px-6 py-3 bg-dark-deepest text-cream-50 rounded-xl hover:bg-dark-base transition-all flex items-center gap-2 border border-dark-light">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b-2 border-dark-light">
          <button 
            onClick={() => setVideoTab('mis-videos')} 
            className={`px-6 py-3 font-bold transition-all relative ${
              videoTab === 'mis-videos' 
                ? 'text-lime-neon' 
                : 'text-cream-300 hover:text-cream-50'
            }`}
          >
            My Videos
            {videoTab === 'mis-videos' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-neon shadow-neon"></div>
            )}
          </button>
          <button 
            onClick={() => setVideoTab('explorar')} 
            className={`px-6 py-3 font-bold transition-all relative ${
              videoTab === 'explorar' 
                ? 'text-lime-neon' 
                : 'text-cream-300 hover:text-cream-50'
            }`}
          >
            Explore All
            {videoTab === 'explorar' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-neon shadow-neon"></div>
            )}
          </button>
        </div>

        {/* Video Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-dark p-4 text-center">
            <Video className="w-8 h-8 text-lime-neon mx-auto mb-2" />
            <div className="text-2xl font-bold text-cream-50">
              {videoTab === 'mis-videos' 
                ? videos.filter(v => v.jugadorId?._id === currentUser?.id || v.jugadorId === currentUser?.id).length
                : videos.length
              }
            </div>
            <div className="text-xs text-cream-300">{videoTab === 'mis-videos' ? 'My Videos' : 'Total Videos'}</div>
          </div>
          
          <div className="card-dark p-4 text-center">
            <Eye className="w-8 h-8 text-lime-neon mx-auto mb-2" />
            <div className="text-2xl font-bold text-cream-50">
              {videosToShow.reduce((acc, v) => acc + (v.vistas || 0), 0)}
            </div>
            <div className="text-xs text-cream-300">Total Views</div>
          </div>
          
          <div className="card-dark p-4 text-center">
            <Star className="w-8 h-8 text-lime-neon mx-auto mb-2" />
            <div className="text-2xl font-bold text-cream-50">
              {videosToShow.length > 0 
                ? (videosToShow.reduce((acc, v) => acc + (v.rating || 0), 0) / videosToShow.length).toFixed(1)
                : '0'
              }
            </div>
            <div className="text-xs text-cream-300">Avg. Rating</div>
          </div>
          
          <div className="card-dark p-4 text-center">
            <HardDrive className="w-8 h-8 text-lime-neon mx-auto mb-2" />
            <div className="text-2xl font-bold text-cream-50">0 GB</div>
            <div className="text-xs text-cream-300">Storage Used</div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosToShow.length > 0 ? (
            videosToShow.map((video) => (
              <div key={video._id} className="card-dark rounded-2xl overflow-hidden hover:scale-105 hover:shadow-neon-lg transition-all">
                <div className="relative aspect-video bg-dark-light group">
                  {video.url ? (
                    <video 
                      src={video.url} 
                      className="w-full h-full object-cover" 
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-lime-neon animate-pulse" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 badge-lime text-xs font-bold shadow-lg">
                    {video.duracion || '0:00'}
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-dark-deepest/90 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Star className="w-3 h-3 text-lime-neon fill-lime-neon" />
                    <span className="text-xs font-bold text-cream-50">{video.rating || 0}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-bold text-cream-50 mb-2 line-clamp-1">{video.titulo}</h4>
                  <div className="flex items-center gap-4 text-sm text-cream-300 mb-3">
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
                      {video.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-lime-neon/20 text-lime-neon rounded text-xs font-bold border border-lime-neon/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-3 border-t border-dark-light">
                    <button className="flex items-center gap-1.5 text-sm text-cream-300 hover:text-lime-neon transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-cream-300 hover:text-lime-neon transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 card-dark rounded-2xl">
              <Video className="w-20 h-20 text-lime-neon mx-auto mb-4 opacity-50" />
              <p className="text-cream-300 text-lg mb-2">
                {videoTab === 'mis-videos' ? 'No videos uploaded yet' : 'No videos available'}
              </p>
              <p className="text-cream-300 text-sm mb-6">
                {videoTab === 'mis-videos' ? 'Start building your portfolio by uploading your first video' : 'Check back later for new content'}
              </p>
              {videoTab === 'mis-videos' && (
                <button 
                  onClick={() => setShowUploadModal(true)} 
                  className="btn-neon px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Your First Video
                </button>
              )}
            </div>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="card-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-neon-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold gradient-text-lime">Upload Video</h2>
                  <button 
                    onClick={() => setShowUploadModal(false)} 
                    className="text-cream-300 hover:text-lime-neon transition-colors hover:rotate-90 transform"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
                <UploadVideo 
                  playerId={currentUser?.id} 
                  onUploadSuccess={(video) => { 
                    setShowUploadModal(false); 
                    loadVideos(); 
                    setTimeout(() => { loadVideos(); }, 1000); 
                  }} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // RENDER TOURNAMENTS SECTION
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
        winRate: '100%', 
        medal: '🥇',
        description: 'Dominated the tournament with exceptional baseline play'
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
        winRate: '83%', 
        medal: '🥈',
        description: 'Strong performance against top European competition'
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
        winRate: '80%', 
        medal: '🏅',
        description: 'Impressive run ended in semifinals'
      },
    ];

    const achievements = [
      { icon: '🏆', title: 'Most Improved Player', org: 'Spanish Tennis Federation', year: '2024', color: 'from-lime-neon/20 to-lime-bright/20' },
      { icon: '⭐', title: 'Top 10 Junior Ranking', org: 'ITF Juniors', year: '2024', color: 'from-blue-500/20 to-cyan-500/20' },
      { icon: '🎯', title: 'Best Serve Award', org: 'European Junior Circuit', year: '2024', color: 'from-orange-500/20 to-red-500/20' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Trophy, label: 'Tournaments', value: '24', change: '+6', color: 'text-lime-neon' },
            { icon: Target, label: 'Win Rate', value: '78%', change: '+5%', color: 'text-blue-400' },
            { icon: DollarSign, label: 'Prize Money', value: '€32K', change: '+€8K', color: 'text-yellow-400' },
            { icon: TrendingUp, label: 'Ranking Points', value: '1,450', change: '+250', color: 'text-purple-400' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card-dark rounded-2xl p-6 hover:shadow-neon transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-lime-neon/20 rounded-xl flex items-center justify-center border border-lime-neon/30 shadow-lg">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-cream-200 font-medium">{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-cream-50">{stat.value}</span>
                  <span className="text-sm text-lime-neon font-bold">{stat.change}</span>
                </div>
                <p className="text-xs text-cream-300">This season</p>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-xl font-bold text-lime-neon mb-6">Recent Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-gradient-to-br ${achievement.color} border-2 border-lime-neon/20 rounded-xl p-6 hover:scale-105 transition-transform`}>
                <div className="text-5xl mb-3">{achievement.icon}</div>
                <h4 className="font-bold text-cream-50 text-lg mb-2">{achievement.title}</h4>
                <p className="text-sm text-cream-300 mb-1">{achievement.org}</p>
                <p className="text-sm text-lime-neon font-bold">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b-2 border-dark-light">
          <button className="px-6 py-3 font-bold text-lime-neon border-b-2 border-lime-neon -mb-0.5">
            Completed Tournaments
          </button>
          <button className="px-6 py-3 font-bold text-cream-300 hover:text-cream-50 transition-colors">
            Upcoming Events
          </button>
        </div>

        {/* Tournaments List */}
        <div className="space-y-4">
          {tournaments.map((tournament, index) => (
            <div key={index} className="card-dark rounded-2xl p-6 hover:scale-[1.02] hover:shadow-neon-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-2xl font-bold text-cream-50">{tournament.name}</h4>
                    <span className={`badge-lime ${tournament.result === 'Winner' ? 'bg-lime-neon' : 'bg-lime-neon/50'} shadow-lg`}>
                      {tournament.result}
                    </span>
                  </div>
                  <p className="text-cream-300 text-sm mb-4">{tournament.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-cream-300 mb-4">
                    <span className="flex items-center gap-1">
                      📍 {tournament.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {tournament.date}
                    </span>
                    <span className="px-2 py-1 bg-dark-light rounded">
                      Surface: <span className="font-bold text-cream-50">{tournament.surface}</span>
                    </span>
                    <span className="px-2 py-1 bg-dark-light rounded">
                      Level: <span className="font-bold text-lime-neon">{tournament.level}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <span className="flex items-center gap-1 text-cream-300">
                      <Trophy className="w-4 h-4 text-lime-neon" />
                      <span className="font-bold text-cream-50">{tournament.points} pts</span>
                    </span>
                    <span className="flex items-center gap-1 text-cream-300">
                      <DollarSign className="w-4 h-4 text-lime-neon" />
                      <span className="font-bold text-cream-50">{tournament.prize}</span>
                    </span>
                    <span className="flex items-center gap-1 text-cream-300">
                      <User className="w-4 h-4 text-lime-neon" />
                      <span className="font-bold text-cream-50">{tournament.matches} matches</span>
                    </span>
                    <span className="flex items-center gap-1 text-cream-300">
                      <Target className="w-4 h-4 text-lime-neon" />
                      <span className="font-bold text-cream-50">{tournament.winRate} win rate</span>
                    </span>
                  </div>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-lime-neon to-lime-bright rounded-full flex items-center justify-center text-4xl shadow-neon flex-shrink-0">
                  {tournament.medal}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Preview */}
        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-xl font-bold text-lime-neon mb-6">Upcoming Tournament Calendar</h3>
          <div className="space-y-3">
            {[
              { month: 'July', count: 3, tournaments: 'Valencia Open, Madrid Junior Masters, Costa del Sol Cup' },
              { month: 'August', count: 4, tournaments: 'US Junior Circuit, New York Open, Boston Championships, Miami Finals' },
              { month: 'September', count: 2, tournaments: 'European Grand Prix, Paris Junior Open' }
            ].map((period, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-dark-light rounded-xl hover:bg-dark-base transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-lime-neon group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-cream-50">{period.month} 2024</p>
                    <p className="text-sm text-cream-300">{period.tournaments}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="badge-lime text-xs">{period.count} events</span>
                  <span className="text-cream-300 group-hover:text-lime-neon transition-colors">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // RENDER SECTION SELECTOR
  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfile();
      case 'stats': return renderStats();
      case 'videos': return renderVideos();
      case 'tournaments': return renderTournaments();
      case 'explore': return (<div className="animate-fadeIn"><PlayersList /></div>);
      default: return renderProfile();
    }
  };

  return (
    <div className="flex min-h-screen bg-cream-50">
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