export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

/**
 * Facts for the Impressum that only the business owner can confirm.
 * Empty values are not rendered.
 */
export interface LegalInfo {
  vatId: string;
  economicId: string;
  commercialRegister: string;
  chamber: string;
  craftRegister: string;
  professionTitle: string;
  insurerName: string;
  insurerAddress: string;
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
  legal: LegalInfo;
  socials: {
    whatsapp?: string;
    instagram?: string;
  };
}
