export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  priceFrom: number;
  priceUnit: string;
  duration: string;
  iconName: string;
  features: string[];
  included: string[];
  popular?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  avatarUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  workingHours: string;
  socials: {
    telegram?: string;
    whatsapp?: string;
    vk?: string;
    instagram?: string;
  };
}
