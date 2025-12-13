import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
});

// Initialize database
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS website_content (
        id SERIAL PRIMARY KEY,
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

initializeDatabase();

// Routes

// Get content
app.get('/api/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT content FROM website_content ORDER BY updated_at DESC LIMIT 1');
    if (result.rows.length > 0) {
      res.json(result.rows[0].content);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Save content
app.post('/api/content', async (req, res) => {
  try {
    const { content } = req.body;
    
    // Delete old content and insert new
    await pool.query('DELETE FROM website_content');
    await pool.query('INSERT INTO website_content (content) VALUES ($1)', [JSON.stringify(content)]);
    
    res.json({ success: true, message: 'Content saved successfully' });
  } catch (err) {
    console.error('Error saving content:', err);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
