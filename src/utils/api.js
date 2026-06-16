const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getAuthHeaders = (includeJson = true) => {
  const token = localStorage.getItem('token');
  const headers = {};

  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_BASE}${imageUrl}`;
};

export { API_BASE };
