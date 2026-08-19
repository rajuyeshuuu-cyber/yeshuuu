import { processHireRequest } from './_lib/email';

export default async function handler(req: any, res: any) {
  // Support CORS for serverless calls if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please send a POST request with JSON payload.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { status, response } = await processHireRequest(body);
    return res.status(status).json(response);
  } catch (error: any) {
    console.error('Unhandled error in api/hire handler:', error);
    return res.status(500).json({
      success: false,
      error: `Server internal error: ${error?.message || 'Failed to process inquiry'}`,
    });
  }
}
