export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface CompanyInfo {
  name: string;
  owner: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  mobile: string;
  mobileRaw: string;
  email: string;
  address: string;
  workingHours: string;
  socials: {
    whatsapp?: string;
    instagram?: string;
  };
}
