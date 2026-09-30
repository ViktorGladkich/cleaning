import { CompanyInfo, NavItem } from "@/types";

export const COMPANY_INFO: CompanyInfo = {
  name: "Чистый Дом",
  tagline: "Профессиональный клининг квартир, домов и офисов",
  phone: "+7 (999) 123-45-67",
  phoneRaw: "+79991234567",
  email: "info@clean-pro.ru",
  address: "г. Москва, ул. Примерная, д. 10, оф. 402",
  workingHours: "Пн-Вс: 08:00 — 22:00",
  socials: {
    telegram: "https://t.me/example",
    whatsapp: "https://wa.me/79991234567",
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/services" },
  { label: "Цены", href: "/pricing" },
  { label: "О компании", href: "/about" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contacts" },
];

export const SERVICE_CATEGORIES = [
  { id: "all", label: "Все услуги" },
  { id: "apartments", label: "Квартиры и дома" },
  { id: "commercial", label: "Офисы и бизнес" },
  { id: "special", label: "Специальный клининг" },
] as const;
