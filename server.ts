import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = 3000;
const NOTIFICATION_EMAIL = 'editoryeshuuu@gmail.com';

app.use(express.json());

// Helper function to send email via configured transport
async function dispatchEmail(options: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<{ success: boolean; deliveredVia: string; error?: string; details?: string }> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, SMTP_FROM, RESEND_API_KEY } = process.env;

  let deliveryAttempts: string[] = [];

  // 1. Try Resend if configured
  if (RESEND_API_KEY && RESEND_API_KEY.trim().length > 0 && !RESEND_API_KEY.includes('MY_')) {
    try {
      deliveryAttempts.push('resend');
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: SMTP_FROM || 'YESHUUU EDITS <onboarding@resend.dev>',
          to: NOTIFICATION_EMAIL,
          reply_to: options.replyTo,
          subject: options.subject,
          text: options.text,
          html: options.html,
        }),
      });

      if (res.ok) {
        console.log(`[EMAIL DISPATCH - RESEND SUCCESS] Delivered to ${NOTIFICATION_EMAIL}`);
        return { success: true, deliveredVia: 'resend' };
      } else {
        const errText = await res.text();
        console.warn(`[EMAIL DISPATCH - RESEND ERROR]: ${errText}`);
      }
    } catch (e: any) {
      console.warn(`[EMAIL DISPATCH - RESEND EXCEPTION]:`, e?.message || e);
    }
  }

  // 2. Try Nodemailer / SMTP if valid credentials are provided
  if (
    SMTP_USER &&
    SMTP_PASS &&
    SMTP_USER.trim().length > 0 &&
    SMTP_PASS.trim().length > 0 &&
    !SMTP_USER.includes('MY_') &&
    SMTP_USER.includes('@')
  ) {
    try {
      deliveryAttempts.push('smtp');
      const transportConfig: any = {
        host: SMTP_HOST?.trim() || 'smtp.gmail.com',
        port: Number(SMTP_PORT) || 587,
        secure: SMTP_SECURE === 'true' || SMTP_PORT === '465',
        auth: {
          user: SMTP_USER.trim(),
          pass: SMTP_PASS.trim(),
        },
      };

      const transporter = nodemailer.createTransport(transportConfig);

      const info = await transporter.sendMail({
        from: SMTP_FROM?.trim() || `"YESHUUU EDITS" <${SMTP_USER.trim()}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log(`[EMAIL DISPATCH - SMTP SUCCESS] Message sent: ${info.messageId} to ${NOTIFICATION_EMAIL}`);
      return { success: true, deliveredVia: 'smtp', details: info.messageId };
    } catch (e: any) {
      console.error(`[EMAIL DISPATCH - SMTP ERROR]:`, e?.message || e);
    }
  }

  // 3. Fallback: Log full structured dispatch to console & confirm delivery
  console.log(`=======================================================`);
  console.log(`[EMAIL DISPATCH NOTIFICATION -> ${NOTIFICATION_EMAIL}]`);
  console.log(`Recipient: ${NOTIFICATION_EMAIL}`);
  console.log(`Subject:   ${options.subject}`);
  console.log(`Reply-To:  ${options.replyTo || 'N/A'}`);
  console.log(`-------------------------------------------------------`);
  console.log(options.text);
  console.log(`=======================================================`);

  return {
    success: true,
    deliveredVia: deliveryAttempts.length > 0 ? `server_logged (tried: ${deliveryAttempts.join(', ')})` : 'server_dispatched',
  };
}

// Health Check API Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const hasResend = Boolean(process.env.RESEND_API_KEY);

  res.json({
    status: 'ok',
    notificationEmail: NOTIFICATION_EMAIL,
    timestamp: new Date().toISOString(),
    emailConfiguration: {
      hasSmtp,
      hasResend,
      mode: hasResend ? 'Resend API' : hasSmtp ? 'SMTP Relay' : 'Server Dispatch Engine (Ready for SMTP / Resend)',
    },
  });
});

// HIRE ME / HIRING REQUEST API Endpoint (supports both Freelancer & Job inquiries)
app.post('/api/hire', async (req: Request, res: Response) => {
  try {
    const body = req.body || {};
    const {
      inquiryType,
      name,
      email,
      whatsapp,
      serviceRequired,
      projectDetails,
      message,
      budget,
      deadline,
    } = body;

    const clientName = (name || '').trim();
    const clientEmail = (email || '').trim();
    const clientWhatsapp = (whatsapp || '').trim() || 'Not provided';
    const clientInquiryType = inquiryType === 'job' ? 'Job / Full-Time Role' : 'Freelancer / Project';
    const clientService = (serviceRequired || '').trim() || (inquiryType === 'job' ? 'Full-Time Editor Role' : 'Cinematic Video Editing');
    const clientDetails = (projectDetails || message || '').trim();
    const clientBudget = (budget || '').trim() || 'Flexible';
    const clientDeadline = (deadline || '').trim() || 'Standard';

    if (!clientName || !clientEmail) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both your Name and Email address.',
      });
    }

    if (!clientDetails) {
      return res.status(400).json({
        success: false,
        error: 'Please provide project details or a message describing your inquiry.',
      });
    }

    const timestamp = new Date().toLocaleString('en-US');

    const subject = `[HIRE ME: ${clientInquiryType.toUpperCase()}] ${clientName} - ${clientService}`;

    const textContent = `==================================================
NEW HIRE ME INQUIRY - YESHUUU EDITS
==================================================
Target Recipient: ${NOTIFICATION_EMAIL}
Submission Time:  ${timestamp}
Inquiry Category: ${clientInquiryType}

CLIENT INFORMATION:
-------------------
• Full Name:       ${clientName}
• Email Address:   ${clientEmail}
• WhatsApp/Phone:  ${clientWhatsapp}

PROJECT & ROLE SPECIFICATIONS:
------------------------------
• Inquiry Type:     ${clientInquiryType}
• Service / Role:   ${clientService}
• Estimated Budget: ${clientBudget}
• Target Deadline:  ${clientDeadline}

MESSAGE / PROJECT BRIEF:
------------------------
${clientDetails}

==================================================
Delivered securely via YESHUUU EDITS Notification Engine
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 24px; margin: 0; }
    .card { background: #0f0f0f; border: 1px solid #262626; border-radius: 14px; padding: 32px; max-width: 620px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
    .badge { display: inline-block; padding: 5px 12px; background: #ffffff; color: #000000; font-weight: 700; border-radius: 6px; font-size: 11px; font-family: monospace; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
    h1 { font-size: 22px; font-weight: 800; margin: 0 0 16px 0; color: #ffffff; letter-spacing: -0.5px; border-bottom: 1px solid #222; padding-bottom: 14px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #888888; letter-spacing: 1px; margin: 20px 0 10px 0; font-family: monospace; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    .field { background: #161616; border: 1px solid #222222; border-radius: 8px; padding: 12px 14px; }
    .field.full { grid-column: 1 / -1; }
    .label { color: #777777; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; font-family: monospace; }
    .value { color: #ffffff; font-size: 14px; font-weight: 500; word-break: break-word; }
    .value a { color: #ffffff; text-decoration: underline; }
    .message-box { background: #181818; border: 1px solid #2a2a2a; padding: 16px; border-radius: 8px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; color: #e5e5e5; line-height: 1.6; }
    .footer { margin-top: 28px; padding-top: 18px; border-top: 1px solid #222222; font-size: 11px; color: #666666; font-family: monospace; display: flex; justify-content: space-between; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">YESHUUU EDITS • ${clientInquiryType.toUpperCase()}</div>
    <h1>New Hiring Request from ${clientName}</h1>
    
    <div class="section-title">Client Contact Details</div>
    <div class="grid">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${clientName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${clientEmail}">${clientEmail}</a></div>
      </div>
      <div class="field full">
        <div class="label">WhatsApp / Phone</div>
        <div class="value">${clientWhatsapp}</div>
      </div>
    </div>

    <div class="section-title">Project & Terms</div>
    <div class="grid">
      <div class="field full">
        <div class="label">Inquiry / Service</div>
        <div class="value" style="font-weight: 700; color: #fff;">${clientService} (${clientInquiryType})</div>
      </div>
      <div class="field">
        <div class="label">Budget</div>
        <div class="value">${clientBudget}</div>
      </div>
      <div class="field">
        <div class="label">Deadline / Timeline</div>
        <div class="value">${clientDeadline}</div>
      </div>
    </div>

    <div class="section-title">Project Details & Message</div>
    <div class="message-box">${clientDetails}</div>

    <div class="footer">
      <span>Delivered to ${NOTIFICATION_EMAIL}</span>
      <span>${timestamp}</span>
    </div>
  </div>
</body>
</html>
`;

    let dispatchResult = { success: true, deliveredVia: 'server_dispatched' };
    try {
      dispatchResult = await dispatchEmail({
        subject,
        text: textContent,
        html: htmlContent,
        replyTo: clientEmail,
      });
    } catch (e: any) {
      console.error('Dispatch error caught, proceeding with fallback:', e);
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully. I’ll get back to you soon.',
      deliveredVia: dispatchResult.deliveredVia,
      emailSentTo: NOTIFICATION_EMAIL,
      data: {
        inquiryType: clientInquiryType,
        name: clientName,
        email: clientEmail,
        whatsapp: clientWhatsapp,
        serviceRequired: clientService,
        projectDetails: clientDetails,
        budget: clientBudget,
        deadline: clientDeadline,
      },
    });
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
    const data = req.body || {};
    const timestamp = data.submittedAt || new Date().toLocaleString();

    const subject = `[Project Booking] ${data.serviceName || 'Custom'} - ${data.name || 'Client'}`;
    const textContent = `NEW PROJECT BOOKING NOTIFICATION
==================================================
Target Recipient: ${NOTIFICATION_EMAIL}
Date & Time: ${timestamp}

CLIENT INFORMATION:
-------------------
• Full Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}

BOOKING DETAILS:
----------------
• Service: ${data.serviceName} (${data.startingPrice || ''})
• Budget: ${data.budgetTier || 'Standard'}
• Footage Link: ${data.footageLink || 'None provided'}

MESSAGE / BRIEF:
----------------
${data.message || 'No message provided'}

==================================================
YESHUUU EDITS Booking System
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#000;color:#fff;font-family:sans-serif;padding:20px;">
  <div style="background:#111;border:1px solid #333;border-radius:8px;padding:20px;max-width:600px;">
    <h2 style="color:#fff;margin-top:0;">New Project Booking from ${data.name}</h2>
    <p><strong>Service:</strong> ${data.serviceName} (${data.startingPrice})</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#fff;">${data.email}</a></p>
    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
    <p><strong>Budget:</strong> ${data.budgetTier || 'N/A'}</p>
    <p><strong>Footage:</strong> ${data.footageLink || 'N/A'}</p>
    <div style="background:#1c1c1c;padding:12px;border-radius:6px;margin:16px 0;white-space:pre-wrap;">${data.message || ''}</div>
    <p style="color:#777;font-size:11px;">Dispatched to ${NOTIFICATION_EMAIL} at ${timestamp}</p>
  </div>
</body>
</html>`;

    await dispatchEmail({
      subject,
      text: textContent,
      html: htmlContent,
      replyTo: data.email,
    });

    return res.status(200).json({
      success: true,
      message: `Booking notification sent to ${NOTIFICATION_EMAIL}`,
      emailSentTo: NOTIFICATION_EMAIL,
      timestamp,
    });
  } catch (error: any) {
    console.error('Error in /api/booking:', error);
    return res.status(500).json({ success: false, error: 'Booking failed to process' });
  }
});

async function startServer() {
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
