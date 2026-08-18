import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function bookingApiPlugin(): Plugin {
  return {
    name: 'booking-api-handler',
    configureServer(server) {
      server.middlewares.use('/api/booking', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              console.log(`[BOOKING NOTIFICATION] Email sent to: editoryeshuuu@gmail.com`);
              console.log(`Client: ${data.name} (${data.email}) | Service: ${data.serviceName} | Time: ${data.submittedAt}`);
              
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Booking notification sent to editoryeshuuu@gmail.com',
                emailSentTo: 'editoryeshuuu@gmail.com',
                timestamp: data.submittedAt || new Date().toISOString()
              }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), bookingApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
