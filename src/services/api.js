const API_URL = tennisscout-frontend.vercel.app;

// ========== PLAYERS ==========

export const getPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo jugadores:', error);
    throw error;
  }
};

export const getPlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/players/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo jugador:', error);
    throw error;
  }
};

export const searchPlayers = async (query) => {
  try {
    const response = await fetch(`${API_URL}/players/search/${query}`);
    return await response.json();
  } catch (error) {
    console.error('Error buscando jugadores:', error);
    throw error;
  }
};

// ========== AUTH ==========

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// ========== VIDEOS ==========

export const getVideos = async () => {
  try {
    const response = await fetch(`${API_URL}/videos`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo videos:', error);
    throw error;
  }
};

export const getPlayerVideos = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/videos/player/${playerId}`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo videos del jugador:', error);
    throw error;
  }
};

export const uploadVideo = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/videos/upload`, {
      method: 'POST',
      body: formData, // No pongas Content-Type, fetch lo hace automáticamente
    });
    return await response.json();
  } catch (error) {
    console.error('Error subiendo video:', error);
    throw error;
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const response = await fetch(`${API_URL}/videos/${videoId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error('Error eliminando video:', error);
    throw error;
  }
};

export const incrementViews = async (videoId) => {
  try {
    const response = await fetch(`${API_URL}/videos/${videoId}/view`, {
      method: 'PUT',
    });
    return await response.json();
  } catch (error) {
    console.error('Error incrementando vistas:', error);
    throw error;
  }
};

// ========== TOURNAMENTS ==========

export const getPlayerTournaments = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/tournaments/player/${playerId}`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo torneos:', error);
    throw error;
  }
};

export const createTournament = async (tournamentData) => {
  try {
    const response = await fetch(`${API_URL}/tournaments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournamentData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creando torneo:', error);
    throw error;
  }
};

// ========== STATS ==========

export const getPlayerStats = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/stats/player/${playerId}`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
};

export const createStats = async (statsData) => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statsData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creando estadísticas:', error);
    throw error;
  }
};