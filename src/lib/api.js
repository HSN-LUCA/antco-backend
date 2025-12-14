// API endpoint - change this to your backend URL
const API_URL = process.env.VITE_API_URL || 'https://antco-api.onrender.com/api';

export const saveContent = async (content) => {
  try {
    console.log('Attempting to save content to API:', API_URL);
    
    const response = await fetch(`${API_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API error response:', data);
      throw new Error(data.error || 'Failed to save content');
    }

    console.log('Content saved successfully:', data);
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
