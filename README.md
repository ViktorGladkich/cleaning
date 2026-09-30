# Профессиональный сайт клининговой компании (Cleaning Service)

Современная многостраничная архитектура веб-сайта на базе **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** и **GSAP**.

---

## 🚀 Стек технологий (Latest Versions)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/postcss`
- **Animations**: [GSAP](https://greensock.com/gsap/) + `@gsap/react` + `ScrollTrigger`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`

---

## 📁 Структура проекта

```text
cleaning/
├── src/
│   ├── app/                                # Next.js App Router (Многостраничная структура)
│   │   ├── layout.tsx                      # Глобальный лейаут (Header, Footer, шрифты, метаданные)
│   │   ├── page.tsx                        # Главная страница (Hero, Услуги, Преимущества, Цены, FAQ, CTA)
│   │   ├── services/
│   │   │   ├── page.tsx                    # Каталог всех услуг
│   │   │   └── [slug]/page.tsx             # Динамическая страница конкретной услуги (SSG / generateStaticParams)
│   │   ├── pricing/page.tsx                # Цены, тарифные планы и дополнительные опции
│   │   ├── about/page.tsx                  # О компании, ценности, гарантии, стандарты
│   │   ├── reviews/page.tsx                # Отзывы клиентов и рейтинг
│   │   ├── contacts/page.tsx               # Контакты, реквизиты и форма онлайн-заявки
│   │   ├── not-found.tsx                   # Кастомная 404 страница
│   │   └── globals.css                     # Глобальные стили Tailwind CSS
│   │
│   ├── components/                         # Компонентная база
│   │   ├── layout/                         # Шапка, подвал, адаптивное мобильное меню
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/                             # Атомарные переиспользуемые UI компоненты
│   │   │   ├── Button.tsx                  # Универсальная кнопка / ссылка с вариантами
│   │   │   ├── Card.tsx                    # Карточки с микро-анимацией
│   │   │   ├── Badge.tsx                   # Бейджи и теги
│   │   │   ├── Container.tsx               # Адаптивный контейнер сетки
│   │   │   ├── SectionHeading.tsx          # Стандартизированный заголовок секций
│   │   │   └── ServiceIcon.tsx             # Динамический маппинг иконок
│   │   ├── animations/                     # GSAP анимационные компоненты
│   │   │   ├── FadeIn.tsx                  # Плавное появление элементов при скролле
│   │   │   └── StaggerList.tsx             # Каскадная GSAP анимация списков
│   │   └── home/
│   │       └── Hero.tsx                    # Интерактивный первый экран с таймлайном GSAP
│   │
│   ├── data/                               # Структурированные данные контента
│   │   ├── services.ts                     # Каталог клининговых услуг с параметрами и чек-листами
│   │   ├── pricing.ts                      # Тарифные планы и расценки на доп. опции
│   │   ├── reviews.ts                      # Отзывы клиентов
│   │   └── faqs.ts                         # Вопросы и ответы
│   │
│   ├── hooks/                              # Кастомные React-хуки
│   │   └── useGsapAnimation.ts             # Безопасная инициализация GSAP с хуком useGSAP
│   │
│   ├── lib/                                # Конфигурации и утилиты
│   │   ├── constants.ts                    # Контакты, навигация, реквизиты компании
│   │   ├── gsap.ts                         # Регистрация плагинов ScrollTrigger / useGSAP с учетом SSR
│   │   └── utils.ts                        # Хелпер cn() для конкатенации классов Tailwind
│   │
│   └── types/                              # TypeScript интерфейсы
│       └── index.ts                        # Типы для услуг, тарифов, отзывов, навигации
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🛠 Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📦 Сборка продакшена

```bash
npm run build
npm run start
```
