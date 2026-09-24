import { RouteOption, VehicleOption, ChauffeurProfile, Testimonial } from '../types';

export const POPULAR_ROUTES: RouteOption[] = [
  {
    id: 'airport-express',
    name: 'Metropolitan Airport Direct',
    pickup: 'Downtown Financial Center',
    dropoff: 'Terminal 2 International Departure',
    distanceMiles: 18.4,
    durationMins: 32,
    baseRate: 68,
  },
  {
    id: 'medical-care',
    name: 'Healthcare Escort Route',
    pickup: 'North Hills Residential Estates',
    dropoff: 'University Medical Pavilion & Eye Clinic',
    distanceMiles: 9.2,
    durationMins: 22,
    baseRate: 46,
  },
  {
    id: 'campus-commute',
    name: 'Campus to Metro Station',
    pickup: 'West Quad University Residences',
    dropoff: 'Grand Union Central Train Station',
    distanceMiles: 6.5,
    durationMins: 16,
    baseRate: 34,
  },
  {
    id: 'evening-return',
    name: 'Executive Late-Night Commute',
    pickup: 'Midtown Legal & Financial Tower',
    dropoff: 'Lakeside Residential Village',
    distanceMiles: 14.1,
    durationMins: 28,
    baseRate: 58,
  },
];

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'executive-sedan',
    name: 'Lexus ES 300h / Volvo S90',
    category: 'Executive Hybrid Sedan',
    capacity: 'Up to 3 passengers',
    luggage: '2 large cases + 2 carry-ons',
    features: ['Privacy acoustic glass', 'HEPA filtered cabin', 'High-speed device charging', 'Heated leather rear seating'],
    multiplier: 1.0,
  },
  {
    id: 'premium-suv',
    name: 'Volvo XC90 Recharge',
    category: 'Spacious Luxury SUV',
    capacity: 'Up to 5 passengers',
    luggage: '4 large suitcases + strollers',
    features: ['Low-step illuminated threshold', 'Extra legroom config', 'Pre-installed Britax child seats on request', 'Panoramic roof with blind'],
    multiplier: 1.35,
  },
  {
    id: 'accessible-crossover',
    name: 'Genesis GV70 / Toyota Crown Signia',
    category: 'Gentle-Access Crossover',
    capacity: 'Up to 4 passengers',
    luggage: '3 suitcases + folding walker/wheelchair',
    features: ['Extra-wide door aperture (85°)', 'Handrail assist anchor points', 'Smooth suspension calibration', 'Direct arm support boarding'],
    multiplier: 1.2,
  },
];

