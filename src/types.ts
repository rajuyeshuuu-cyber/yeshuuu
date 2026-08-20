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
  portfolioCategory: PortfolioCategory;
}

export type PortfolioCategory =
  | 'Reels'
  | 'Corporate Ads'
  | 'Trailer Cuts'
  | 'AI Videos'
  | 'Posters'
  | 'Banners'
  | 'Thumbnails';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  mediaType: 'video' | 'image';
  client: string;
  duration?: string;
  thumbnail: string;
  aspectRatio: '16:9' | '9:16' | '3:4' | '21:9' | '4:5' | '1:1';
  views?: string;
  description: string;
  tags: string[];
  videoUrl?: string;
  poster?: string;
  resolution?: string;
  software?: string[];
  dimensions?: string;
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

export type HireInquiryType = 'freelancer' | 'job' | 'custom_project';

export interface HiringRequestPayload {
  name: string;
  email: string;
  whatsapp: string;
  serviceRequired: string;
  projectDetails: string;
  budget: string;
  deadline: string;
  submittedAt?: string;
  targetEmail?: string;
}

export interface HireSubmissionResponse {
  success: boolean;
  message: string;
  error?: string;
  emailSentTo?: string;
  deliveredVia?: string;
  data?: HiringRequestPayload;
}
