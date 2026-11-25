import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import dietPlanRoutes from './routes/generate-diet-plan.js';
import uploadPhotoRoutes from './routes/upload-profile-photo.js';
import userPhotoRoutes from './routes/user-profile-photo.js';
import chatRoutes from './routes/ai-chat.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure local uploads directory exists for fallback storage
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve uploaded profile photos locally if AWS S3 is not configured
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'FitAI Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    awsConfigured: Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY)
  });
});

// Mount Routes (Mounting on both root and /api for compatibility)
app.use('/api', dietPlanRoutes);
app.use('/', dietPlanRoutes);

app.use('/api', uploadPhotoRoutes);
app.use('/', uploadPhotoRoutes);

app.use('/api', userPhotoRoutes);
app.use('/', userPhotoRoutes);

app.use('/api', chatRoutes);
app.use('/', chatRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 FitAI Backend Server running on port ${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  console.log(`===============================================`);
});

export default app;