export const CHAUFFEURS: ChauffeurProfile[] = [
  {
    id: 'c1',
    name: 'Tanya Vance-Morales',
    role: 'Senior Executive Chauffeur',
    experienceYears: 14,
    completedRides: 4920,
    certifications: ['Advanced Defensive Driving (Smith System)', 'Executive Dignitary Escort', 'Adult & Pediatric First Aid/CPR'],
    bio: 'Former corporate fleet lead with 14 years of unblemished professional driving. Known for absolute punctuality, quiet route management, and seamless airport coordination.',
    rating: 5.0,
    specialty: 'Late-Night & Corporate Transit',
    initials: 'TV',
  },
  {
    id: 'c2',
    name: 'Brenda Chen, RN (Ret.)',
    role: 'Senior Mobility & Care Chauffeur Lead',
    experienceYears: 9,
    completedRides: 3410,
    certifications: ['Certified Mobility Specialist', 'Dementia & Mobility Sensitivity', 'Wheelchair Transfer & Stowing Cert.'],
    bio: 'Retired emergency department nurse turned professional chauffeur. Specializes in patient, arm-assisted door-through-door journeys for seniors attending therapies and appointments.',
    rating: 5.0,
    specialty: 'Senior Companion & Medical Mobility',
    initials: 'BC',
  },
  {
    id: 'c3',
    name: 'Amara Diallo',
    role: 'Campus & Family Safety Specialist',
    experienceYears: 7,
    completedRides: 2890,
    certifications: ['NHTSA Child Passenger Safety Certified', 'Defensive Winter Driving Mastery', 'Teen Commute Safety Protocol'],
    bio: 'Dedicated family chauffeur and mother of two. Expert in properly anchoring multi-age safety seats, coordinating with campus security points, and live guardian tracking.',
    rating: 4.99,
    specialty: 'Student & Youth Safe Commutes',
    initials: 'AD',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'As a surgeon finishing shifts at 2:30 AM, standard rideshare felt increasingly unpredictable and stressful. With VERA, my chauffeur Tanya is waiting at the designated hospital staff bay, the car is tranquil and warm, and I can decompress in complete psychological safety.',
    author: 'Dr. Evelyn Vance, MD',
    ageAndRole: 'Age 44 · Chief of Orthopedic Trauma',
    category: 'Professional & Night Commute',
    location: 'Metropolitan Medical Center',
    rideType: 'Recurring Executive Service',
  },
  {
    id: 't2',
    quote: 'My 81-year-old mother gave up driving last autumn. VERA isn’t just a ride; chauffeur Brenda walks right to her front door, takes her arm, carries her handbag, and stays nearby during her macular degeneration treatments. As a daughter 300 miles away, this peace of mind is priceless.',
    author: 'Claire & Eleanor M.',
    ageAndRole: 'Ages 52 & 81 · Daughter & Mother',
    category: 'Senior Healthcare Companion',
    location: 'Oakridge Senior Community',
    rideType: 'Assisted Medical Escort',
  },
  {
    id: 't3',
    quote: 'Our daughter moved out of state for university. Having a pre-scheduled VERA chauffeur pick her up from evening lab sessions and library study groups directly outside the dorm eliminates the anxiety entirely. Clean, reliable, and verified.',
    author: 'Sunita Raman',
    ageAndRole: 'Age 49 · Parent of University Freshman',
    category: 'Student Safe Transit',
    location: 'Northwestern Campus Corridor',
    rideType: 'Scheduled Weekly Commute',
  },
  {
    id: 't4',
    quote: 'Traveling solo across three time zones for client pitches used to drain me before I even reached the hotel. Stepping into a VERA sedan with an experienced professional female driver who respects my working silence made all the difference to my performance.',
    author: 'Elena Rostova',
    ageAndRole: 'Age 38 · Managing Partner, Private Equity',
    category: 'Executive Travel',
    location: 'International Financial District',
    rideType: 'Airport & Corporate Transfer',
  },
];

export const FAQS = [
  {
    question: 'Are 100% of VERA chauffeurs women?',
    answer: 'Yes, without exception. Every single chauffeur contracted or employed by VERA is a vetted, professional woman with commercial driving credentials, comprehensive background verification, and formal hospitality training.',
  },
  {
    question: 'Can male family members or children accompany a female passenger?',
    answer: 'Yes. While the primary account holder and passenger must be female, family members—including partners, spouses, children of all genders, and elderly male relatives—are warmly welcome to ride along when accompanying the primary passenger.',
  },
  {
    question: 'How does the Senior Door-Through-Door service differ from standard curbside pickup?',
    answer: 'Standard transportation stops at the curb. With VERA Senior Care, our certified chauffeurs exit the vehicle, walk to the residence door, provide steady physical arm support, carry bags or assist with walking frames, and wait on-site if requested during appointments to ensure a seamless round trip.',
  },
  {
    question: 'How do you verify driver safety and integrity?',
    answer: 'All chauffeurs undergo a 7-year federal and state criminal background check, continuous DMV driving record telemetry monitoring, in-person interviews, vehicle mechanical audits, and mandatory certifications in defensive driving, adult/child CPR, and safety escort protocols.',
  },
  {
    question: 'Can I request a recurring or preferred chauffeur for my mother or daughter?',
    answer: 'Yes. Our platform allows clients to designate preferred chauffeurs for recurring daily or weekly schedules, establishing familiarity and trusted relationships—especially helpful for seniors and young students.',
  },
  {
    question: 'Do you offer car seats for infants and toddlers?',
    answer: 'Yes. We provide pre-installed, sanitized, multi-stage Britax car seats (rear-facing, forward-facing, and high-back booster) certified by our NHTSA-trained chauffeurs at no extra stress.',
  },
];
