import { ServiceItem, PortfolioItem, Testimonial, ProcessStep } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'video-editing',
    name: 'VIDEO EDITING',
    shortDescription: 'Precision cuts, seamless transitions, and balanced audio for clean, polished video narratives.',
    fullDescription: 'Professional post-production designed to turn your raw, unorganized footage into structured, engaging stories. Engineered with precision pacing, seamless audio synchronization, noise cleanup, and optimized exports ready for broadcast and web.',
    startingPrice: '₹999',
    priceValue: 999,
    includes: [
      'Clean cuts',
      'Music synchronization',
      'Basic color correction',
      'Sound cleanup',
      'Professional export'
    ],
    tagline: 'Streamlined, punchy and broadcast-ready video assembly',
    iconName: 'Scissors',
    turnaround: '24-48 Hours',
    deliverables: 'Full HD / 4K Master Video File, Project Revisions'
  },
  {
    id: 'cinematic-editing',
    name: 'CINEMATIC EDITING',
    shortDescription: 'Film-grade storytelling with atmospheric color grading, dramatic pacing, and immersive sound design.',
    fullDescription: 'Elevate your footage into high-art cinematic experiences. Featuring customized film-emulation color grading, meticulous narrative pacing, multi-layered atmospheric soundscapes, dynamic transitions, and bespoke visual effects that evoke deep emotion.',
    startingPrice: '₹1,499',
    priceValue: 1499,
    includes: [
      'Cinematic pacing',
      'Color grading',
      'Sound design',
      'Cinematic transitions',
      'Visual effects'
    ],
    tagline: 'High-emotion visual storytelling and film color science',
    iconName: 'Film',
    turnaround: '48-72 Hours',
    deliverables: '4K Ultra HD Master, Custom LUT Grade, Stems & Audio Track'
  },
  {
    id: 'trailer-editing',
    name: 'TRAILER EDITING',
    shortDescription: 'High-voltage teaser and trailer structures crafted to build suspense, maximize hype, and grip viewers.',
    fullDescription: 'Crafted around industry-standard 3-act trailer pacing. We build high-tension risers, earth-shaking sound impacts, dramatic beat-drops, custom theatrical title cards, and adrenaline-fueled cutdowns engineered to command total audience attention.',
    startingPrice: '₹1,999',
    priceValue: 1999,
    includes: [
      'Trailer structure',
      'Dramatic pacing',
      'Music synchronization',
      'Cinematic sound design',
      'Titles and transitions'
    ],
    tagline: 'Adrenaline-fueled theatrical cuts and tension-building arcs',
    iconName: 'Clapperboard',
    turnaround: '3-4 Days',
    deliverables: 'Theatrical Cut (16:9), Teaser Cut (9:16), High-Impact Master'
  },
  {
    id: 'reels-shorts-editing',
    name: 'REELS / SHORTS EDITING',
    shortDescription: 'High-retention vertical edits with dynamic animated captions, sound effects, and viral hook pacing.',
    fullDescription: 'Engineered specifically for short-form retention on Instagram Reels, YouTube Shorts, and TikTok algorithms. Includes 3-second hook optimization, kinetic typography captions, micro-zooms, curated trending sound effects, and seamless vertical framing.',
    startingPrice: '₹499',
    priceValue: 499,
    includes: [
      'Fast-paced editing',
      'Captions',
      'Music synchronization',
      'Social-media-friendly formatting',
      'Basic motion graphics'
    ],
    tagline: 'Algorithm-optimized vertical cuts with 85%+ retention hooks',
    iconName: 'Smartphone',
    turnaround: '12-24 Hours',
    deliverables: '1080x1920 Vertical HD File, Burned-in Animated Captions'
  },
  {
    id: 'commercial-editing',
    name: 'COMMERCIAL EDITING',
    shortDescription: 'High-converting brand films and ad creatives tailored to drive brand authority and customer action.',
    fullDescription: 'High-converting ad films and corporate brand narratives. Tailored to captivate target audiences, communicate product value propositions clearly, and integrate commercial color grading, voiceover mastering, and slick kinetic motion graphics.',
    startingPrice: '₹2,999',
    priceValue: 2999,
    includes: [
      'Professional storytelling',
      'Brand-focused editing',
      'Color correction',
      'Sound design',
      'Motion graphics'
    ],
    tagline: 'Conversion-driven ad creatives and premium brand identity films',
    iconName: 'Briefcase',
    turnaround: '3-5 Days',
    deliverables: 'Multi-Aspect Ad Formats (16:9, 1:1, 9:16), High-Res Master'
  },
  {
    id: 'motion-graphics',
    name: 'MOTION GRAPHICS',
    shortDescription: 'Dynamic vector animations, kinetic typography, smooth transitions, and bespoke visual assets.',
    fullDescription: 'Give your video brand signature motion identity. Featuring customized logo animations, fluid vector motion graphics, animated lower thirds, Kinetic 2D/3D typography, visual explainer elements, and high-impact custom transitions.',
    startingPrice: '₹1,499',
    priceValue: 1499,
    includes: [
      'Animated titles',
      'Logo animation',
      'Motion typography',
      'Smooth transitions',
      'Basic visual effects'
    ],
    tagline: 'Fluid kinetic design, logo idents, and custom graphic packages',
    iconName: 'Sparkles',
    turnaround: '48-72 Hours',
    deliverables: 'Alpha Transparent MOV Overlays, 4K Master MP4, Vector Source'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-color-grade-01',
    title: 'CINEMATIC FILM EMULATION - Master Grade',
    category: 'Colour Grading',
    client: 'Yeshuuu Creative Studio',
    duration: '00:08',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/color-grade-01.mp4',
    aspectRatio: '16:9',
    views: '1.8M',
    description: 'High-precision DaVinci Resolve color grading showcasing dynamic range recovery, rich film tones, accurate skin tone balance, and customized cinematic LUTs.',
    tags: ['Colour Grading', 'DaVinci Resolve', 'Film LUT', '4K Master']
  },
  {
    id: 'port-1',
    title: 'THE NIGHT WALKER - Cinematic Teaser',
    category: 'Cinematic',
    client: 'Apex Studios',
    duration: '01:45',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    views: '1.2M',
    description: 'An atmospheric neo-noir short film edit with heavy teal-orange color grading and deep ambient soundscapes.',
    tags: ['DaVinci Resolve', 'Sound Design', 'Film Grade']
  },
  {
    id: 'port-2',
    title: 'AURA LUXURY TIMEPIECE - Brand Film',
    category: 'Commercial',
    client: 'Aura Horology',
    duration: '00:45',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    views: '850K',
    description: 'High-end commercial featuring macro speed ramps, pristine metallic lighting correction, and premium sonic texture.',
    tags: ['Premiere Pro', 'Commercial Color', 'Speed Ramps']
  },
  {
    id: 'port-3',
    title: 'THE LAST PROTOCOL - Sci-Fi Trailer',
    category: 'Trailers',
    client: 'Vanguard Pictures',
    duration: '02:10',
    thumbnail: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    views: '2.4M',
    description: '3-act theatrical trailer cut with heavy sub-bass hits, dramatic silence gaps, and synchronized kinetic title transitions.',
    tags: ['Trailer Arc', 'Impact SFX', 'After Effects']
  },
  {
    id: 'port-4',
    title: 'STREET CYBERPUNK - Viral Reel Sequence',
    category: 'Reels',
    client: '@NeonVoyager',
    duration: '00:30',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '9:16',
    views: '4.8M',
    description: 'Ultra fast-paced vertical edit featuring seamless whip pans, glow typography captions, and bass-boosted beat drops.',
    tags: ['Viral Hook', 'Animated Captions', '9:16 4K']
  },
  {
    id: 'port-5',
    title: 'NEXUS TECH IDENTITY - 3D Logo & Ident',
    category: 'Motion',
    client: 'Nexus Global',
    duration: '00:15',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    views: '420K',
    description: 'Futuristic geometric logo reveal with metallic particle dispersion, chromatic aberration, and clean minimal typography.',
    tags: ['Motion Graphics', 'Logo Reveal', 'After Effects']
  },
  {
    id: 'port-6',
    title: 'FOUNDER CHRONICLES - High Retention Series',
    category: 'Reels',
    client: 'Startup Daily',
    duration: '00:45',
    thumbnail: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '9:16',
    views: '3.1M',
    description: 'Story-driven talking head short with dynamic B-roll cutaways, sound effects, and word-by-word highlighted captions.',
    tags: ['Alex Hormozi Style', 'Sound Effects', 'Retention Edit']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'FOOTAGE & BRIEF',
    description: 'Send your raw footage via Google Drive, Dropbox, or Frame.io along with your creative vision, references, and deadline.',
    details: ['Secure cloud transfer', 'Creative brief review', 'Asset organization']
  },
  {
    stepNumber: '02',
    title: 'STORY CUT & PACING',
    description: 'We craft the backbone: selecting the strongest takes, rhythm-matching the music, and building emotional momentum.',
    details: ['A-roll & B-roll curation', 'Beat-matched cuts', 'Initial rough cut review']
  },
  {
    stepNumber: '03',
    title: 'COLOR & SOUND DESIGN',
    description: 'The magic layer: cinematic color grading, custom LUT application, Foley sound effects, risers, and vocal mastering.',
    details: ['DaVinci color grading', 'Atmospheric Foley & SFX', 'Stereo & spatial balance']
  },
  {
    stepNumber: '04',
    title: 'POLISH & 4K DELIVERY',
    description: 'Final touches, seamless motion graphics, title cards, client revisions, and high-bitrate broadcast master exports.',
    details: ['Multi-platform formats', 'Fast revision round', 'Master file delivery']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aarav Sharma',
    role: 'YouTuber (850K+ Subscribers)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Yeshuuu completely transformed my channel retention. The cinematic sound design and razor-sharp cuts took my videos from ordinary to Netflix-grade quality. Delivery was always ahead of schedule.',
    projectType: 'Cinematic & Shorts Editing'
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'Creative Director at Horizon Media',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'We hired Yeshuuu for our product launch commercial. The motion graphics and color grading were exceptional. It felt like a multi-thousand-dollar agency production for an unbeatable value.',
    projectType: 'Commercial Editing'
  },
  {
    id: 'test-3',
    name: 'Vikram Mehta',
    role: 'Independent Filmmaker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The trailer Yeshuuu edited for our indie film generated over 2 million organic views on YouTube and secured our distribution deal. The dramatic pacing and music synchronization are top tier.',
    projectType: 'Trailer Editing'
  }
];
