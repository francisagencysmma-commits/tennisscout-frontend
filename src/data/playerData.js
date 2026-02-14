// Datos del jugador Mateo Silva
export const playerData = {
  // Información básica
  name: "Mateo Silva",
  country: "ESP",
  countryFlag: "🇪🇸",
  age: 17,
  utrRating: 12.5,
  category: "Junior Elite",
  
  // Gráfico de Radar
  radarStats: [
    { skill: 'Power', value: 85, maxValue: 100 },
    { skill: 'Consistency', value: 78, maxValue: 100 },
    { skill: 'Footwork', value: 92, maxValue: 100 },
    { skill: 'Mentality', value: 88, maxValue: 100 },
    { skill: 'Serve', value: 82, maxValue: 100 },
    { skill: 'Return', value: 75, maxValue: 100 },
  ],
  
  // Métricas principales
  metrics: {
    serveSpeed: {
      label: "Velocidad de Saque",
      value: "185 km/h",
      change: "+5%",
      trend: "up",
      icon: "zap"
    },
    winRate: {
      label: "Tasa de Victoria",
      value: "68%",
      change: "+12%",
      trend: "up",
      icon: "trophy"
    },
    forehandRPM: {
      label: "Forehand RPM",
      value: "2,850",
      change: "+150",
      trend: "up",
      icon: "activity"
    },
    acesPerMatch: {
      label: "Aces por Partido",
      value: "7.2",
      change: "+1.5",
      trend: "up",
      icon: "target"
    }
  },
  
  // Tags de Video IA
  videoTags: [
    {
      id: "serve",
      label: "Servicio",
      timestamp: "0:15",
      analysis: "Potencia excepcional, 185 km/h promedio"
    },
    {
      id: "forehand",
      label: "Derecha",
      timestamp: "0:45",
      analysis: "Top spin agresivo con 2,850 RPM"
    },
    {
      id: "volley",
      label: "Volea",
      timestamp: "1:20",
      analysis: "Toque suave, excelente anticipación"
    },
    {
      id: "backhand",
      label: "Revés",
      timestamp: "1:50",
      analysis: "Consistencia sólida, 78% de precisión"
    },
    {
      id: "movement",
      label: "Movimiento",
      timestamp: "2:15",
      analysis: "Cobertura de cancha superior, velocidad pico 28 km/h"
    }
  ],
  
  // Datos comparativos
  comparative: [
    {
      metric: "Velocidad de Saque",
      player: 185,
      average: 165,
      unit: "km/h"
    },
    {
      metric: "Tasa de Victoria",
      player: 68,
      average: 55,
      unit: "%"
    },
    {
      metric: "Forehand RPM",
      player: 2850,
      average: 2400,
      unit: "rpm"
    },
    {
      metric: "Aces por Partido",
      player: 7.2,
      average: 4.5,
      unit: "aces"
    },
    {
      metric: "Winners/Partido",
      player: 28,
      average: 22,
      unit: "shots"
    },
    {
      metric: "Errores no Forzados",
      player: 15,
      average: 23,
      unit: "errors"
    }
  ],
  
  // Torneos recientes
  tournaments: [
    {
      name: "Orange Bowl International",
      date: "Dic 2025",
      result: "Semifinales",
      category: "ITF Grade A"
    },
    {
      name: "Eddie Herr International",
      date: "Nov 2025",
      result: "Campeón",
      category: "ITF Grade 1"
    },
    {
      name: "Copa del Sol",
      date: "Oct 2025",
      result: "Finalista",
      category: "Nacional"
    }
  ],
  
  // Información de contacto
  contact: {
    academy: "Academia Sánchez-Casal",
    coach: "Carlos Ferrero",
    email: "mateo.silva@tennisscout.ai",
    phone: "+34 600 123 456"
  }
};

// Datos para el video player (simulado)
export const videoData = {
  thumbnail: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  duration: "3:45",
  title: "Highlights - Torneo Copa del Sol 2025",
  views: "1,245",
  uploadDate: "Hace 2 semanas"
};
