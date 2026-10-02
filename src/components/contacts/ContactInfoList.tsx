import React from "react";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export function ContactInfoList() {
  const contactItems = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Telefon Chemnitz",
      content: (
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="font-semibold text-base text-neutral-900 dark:text-white hover:text-[var(--color-brand-navy)] transition"
        >
          {COMPANY_INFO.phone}
        </a>
      ),
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "E-Mail",
      content: (
        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="font-semibold text-base text-neutral-900 dark:text-white hover:text-[var(--color-brand-navy)] transition"
        >
          {COMPANY_INFO.email}
        </a>
      ),
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Öffnungszeiten",
      content: (
        <span className="font-semibold text-sm text-neutral-900 dark:text-white">
          {COMPANY_INFO.workingHours}
        </span>
      ),
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Büro Chemnitz",
      content: (
        <span className="font-semibold text-sm text-neutral-900 dark:text-white">
          {COMPANY_INFO.address}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {contactItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800"
        >
          <div className="p-2.5 rounded-xl bg-blue-100 text-[var(--color-brand-navy)] dark:bg-blue-950 dark:text-sky-400">
            {item.icon}
          </div>
          <div>
            <span className="text-xs text-neutral-500 block">{item.label}</span>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
