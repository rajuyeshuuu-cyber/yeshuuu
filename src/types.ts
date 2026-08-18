export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: string;
  priceValue: number;
  includes: string[];
  tagline: string;
  iconName: string;
  turnaround: string;
  deliverables: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Cinematic' | 'Reels' | 'Commercial' | 'Trailers' | 'Motion';
  client: string;
  duration: string;
  thumbnail: string;
  aspectRatio: '16:9' | '9:16';
  views?: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  projectType: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  details: string[];
}

export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  startingPrice: string;
  budgetTier: string;
  footageLink: string;
  message: string;
  submittedAt: string;
  targetEmail: string;
}

export interface BookingNotificationResponse {
  success: boolean;
  message: string;
  notification: BookingSubmission;
  emailSentTo: string;
}

