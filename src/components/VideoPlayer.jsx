import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Eye, Clock, Sparkles } from 'lucide-react';

const VideoPlayer = ({ videoData, tags }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setIsPlaying(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary-600" />
          <h3 className="text-xl font-bold text-slate-900">Análisis de Video con IA</h3>
        </div>
        <p className="text-sm text-slate-600">{videoData.title}</p>
      </div>

      {/* Video Player Simulator */}
      <div className="relative bg-slate-900 aspect-video">
        <img 
          src={videoData.thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover opacity-70"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-primary-400 transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: isPlaying ? '45%' : '0%' }}
              ></div>
            </div>
            <span className="text-white text-sm">{videoData.duration}</span>
            <button className="text-white hover:text-primary-400 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Tag Indicator */}
        {selectedTag && (
          <div className="absolute top-4 left-4 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Analizando: {selectedTag.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* AI Tags */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary-600" />
          Tags de IA - Click para analizar
        </h4>
        
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                selectedTag?.id === tag.id
                  ? 'bg-primary-600 border-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-primary-400 hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{tag.label}</span>
                <span className="text-xs opacity-70">{tag.timestamp}</span>
              </div>
            </button>
          ))}
        </div>

        {/* AI Analysis Display */}
        {selectedTag && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border-l-4 border-primary-600 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-slate-900 mb-1">Análisis de IA: {selectedTag.label}</h5>
                <p className="text-sm text-slate-700">{selectedTag.analysis}</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Stats */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{videoData.views} vistas</span>
          </div>
          <span>•</span>
          <span>{videoData.uploadDate}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
