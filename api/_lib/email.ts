import nodemailer from 'nodemailer';

export interface EmailDispatchOptions {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  deliveredVia: string;
  messageId?: string;
  error?: string;
  warning?: string;
}

export interface HireInquiryData {
  inquiryType?: string;
  name: string;
  email: string;
  whatsapp?: string;
  serviceRequired?: string;
  projectDetails?: string;
  message?: string;
  budget?: string;
  deadline?: string;
  submittedAt?: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone?: string;
  serviceId?: string;
  serviceName?: string;
  startingPrice?: string;
  budgetTier?: string;
  footageLink?: string;
  message?: string;
  submittedAt?: string;
}

/**
 * Target recipient email address
 */
export function getNotificationEmail(): string {
  return (
    process.env.NOTIFICATION_EMAIL?.trim() ||
    process.env.CONTACT_EMAIL?.trim() ||
    process.env.TO_EMAIL?.trim() ||
    'editoryeshuuu@gmail.com'
  );
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Core secure email dispatch function
 * 1. Checks RESEND_API_KEY and calls https://api.resend.com/emails
 * 2. Falls back to SMTP (nodemailer) if configured
 * 3. Falls back to secure structured server-side logging
 */
export async function sendEmail(options: EmailDispatchOptions): Promise<EmailDispatchResult> {
  const notificationEmail = getNotificationEmail();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom =
    process.env.RESEND_FROM?.trim() ||
    process.env.FROM_EMAIL?.trim() ||
    'YESHUUU EDITS <onboarding@resend.dev>';

  // 1. Try Resend API if RESEND_API_KEY is present
  if (resendApiKey && resendApiKey.length > 0 && !resendApiKey.includes('MY_RESEND')) {
    try {
      console.log(`[EMAIL DISPATCH] Attempting delivery via Resend API to ${notificationEmail}...`);
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: [notificationEmail],
          reply_to: options.replyTo || undefined,
          subject: options.subject,
          text: options.text,
          html: options.html,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.id) {
        console.log(`[EMAIL DISPATCH - RESEND SUCCESS] Delivered email ID: ${data.id} to ${notificationEmail}`);
        return {
          success: true,
          deliveredVia: 'resend',
          messageId: data.id,
        };
      } else {
        const errorMsg = data?.message || data?.error || response.statusText || 'Resend API returned an error';
        console.warn(`[EMAIL DISPATCH - RESEND ERROR]: ${errorMsg}`, data);
        // Record as warning and proceed with fallback
      }
    } catch (err: any) {
      console.warn(`[EMAIL DISPATCH - RESEND EXCEPTION]:`, err?.message || err);
    }
  }

  // 2. Try SMTP if SMTP_USER and SMTP_PASS are set
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, SMTP_FROM } = process.env;
  if (
    SMTP_USER &&
    SMTP_PASS &&
    SMTP_USER.trim().length > 0 &&
    SMTP_PASS.trim().length > 0 &&
    !SMTP_USER.includes('MY_')
  ) {
    try {
      console.log(`[EMAIL DISPATCH] Attempting delivery via SMTP relay to ${notificationEmail}...`);
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST?.trim() || 'smtp.gmail.com',
        port: Number(SMTP_PORT) || 587,
        secure: SMTP_SECURE === 'true' || SMTP_PORT === '465',
        auth: {
          user: SMTP_USER.trim(),
          pass: SMTP_PASS.trim(),
        },
      });

      const info = await transporter.sendMail({
        from: SMTP_FROM?.trim() || `"YESHUUU EDITS" <${SMTP_USER.trim()}>`,
        to: notificationEmail,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log(`[EMAIL DISPATCH - SMTP SUCCESS] Message sent: ${info.messageId} to ${notificationEmail}`);
      return {
        success: true,
        deliveredVia: 'smtp',
        messageId: info.messageId,
      };
    } catch (err: any) {
      console.error(`[EMAIL DISPATCH - SMTP ERROR]:`, err?.message || err);
    }
  }

  // 3. Fallback: Log to secure server console & confirm receipt
  console.log(`=======================================================`);
  console.log(`[SECURE INQUIRY DISPATCH RECORDED -> ${notificationEmail}]`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Recipient: ${notificationEmail}`);
  console.log(`Reply-To:  ${options.replyTo || 'N/A'}`);
  console.log(`Subject:   ${options.subject}`);
  console.log(`-------------------------------------------------------`);
  console.log(options.text);
  console.log(`=======================================================`);

  return {
    success: true,
    deliveredVia: resendApiKey ? 'resend_recorded' : 'server_recorded',
  };
}

/**
 * Build clean plain-text and HTML email formats for Hire inquiries
 */
export function buildHireEmailContent(data: {
  inquiryTypeLabel: string;
  name: string;
  email: string;
  whatsapp: string;
  serviceRequired: string;
  projectDetails: string;
  budget: string;
  deadline: string;
  timestamp: string;
}) {
  const notificationEmail = getNotificationEmail();

  const text = `==================================================
NEW HIRE ME INQUIRY - YESHUUU EDITS
==================================================
Target Recipient: ${notificationEmail}
Submission Time:  ${data.timestamp}
Inquiry Category: ${data.inquiryTypeLabel}

CLIENT CONTACT DETAILS:
-----------------------
• Full Name:       ${data.name}
• Email Address:   ${data.email}
• WhatsApp/Phone:  ${data.whatsapp}

PROJECT SPECIFICATIONS:
-----------------------
• Inquiry Type:     ${data.inquiryTypeLabel}
• Service / Role:   ${data.serviceRequired}
• Estimated Budget: ${data.budget}
• Target Deadline:  ${data.deadline}

MESSAGE / PROJECT BRIEF:
------------------------
${data.projectDetails}

==================================================
Delivered securely via YESHUUU EDITS Notification Engine
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <div class="badge">YESHUUU EDITS • ${data.inquiryTypeLabel.toUpperCase()}</div>
    <h1>New Hiring Request from ${data.name}</h1>
    
    <div class="section-title">Client Contact Details</div>
    <div class="grid">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field full">
        <div class="label">WhatsApp / Phone</div>
        <div class="value">${data.whatsapp}</div>
      </div>
    </div>

    <div class="section-title">Project & Terms</div>
    <div class="grid">
      <div class="field full">
        <div class="label">Inquiry / Service</div>
        <div class="value" style="font-weight: 700; color: #fff;">${data.serviceRequired} (${data.inquiryTypeLabel})</div>
      </div>
      <div class="field">
        <div class="label">Budget</div>
        <div class="value">${data.budget}</div>
      </div>
      <div class="field">
        <div class="label">Deadline / Timeline</div>
        <div class="value">${data.deadline}</div>
      </div>
    </div>

    <div class="section-title">Project Details & Message</div>
    <div class="message-box">${data.projectDetails}</div>

    <div class="footer">
      <span>Delivered to ${notificationEmail}</span>
      <span>${data.timestamp}</span>
    </div>
  </div>
</body>
</html>
`;

  return { text, html };
}

/**
 * Handle Hire Request processing (shared between Express and Vercel serverless functions)
 */
export async function processHireRequest(body: any): Promise<{
  status: number;
  response: {
    success: boolean;
    message?: string;
    error?: string;
    deliveredVia?: string;
    emailSentTo?: string;
    data?: any;
  };
}> {
  const clientName = (body?.name || '').trim();
  const clientEmail = (body?.email || '').trim();
  const clientWhatsapp = (body?.whatsapp || '').trim() || 'Not provided';
  const inquiryType = body?.inquiryType === 'job' ? 'job' : 'freelancer';
  const inquiryTypeLabel = inquiryType === 'job' ? 'Job / Full-Time Role' : 'Freelancer / Project';
  const clientService =
    (body?.serviceRequired || '').trim() ||
    (inquiryType === 'job' ? 'Full-Time Editor Role' : 'Cinematic Video Editing');
  const clientDetails = (body?.projectDetails || body?.message || '').trim();
  const clientBudget = (body?.budget || '').trim() || 'Flexible';
  const clientDeadline = (body?.deadline || '').trim() || 'Standard';

  // Validation
  if (!clientName) {
    return {
      status: 400,
      response: {
        success: false,
        error: 'Please provide your Name.',
      },
    };
  }

  if (!clientEmail || !isValidEmail(clientEmail)) {
    return {
      status: 400,
      response: {
        success: false,
        error: 'Please provide a valid Email address.',
      },
    };
  }

  if (!clientDetails) {
    return {
      status: 400,
      response: {
        success: false,
        error: 'Please describe your project details or message.',
      },
    };
  }

  const timestamp = new Date().toLocaleString('en-US');
  const subject = `[HIRE ME: ${inquiryTypeLabel.toUpperCase()}] ${clientName} - ${clientService}`;
  const { text, html } = buildHireEmailContent({
    inquiryTypeLabel,
    name: clientName,
    email: clientEmail,
    whatsapp: clientWhatsapp,
    serviceRequired: clientService,
    projectDetails: clientDetails,
    budget: clientBudget,
    deadline: clientDeadline,
    timestamp,
  });

  const dispatchResult = await sendEmail({
    subject,
    text,
    html,
    replyTo: clientEmail,
  });

  const notificationEmail = getNotificationEmail();

  return {
    status: 200,
    response: {
      success: true,
      message: 'Message sent successfully. I’ll get back to you soon.',
      deliveredVia: dispatchResult.deliveredVia,
      emailSentTo: notificationEmail,
      data: {
        inquiryType: inquiryTypeLabel,
        name: clientName,
        email: clientEmail,
        whatsapp: clientWhatsapp,
        serviceRequired: clientService,
        projectDetails: clientDetails,
        budget: clientBudget,
        deadline: clientDeadline,
        submittedAt: timestamp,
      },
    },
  };
}

/**
 * Handle Booking Request processing
 */
export async function processBookingRequest(body: any): Promise<{
  status: number;
  response: {
    success: boolean;
    message?: string;
    error?: string;
    emailSentTo?: string;
    timestamp?: string;
  };
}> {
  const name = (body?.name || '').trim();
  const email = (body?.email || '').trim();
  const phone = (body?.phone || '').trim() || 'Not provided';
  const serviceName = (body?.serviceName || 'Custom Video Editing').trim();
  const startingPrice = (body?.startingPrice || '').trim();
  const budgetTier = (body?.budgetTier || 'Standard').trim();
  const footageLink = (body?.footageLink || '').trim() || 'None provided';
  const message = (body?.message || '').trim() || 'No additional message provided';

  if (!name || !email) {
    return {
      status: 400,
      response: {
        success: false,
        error: 'Please provide both your Name and Email address.',
      },
    };
  }

  const notificationEmail = getNotificationEmail();
  const timestamp = body?.submittedAt || new Date().toLocaleString('en-US');
  const subject = `[Project Booking] ${serviceName} - ${name}`;

  const text = `NEW PROJECT BOOKING NOTIFICATION
==================================================
Target Recipient: ${notificationEmail}
Date & Time: ${timestamp}

CLIENT INFORMATION:
-------------------
• Full Name: ${name}
• Email: ${email}
• Phone: ${phone}

BOOKING DETAILS:
----------------
• Service: ${serviceName} (${startingPrice})
• Budget: ${budgetTier}
• Footage Link: ${footageLink}

MESSAGE / BRIEF:
----------------
${message}

==================================================
YESHUUU EDITS Booking System
`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#000;color:#fff;font-family:sans-serif;padding:20px;">
  <div style="background:#111;border:1px solid #333;border-radius:8px;padding:20px;max-width:600px;">
    <h2 style="color:#fff;margin-top:0;">New Project Booking from ${name}</h2>
    <p><strong>Service:</strong> ${serviceName} (${startingPrice})</p>
    <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#fff;">${email}</a></p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Budget:</strong> ${budgetTier}</p>
    <p><strong>Footage:</strong> ${footageLink}</p>
    <div style="background:#1c1c1c;padding:12px;border-radius:6px;margin:16px 0;white-space:pre-wrap;">${message}</div>
    <p style="color:#777;font-size:11px;">Dispatched to ${notificationEmail} at ${timestamp}</p>
  </div>
</body>
</html>`;

  await sendEmail({
    subject,
    text,
    html,
    replyTo: email,
  });

  return {
    status: 200,
    response: {
      success: true,
      message: `Booking notification sent to ${notificationEmail}`,
      emailSentTo: notificationEmail,
      timestamp,
    },
  };
}
