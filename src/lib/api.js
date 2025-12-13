// API endpoint - change this to your backend URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const saveContent = async (content) => {
  try {
    const response = await fetch(`${API_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to save content');
    }

    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
};

export const loadContent = async () => {
  try {
    const response = await fetch(`${API_URL}/content`);

    if (!response.ok) {
      throw new Error('Failed to load content');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading content:', error);
    return null;
  }
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};
