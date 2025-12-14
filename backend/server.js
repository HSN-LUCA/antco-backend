import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const app = express();

// Middleware
app.use(cors({
  origin: ['https://antco.ae', 'https://www.antco.ae', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
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
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
};

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
    
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
    }
    
    console.log('Saving content to database...');
    
    // Delete old content and insert new
    await pool.query('DELETE FROM website_content');
    const result = await pool.query('INSERT INTO website_content (content) VALUES ($1) RETURNING id', [JSON.stringify(content)]);
    
    console.log('Content saved successfully, ID:', result.rows[0].id);
    res.json({ success: true, message: 'Content saved successfully', id: result.rows[0].id });
  } catch (err) {
    console.error('Error saving content:', err);
    res.status(500).json({ error: 'Failed to save content', details: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

// Start server and initialize database
(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
