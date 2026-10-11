export interface RestaurantSettings {
  businessName: string;
  tagline: string;
  taglineNepali: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  addressNepali: string;
  city: string;
  province: string;
  openingHours: string;
  openingHoursNepali: string;
  logoUrl: string;
  accommodationEnabled: boolean;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    maps?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
}

export interface HeroSlide {
  id: string;
  title: string;
  titleNepali: string;
  subtitle: string;
  subtitleNepali: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  nepaliName: string;
  slug: string;
  order: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nepaliName: string;
  description: string;
  price: number;
  imageUrl: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
  tags?: string[];
}

export interface FestivalOffer {
  id: string;
  festivalName: string;
  title: string;
  titleNepali: string;
  description: string;
  descriptionNepali: string;
  highlights: string[];
  imageUrl: string;
  active: boolean;
  badgeText: string;
}

export interface TourismDestination {
  id: string;
  name: string;
  nepaliName: string;
  subtitle: string;
  description: string;
  culturalSignificance: string;
  travelNote: string;
  googleMapsUrl: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'dining' | 'food' | 'festivals' | 'heritage';
  imageUrl: string;
  caption: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
export type BookingCategory = 'Restaurant Dining' | 'Festival Feast' | 'Family Gathering' | 'Banquet & Party' | 'Room Accommodation';

export interface BookingRecord {
  id: string;
  referenceCode: string;
  customerName: string;
  mobileNumber: string;
  email?: string;
  category: BookingCategory;
  preferredDate: string;
  preferredTime: string;
  guestCount: number;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  staffNotes?: string;
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  mobileNumber: string;
  email?: string;
  subject: string;
  message: string;
  status: 'New' | 'Responded' | 'Archived';
  createdAt: string;
}

export interface RoomItem {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: string;
  amenities: string[];
  totalRooms: number;
  availableRooms: number;
  imageUrl: string;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'Super Admin' | 'Manager' | 'Staff';
  token?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
}
