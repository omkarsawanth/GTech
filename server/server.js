import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { generalLimiter, aiLimiter } from './middleware/rateLimitMiddleware.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import roastRoutes from './routes/roastRoutes.js';
import squadRoutes from './routes/squadRoutes.js';

dotenv.config();
delete process.env.GOOGLE_API_KEY;

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Kalpa API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ── Rate Limiting ─────────────────────────────────────────────────────────────
// General rate limiter for all /api endpoints (100 requests per 15 minutes per IP)
app.use('/api', generalLimiter);

// Specific persistent rate limiter for Gemini-powered endpoints (20 requests per 15 minutes per user/IP)
app.use('/api/ai', aiLimiter);
app.use('/api/job/analyze', aiLimiter);
app.use('/api/projects/generate', aiLimiter);
app.use('/api/roadmap', aiLimiter);
app.use('/api/assessment', aiLimiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/user', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/roast', roastRoutes);
app.use('/api/squad', squadRoutes);

// ── Error handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start (Only run listen when not in test or serverless/Vercel environment) ──
let server;
if (process.env.NODE_ENV !== 'test' && (process.env.NODE_ENV !== 'production' || !process.env.VERCEL)) {
  server = app.listen(PORT, () => {
    console.log(`\n🚀 Kalpa API running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
}

export { server };
export default app;
