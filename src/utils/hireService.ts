import { HiringRequestPayload, HireSubmissionResponse } from '../types';

export const HIRE_NOTIFICATION_EMAIL = 'editoryeshuuu@gmail.com';

export const SERVICE_OPTIONS = [
  'Cinematic Video Editing (Long-form / Film)',
  'Color Grading & Film Look (DaVinci Resolve)',
  'High-Retention Reels / Shorts / TikTok',
  'Commercial Ad & Brand Promo Campaign',
  'YouTube Video Post-Production',
  'Trailers & Teasers',
  'Motion Graphics & 3D Typography',
  'Sound Design & Audio Mastering',
  'Full-Time / In-House Editor Role',
  'Other / Custom Project',
];

export const BUDGET_OPTIONS = [
  'Under $500 (Small project / single short)',
  '$500 - $1,500 (Standard commercial / reel pack)',
  '$1,500 - $3,500 (Full-scale campaign / docu-style)',
  '$3,500 - $7,000+ (High-end production / retainer)',
  'Custom / Discuss during consultation',
];

export const DEADLINE_OPTIONS = [
  'Urgent (24 - 48 Hours)',
  'Within 1 Week',
  '2 - 3 Weeks',
  '1 Month / Long-term project',
  'Flexible / Ongoing retainer',
];

/**
 * Send full Hiring Request / Inquiry to backend email delivery service
 */
export async function sendHiringRequest(
  payload: HiringRequestPayload & { inquiryType?: string; message?: string }
): Promise<HireSubmissionResponse> {
  const now = new Date();
  const formattedDateTime = now.toLocaleString('en-US');

  const fullPayload = {
    inquiryType: payload.inquiryType || 'freelancer',
    name: payload.name.trim(),
    email: payload.email.trim(),
    whatsapp: (payload.whatsapp || '').trim(),
    serviceRequired: (payload.serviceRequired || '').trim(),
    projectDetails: (payload.projectDetails || payload.message || '').trim(),
    message: (payload.projectDetails || payload.message || '').trim(),
    budget: (payload.budget || '').trim() || 'Flexible',
    deadline: (payload.deadline || '').trim() || 'Standard',
    submittedAt: formattedDateTime,
    targetEmail: HIRE_NOTIFICATION_EMAIL,
  };

  try {
    const response = await fetch('/api/hire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullPayload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      const errorMsg =
        result.error ||
        result.message ||
        'Unable to deliver your message to the server. Please check your connection and try again.';
      return {
        success: false,
        message: 'Delivery failed',
        error: errorMsg,
      };
    }

    return {
      success: true,
      message: result.message || 'Message sent successfully. I’ll get back to you soon.',
      emailSentTo: HIRE_NOTIFICATION_EMAIL,
      deliveredVia: result.deliveredVia || 'server',
      data: fullPayload,
    };
  } catch (err: any) {
    console.error('Failed to connect to email backend service:', err);
    return {
      success: false,
      message: 'Network delivery failed',
      error:
        'Could not establish connection with the server. Please verify your connection or try again.',
    };
  }
}

export async function sendHireInquiry(data: {
  inquiryType?: string;
  name: string;
  email: string;
  whatsapp?: string;
  serviceRequired?: string;
  message?: string;
  projectDetails?: string;
  budget?: string;
  deadline?: string;
}): Promise<HireSubmissionResponse> {
  return sendHiringRequest({
    inquiryType: data.inquiryType,
    name: data.name,
    email: data.email,
    whatsapp: data.whatsapp || 'Not provided',
    serviceRequired:
      data.serviceRequired ||
      (data.inquiryType === 'job' ? 'Full-Time / In-House Editor Role' : 'Cinematic Video Editing'),
    projectDetails: data.projectDetails || data.message || '',
    message: data.projectDetails || data.message || '',
    budget: data.budget || 'Standard / Flexible',
    deadline: data.deadline || 'Standard',
  });
}
