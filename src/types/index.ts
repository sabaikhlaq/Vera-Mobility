export type ServiceType = 'executive' | 'senior' | 'student' | 'family';

export interface RouteOption {
  id: string;
  name: string;
  pickup: string;
  dropoff: string;
  distanceMiles: number;
  durationMins: number;
  baseRate: number;
}

export interface VehicleOption {
  id: string;
  name: string;
  category: string;
  capacity: string;
  luggage: string;
  features: string[];
  multiplier: number;
}

export interface ChauffeurProfile {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  completedRides: number;
  certifications: string[];
  bio: string;
  rating: number;
  specialty: string;
  initials: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  ageAndRole: string;
  category: string;
  location: string;
  rideType: string;
}

export interface BookingDetails {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  serviceType: ServiceType;
  vehicleId: string;
  passengers: number;
  childSeatRequired: boolean;
  seniorAssistance: boolean;
  quietRide: boolean;
  notes: string;
  fullName: string;
  email: string;
  phone: string;
  estimatedPrice: number;
  bookingRef?: string;
}
