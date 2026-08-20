import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { processHireRequest, processBookingRequest, getNotificationEmail } from './api/_lib/email';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Dedicated handler for video file if present at public/videos, public, or root
app.get(['/videos/color-grade-01.mp4', '/color-grade-01.mp4'], (req: Request, res: Response, next) => {
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'videos', 'color-grade-01.mp4'),
    path.join(process.cwd(), 'public', 'color-grade-01.mp4'),
    path.join(process.cwd(), 'color-grade-01.mp4'),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }
  next();
});

// Health Check API Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  res.json({
    status: 'ok',
    notificationEmail: getNotificationEmail(),
    timestamp: new Date().toISOString(),
    service: 'YESHUUU EDITS API Engine',
    emailConfiguration: {
      hasResend,
      hasSmtp,
      mode: hasResend ? 'Resend API' : hasSmtp ? 'SMTP Relay' : 'Server Dispatch Engine',
    },
  });
});

// HIRE ME / GET A QUOTE API Endpoint
app.post('/api/hire', async (req: Request, res: Response) => {
  try {
    const { status, response } = await processHireRequest(req.body);
    return res.status(status).json(response);
  } catch (error: any) {
    console.error('Error processing /api/hire:', error);
    return res.status(500).json({
      success: false,
      error: `Failed to process hiring request: ${error?.message || 'Server internal error'}`,
    });
  }
});

// BOOKING API Endpoint
app.post('/api/booking', async (req: Request, res: Response) => {
  try {
    const { status, response } = await processBookingRequest(req.body);
    return res.status(status).json(response);
  } catch (error: any) {
    console.error('Error in /api/booking:', error);
    return res.status(500).json({
      success: false,
      error: `Booking failed to process: ${error?.message || 'Server internal error'}`,
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YESHUUU EDITS server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
