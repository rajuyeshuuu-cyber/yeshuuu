import { getNotificationEmail } from './_lib/email';

export default async function handler(req: any, res: any) {
  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  return res.status(200).json({
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
}
