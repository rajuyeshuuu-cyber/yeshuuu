import { ServiceItem, PortfolioItem, Testimonial, ProcessStep } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'reels-editing',
    name: 'Reels Editing',
    shortDescription: 'Professional short-form video editing for Instagram Reels, YouTube Shorts and social media content.',
    fullDescription: 'Professional short-form video editing engineered for maximum retention on Instagram Reels, YouTube Shorts, and social media platforms with kinetic captions, pacing, and trending audio.',
    startingPrice: '₹999',
    priceValue: 999,
    includes: [
      'High-retention pacing',
      'Dynamic animated captions',
      'Music & sound effects',
      'Vertical 9:16 framing',
      'Color correction & export'
    ],
    tagline: 'Algorithm-optimized vertical cuts with high viewer retention',
    iconName: 'Smartphone',
    turnaround: '24-48 Hours',
    deliverables: '1080x1920 Full HD Vertical MP4, Master Revisions',
    portfolioCategory: 'Reels'
  },
  {
    id: 'corporate-ads',
    name: 'Corporate Ads',
    shortDescription: 'Professional promotional and advertising video editing for businesses, brands and products.',
    fullDescription: 'High-converting brand films and commercial video ads designed to establish brand authority, showcase products, and drive customer action across digital platforms.',
    startingPrice: '₹2,999',
    priceValue: 2999,
    includes: [
      'Brand narrative structuring',
      'Commercial color grading',
      'Voiceover & sound mastering',
      'Product callouts & typography',
      'Multi-aspect ratio outputs'
    ],
    tagline: 'Conversion-focused corporate promos and commercial brand ads',
    iconName: 'Briefcase',
    turnaround: '3-5 Days',
    deliverables: '4K Ultra HD Commercial Master (16:9 & 9:16 versions)',
    portfolioCategory: 'Corporate Ads'
  },
  {
    id: 'trailer-editing',
    name: 'Trailer Editing',
    shortDescription: 'Cinematic trailer editing with strong pacing, music synchronization, transitions and storytelling.',
    fullDescription: 'Theatrical-grade teasers and trailers engineered with 3-act tension curves, sound design impacts, beat drops, and dramatic narrative pacing.',
    startingPrice: '₹2,499',
    priceValue: 2499,
    includes: [
      '3-Act trailer structure',
      'Cinematic sound design & hits',
      'Music beat synchronization',
      'Dramatic title cards',
      'DaVinci Resolve color finish'
    ],
    tagline: 'Adrenaline-fueled theatrical cuts and cinematic storytelling',
    iconName: 'Clapperboard',
    turnaround: '3-4 Days',
    deliverables: 'Theatrical Cut (16:9 4K Master), Teaser Cut (9:16 HD)',
    portfolioCategory: 'Trailer Cuts'
  },
  {
    id: 'ai-video-editing',
    name: 'AI Video Editing',
    shortDescription: 'Creative AI-assisted video editing for modern social media, promotional and creative content.',
    fullDescription: 'Next-generation AI video post-production blending cutting-edge generative visuals, AI upscaling, voice enhancement, and creative pacing for futuristic content.',
    startingPrice: '₹1,999',
    priceValue: 1999,
    includes: [
      'AI visual generation & upscale',
      'Generative sequence transitions',
      'AI voice audio enhancement',
      'Dynamic rhythm synchronization',
      'Creative aesthetic styling'
    ],
    tagline: 'Futuristic AI workflows and generative visual storytelling',
    iconName: 'Bot',
    turnaround: '48-72 Hours',
    deliverables: '4K Master Video File, AI Assets & Stems',
    portfolioCategory: 'AI Videos'
  },
  {
    id: 'poster-design',
    name: 'Poster Design',
    shortDescription: 'Professional promotional and social media poster designs with clean visual composition.',
    fullDescription: 'High-impact key visual posters for events, social media campaigns, brand launches, and film releases with balanced typography and visual hierarchy.',
    startingPrice: '₹499',
    priceValue: 499,
    includes: [
      'High-resolution key visual design',
      'Custom typography layout',
      'Color harmonization',
      'Print & digital ready formats',
      'Source asset export'
    ],
    tagline: 'Compelling key visuals and promotional graphic art',
    iconName: 'Image',
    turnaround: '24-48 Hours',
    deliverables: '300 DPI Print PDF & High-Res PNG / JPG',
    portfolioCategory: 'Posters'
  },
  {
    id: 'banner-design',
    name: 'Banner Design',
    shortDescription: 'Professional digital banners for brands, businesses, promotions and online platforms.',
    fullDescription: 'Sleek panoramic banners crafted for websites, YouTube channel art, LinkedIn headers, Twitter/X profiles, and promotional ad placements.',
    startingPrice: '₹499',
    priceValue: 499,
    includes: [
      'Ultra-wide panoramic layout',
      'Platform-safe zone compliance',
      'Brand identity alignment',
      'High-contrast visual styling',
      'Multi-platform sizing'
    ],
    tagline: 'Ultra-wide digital headers and brand hero banners',
    iconName: 'Layers',
    turnaround: '24-48 Hours',
    deliverables: 'Full-Res Web & Social Banners (21:9 & custom dimensions)',
    portfolioCategory: 'Banners'
  },
  {
    id: 'thumbnail-design',
    name: 'Thumbnail Design',
    shortDescription: 'Eye-catching YouTube and social media thumbnails designed to make content stand out.',
    fullDescription: 'High-CTR YouTube and social media thumbnails optimized with punchy expressions, bold readable typography, high-contrast separation, and visual click triggers.',
    startingPrice: '₹499',
    priceValue: 499,
    includes: [
      'High-CTR visual composition',
      'Subject cutout & rim lighting',
      'Bold readable typography',
      'Color saturation & contrast polish',
      'Mobile preview optimization'
    ],
    tagline: 'High-CTR clickable thumbnails engineered for maximum views',
    iconName: 'Sparkles',
    turnaround: '12-24 Hours',
    deliverables: '1280x720 & 1920x1080 High-Res JPG/PNG (under 2MB ready)',
    portfolioCategory: 'Thumbnails'
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // --- 1. REELS (5 projects) ---
  {
    id: 'reel-1',
    title: 'STREET CYBERPUNK - Viral Kinetic Reel',
    category: 'Reels',
    mediaType: 'video',
    client: '@NeonVoyager',
    duration: '00:30',
    views: '4.8M',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '9:16',
    description: 'Ultra fast-paced vertical edit featuring seamless whip pans, glow typography captions, and bass-boosted beat drops.',
    tags: ['Viral Hook', 'Dynamic Captions', 'Sound FX', '9:16 4K']
  },
  {
    id: 'reel-2',
    title: 'FOUNDER CHRONICLES - High Retention Series',
    category: 'Reels',
    mediaType: 'video',
    client: 'Startup Daily',
    duration: '00:45',
    views: '3.1M',
    thumbnail: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '9:16',
    description: 'Story-driven talking head short with dynamic B-roll cutaways, sound effects, and word-by-word highlighted captions.',
    tags: ['Retention Edit', 'B-Roll Cutaways', 'Dynamic SFX', 'Story Arc']
  },
  {
    id: 'reel-3',
    title: 'URBAN DRIFT & APPAREL - Fashion Showcase',
    category: 'Reels',
    mediaType: 'video',
    client: 'Aesthetic Vault',
    duration: '00:24',
    views: '2.2M',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '9:16',
    description: 'High-octane streetwear lookbook reel featuring hyper-smooth speed ramps, chromatic splits, and rhythmic beat sync.',
    tags: ['Fashion Grade', 'Speed Ramp', 'Rhythm Sync', 'Motion Titles']
  },
  {
    id: 'reel-4',
    title: 'FINANCE & WEALTH PROTOCOL - Educational Short',
    category: 'Reels',
    mediaType: 'video',
    client: 'Apex Capital',
    duration: '00:50',
    views: '1.9M',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '9:16',
    description: 'Visual financial breakdown featuring kinetic numbers, 3D infographic pop-ups, and punchy audio cues.',
    tags: ['Kinetic Typography', 'Motion Graphics', 'Sound Design', 'Explainer']
  },
  {
    id: 'reel-5',
    title: 'FITNESS MATRIX - High-Impact Motivation',
    category: 'Reels',
    mediaType: 'video',
    client: 'Ironclad Athletics',
    duration: '00:28',
    views: '5.4M',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '9:16',
    description: 'Hard-hitting workout reel with heavy impact tremors, motion blur transitions, and sub-bass audio mastering.',
    tags: ['High Energy', 'Aggressive SFX', 'Film Emulation', 'Hard Cuts']
  },

  // --- 2. CORPORATE ADS (2 projects) ---
  {
    id: 'corp-1',
    title: 'AURA LUXURY TIMEPIECE - Commercial Brand Film',
    category: 'Corporate Ads',
    mediaType: 'video',
    client: 'Aura Horology',
    duration: '00:45',
    views: '850K',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'High-end commercial featuring macro speed ramps, pristine metallic lighting correction, and premium sonic texture.',
    tags: ['Commercial Grade', 'Macro Ramps', 'Sound Texture', '4K Master']
  },
  {
    id: 'corp-2',
    title: 'NEXUS ENTERPRISE CLOUD - Global Product Keynote Ad',
    category: 'Corporate Ads',
    mediaType: 'video',
    client: 'Nexus Cloud Global',
    duration: '01:15',
    views: '1.1M',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Sophisticated enterprise commercial blending sleek product interface animations, executive interviews, and cinematic architectural B-roll.',
    tags: ['B2B Commercial', 'Product Launch', 'Clean VFX', 'Corporate Story']
  },

  // --- 3. TRAILER CUTS (1 project) ---
  {
    id: 'trailer-1',
    title: 'THE LAST PROTOCOL - Sci-Fi Theatrical Cut',
    category: 'Trailer Cuts',
    mediaType: 'video',
    client: 'Vanguard Pictures',
    duration: '02:10',
    views: '2.4M',
    thumbnail: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/color-grade-01.mp4',
    aspectRatio: '16:9',
    description: '3-act theatrical trailer cut featuring master DaVinci Resolve color grading, sub-bass riser impacts, dramatic pacing, and synchronized title transitions.',
    tags: ['DaVinci Resolve', 'Master Color Grade', 'Impact SFX', 'Trailer Arc']
  },

  // --- 4. AI VIDEOS (2 projects) ---
  {
    id: 'ai-1',
    title: 'NEO-TOKYO 2099 - Generative World Cinematic',
    category: 'AI Videos',
    mediaType: 'video',
    client: 'Cyberverse Labs',
    duration: '01:00',
    views: '1.6M',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Futuristic sci-fi short created with cutting-edge AI generative video pipelines, camera motion consistency, and orchestral sound design.',
    tags: ['Runway Gen-3', 'Midjourney VFX', 'Upscaling 4K', 'AI Film']
  },
  {
    id: 'ai-2',
    title: 'SYNTHETIC DREAMS - Surrealist Fashion Spec Film',
    category: 'AI Videos',
    mediaType: 'video',
    client: 'Avant Studio',
    duration: '00:40',
    views: '920K',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Surrealist avant-garde visual piece with AI style transfers, fluid garment morphing, and atmospheric spatial audio.',
    tags: ['AI Animation', 'Morphing Transitions', 'Fluid Motion', 'Style Transfer']
  },

  // --- 5. POSTERS (5 projects) ---
  {
    id: 'poster-1',
    title: 'OBSIDIAN SOUND FESTIVAL - Theatrical Key Visual',
    category: 'Posters',
    mediaType: 'image',
    client: 'Obsidian Live',
    dimensions: '24x36 in (300 DPI)',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: '3:4',
    description: 'Dark brutalist typography and chrome-finish 3D layout for international electronic music festival key visual.',
    tags: ['Photoshop', 'Key Art', 'Typography', 'Print Ready']
  },
  {
    id: 'poster-2',
    title: 'CHRONO TRIGGER CINEMA - Official Screening Poster',
    category: 'Posters',
    mediaType: 'image',
    client: 'Midnight Film Club',
    dimensions: '27x40 in One-Sheet',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: '3:4',
    description: 'Retro-futuristic neo-noir movie poster featuring textured halftone gradients and custom serif letterforms.',
    tags: ['Cinema One-Sheet', 'Duotone', 'Film Grain', 'Layout Design']
  },
  {
    id: 'poster-3',
    title: 'VELOCITY AUTOMOTIVE EXPO - Headline Art',
    category: 'Posters',
    mediaType: 'image',
    client: 'Apex GT Series',
    dimensions: 'A1 International',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: '3:4',
    description: 'High-contrast motorsport poster highlighting aerodynamic contours with dynamic typography and speed lines.',
    tags: ['Vector Graphics', 'Brand Identity', 'Motion Blur', 'Editorial']
  },
  {
    id: 'poster-4',
    title: 'CYBER CITY PROTOCOL - Sci-Fi Exhibition Poster',
    category: 'Posters',
    mediaType: 'image',
    client: 'NeoTokyo Arts',
    dimensions: '18x24 in Print',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: '3:4',
    description: 'Holographic neon cityscape exhibition poster with Japanese typography overlays and metallic foil elements.',
    tags: ['3D Render', 'Holographic', 'Poster Art', 'After Effects Key']
  },
  {
    id: 'poster-5',
    title: 'ECLIPSE ARCHITECTURE SUMMIT - Minimalist Key Art',
    category: 'Posters',
    mediaType: 'image',
    client: 'Nordic Design Council',
    dimensions: 'A2 Format',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: '3:4',
    description: 'Architectural design summit poster utilizing disciplined Swiss grid systems, concrete texture accents, and negative space.',
    tags: ['Minimalist', 'Swiss Grid', 'Architectural', 'Clean Type']
  },

  // --- 6. BANNERS (5 projects) ---
  {
    id: 'banner-1',
    title: 'APEX ESPORTS CHAMPIONSHIP - Official Web & Stream Banner',
    category: 'Banners',
    mediaType: 'image',
    client: 'Apex Gaming',
    dimensions: '1920x1080 / Wide 21:9',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '21:9',
    description: 'Electrifying wide-format championship banner with character composition, neon glow elements, and tournament sponsor locks.',
    tags: ['Web Banner', 'Esports Branding', 'Character Key', 'High Impact']
  },
  {
    id: 'banner-2',
    title: 'VALKYRIE STREAM SUITE - YouTube & Twitch Channel Header',
    category: 'Banners',
    mediaType: 'image',
    client: '@ValkyrieLive',
    dimensions: '2560x1440 Master Header',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '21:9',
    description: 'Cohesive streaming header suite featuring metallic 3D typography, schedule layout, and dark aesthetic gradients.',
    tags: ['Channel Art', 'Social Banner', 'Branding', 'Custom 3D']
  },
  {
    id: 'banner-3',
    title: 'HORIZON SOUNDTRACK LAUNCH - Billboard & Spotify Header',
    category: 'Banners',
    mediaType: 'image',
    client: 'Horizon Records',
    dimensions: '3840x1200 Ultra-Wide',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '21:9',
    description: 'Panoramic album release banner designed for digital billboards, Spotify artist headers, and social media promotions.',
    tags: ['Music Release', 'Billboard', 'Spotify Canvas', 'Wide Banner']
  },
  {
    id: 'banner-4',
    title: 'KURO CYBERPUNK MERCH DROP - E-Commerce Hero Banner',
    category: 'Banners',
    mediaType: 'image',
    client: 'Kuro Clothing Co.',
    dimensions: '2400x1000 Web Banner',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '21:9',
    description: 'High-conversion e-commerce hero banner highlighting apparel models, cybernetic graphic badges, and limited drop countdown.',
    tags: ['E-Commerce', 'Hero Header', 'Product Showcase', 'Promo Art']
  },
  {
    id: 'banner-5',
    title: 'EDITCRAFT ACADEMY - YouTube & Web Academy Header',
    category: 'Banners',
    mediaType: 'image',
    client: 'EditCraft Academy',
    dimensions: '2560x1440 Header',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85',
    aspectRatio: '21:9',
    description: 'Sleek dark-mode masterclass promo banner with software icons, glowing timeline graphics, and clean bold headline.',
    tags: ['Course Banner', 'YouTube Header', 'Typography', 'Dark UI']
  },

  // --- 7. THUMBNAILS (5 projects) ---
  {
    id: 'thumb-1',
    title: 'I EDITED FOR A $10M CREATOR (HERE IS WHAT HAPPENED)',
    category: 'Thumbnails',
    mediaType: 'image',
    client: 'Viral Visionary',
    views: '1.4M',
    dimensions: '1280x720 (16:9)',
    thumbnail: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '16:9',
    description: 'High-click-through YouTube thumbnail with hyper-saturated subject cutouts, 3D text extrusions, and curiosity-driven visual contrast.',
    tags: ['High CTR', 'Expression Cutout', 'Glow Stroke', 'Color Pop']
  },
  {
    id: 'thumb-2',
    title: 'DAVINCI RESOLVE SECRETS NOBODY TALKS ABOUT',
    category: 'Thumbnails',
    mediaType: 'image',
    client: 'ColorMaster Studio',
    views: '820K',
    dimensions: '1280x720 (16:9)',
    thumbnail: 'https://images.unsplash.com/photo-1574717024453-354056aafa98?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '16:9',
    description: 'Before-and-after split thumbnail showcasing dramatic color transformation with bold yellow typography.',
    tags: ['Educational CTR', 'UI Showcase', 'Clean Type', 'Split Screen']
  },
  {
    id: 'thumb-3',
    title: 'HOW TO MAKE $10,000/MO AS A VIDEO EDITOR IN 2026',
    category: 'Thumbnails',
    mediaType: 'image',
    client: 'Editor Growth Club',
    views: '980K',
    dimensions: '1280x720 (16:9)',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '16:9',
    description: 'Punchy business-niche thumbnail with dynamic cash flow infographics, high-contrast character lighting, and clean branding.',
    tags: ['Finance/Biz', 'Clean Polish', 'Visual Hierarchy', 'Bold Title']
  },
  {
    id: 'thumb-4',
    title: '10 MINUTE SCI-FI FILM IN BLENDER & UNREAL ENGINE 5',
    category: 'Thumbnails',
    mediaType: 'image',
    client: 'RenderCrafter',
    views: '2.1M',
    dimensions: '1280x720 (16:9)',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '16:9',
    description: 'Cinematic thumbnail featuring an intense photorealistic 3D sci-fi battle scene with dramatic rim lighting and custom badge.',
    tags: ['3D/VFX', 'Cinematic Frame', 'Visual Hook', 'Action Shot']
  },
  {
    id: 'thumb-5',
    title: 'INSANE 3D LOGO ANIMATION WORKFLOW (AFTER EFFECTS)',
    category: 'Thumbnails',
    mediaType: 'image',
    client: 'MotionLab Hub',
    views: '650K',
    dimensions: '1280x720 (16:9)',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
    aspectRatio: '16:9',
    description: 'High-impact tutorial thumbnail with glowing chrome typography, timeline keyframe graphics, and vibrant contrast accents.',
    tags: ['Motion Tutorial', 'Clean Graphic', 'Software Badge', 'Eye Magnet']
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
