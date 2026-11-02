# Tadik's Cleaning — Официальный веб-сайт (Gebäudereinigung & Bau / Innenausbau)

Профессиональная многостраничная веб-платформа немецкой компании **Tadik's Cleaning (Inh. Michel Kislovskij, Chemnitz)**, объединяющая два ключевых направления бизнеса: **профессиональный клининг объектов (`Gebäudereinigung & Hygiene`)** и **строительно-отделочные работы (`Bau, Innenausbau & Sanierung`)**.

Проект спроектирован по стандартам **Production-Ready 2026**: модульная архитектура на базе **Next.js 16 (App Router)**, строгая типизация **TypeScript**, дизайн-система **Tailwind CSS v4**, аппаратно-ускоренные анимации **GSAP + ScrollTrigger**, многоуровневая защита форм, полное соответствие немецкому законодательству (**DDG, DSGVO, TDDDG, BDSG**) и глубокая оптимизация под ИИ-поисковики (**GEO / `llms.txt`**).

---

## 🏢 Реквизиты компании (Для клиента и администраторов)

Все контактные данные централизованы в файле [`src/lib/constants.ts`](./src/lib/constants.ts) и автоматически синхронизируются по всему сайту (шапка, подвал, карточки контактов, Impressum, Datenschutz, JSON-LD микроразметка):

| Параметр | Значение |
| :--- | :--- |
| **Название компании** | Tadik's Cleaning |
| **Владелец (Inhaber)** | Michel Kislovskij |
| **Юридический адрес** | Lessingstraße 14, 09130 Chemnitz, Deutschland |
| **Стационарный телефон** | `0371 23559475` (`+4937123559475`) |
| **Мобильный / WhatsApp** | `0157 34362898` (`+4915734362898`) |
| **E-Mail** | `info@tadiks-cleaning.de` |
| **Часы работы** | Пн – Сб: `07:00 – 19:00 Uhr` |
| **География работы** | Хемниц, Саксония (Zwickau, Freiberg, Dresden, Leipzig) и межрегионально (Berlin, Magdeburg, Hannover, Erfurt) |

---

## 🚀 Технологический стек

- **Фреймворк:** [Next.js 16.3.7](https://nextjs.org/) (App Router, SSG / `generateStaticParams`, Route Handlers)
- **UI-библиотека:** [React 19](https://react.dev/) + строгий [TypeScript 5](https://www.typescriptlang.org/)
- **Стилизация:** [Tailwind CSS v4](https://tailwindcss.com/) (`@theme inline`, CSS-переменные дизайн-токенов)
- **Анимации и кинетика:** [GSAP 3](https://gsap.com/) + `@gsap/react` + `ScrollTrigger`
- **Плавный скролл:** [Lenis](https://lenis.darkroom.engineering/) (активен только на десктопе `>= 1024px`; на мобильных и тач-устройствах используется нативный инерционный скролл без перехвата тач-событий)
- **Типографика (100 % локальный хостинг):** `Satoshi` (заголовки) и `General Sans` (основной текст) в формате `.woff2` через `next/font/local` без обращений к серверам Google
- **Иконки:** [Lucide React](https://lucide.dev/)

---

## 📁 Архитектура и структура проекта

Каждый компонент следует принципу единственной ответственности (**Single Responsibility Principle**). Статические данные, логика валидации и визуальные секции разделены на независимые модули:

```text
cleaning/
├── public/
│   ├── fonts/                                  # Локальные шрифты Satoshi и General Sans (.woff2)
│   ├── images/                                 # Оптимизированные изображения и фотографии объектов
│   ├── logos/                                  # Логотипы партнёров и брендов оборудования
│   ├── videos/                                 # Фоновые видеоролики для Hero-карточек
│   ├── TADIKS_LOGO.svg                         # Фирменный логотип (светлый)
│   ├── TADIKS_LOGO_COLOR.svg                   # Фирменный логотип (цветной)
│   ├── llms.txt                                # Стандартный манифест для ИИ-ассистентов (ChatGPT, Claude, Perplexity)
│   ├── llm.txt                                 # Зеркало манифеста для ИИ-краулеров (/llm.txt)
│   └── llms-full.txt                           # Полная база знаний компании для RAG-систем и нейросетей
│
├── src/
│   ├── app/                                    # Маршрутизация Next.js App Router
│   │   ├── api/contact/route.ts                # Защищённый серверный API-эндпоинт обработки заявок
│   │   ├── about/page.tsx                      # Страница «О компании» (/about)
│   │   ├── bau/
│   │   │   ├── page.tsx                        # Раздел «Строительство и отделка» (/bau)
│   │   │   └── [slug]/page.tsx                 # Детальные страницы строительных услуг (SSG)
│   │   ├── contacts/page.tsx                   # Страница контактов и онлайн-заявки (/contacts)
│   │   ├── datenschutz/page.tsx                # Политика конфиденциальности (DSGVO / TDDDG, ред. 01.11.2026)
│   │   ├── impressum/page.tsx                  # Юридические реквизиты (§ 5 DDG / § 18 MStV / § 36 VSBG)
│   │   ├── reinigung/page.tsx                  # Альтернативный маршрут раздела клининга (/reinigung)
│   │   ├── services/
│   │   │   ├── page.tsx                        # Раздел «Профессиональный клининг» (/services)
│   │   │   └── [slug]/page.tsx                 # Детальные страницы услуг клининга (SSG)
│   │   ├── globals.css                         # Глобальные стили и дизайн-токены Tailwind CSS v4
│   │   ├── layout.tsx                          # Корневой Layout (Header, Footer, CookieBanner, JSON-LD)
│   │   ├── not-found.tsx                       # Кастомная страница 404
│   │   ├── page.tsx                            # Главная страница (/)
│   │   ├── robots.ts                           # Генерация robots.txt с поддержкой ИИ-ботов
│   │   └── sitemap.ts                          # Динамическая генерация XML-карты сайта (sitemap.xml)
│   │
│   ├── components/
│   │   ├── layout/                             # Глобальная навигация и каркас
│   │   │   ├── Header.tsx                      # Фиксированная шапка с бургер-анимацией и MegaMenu
│   │   │   ├── MegaMenu.tsx                    # Десктопное выпадающее меню услуг
│   │   │   ├── MobileMenu.tsx                  # Мобильное меню с аккордеоном услуг
│   │   │   ├── Footer.tsx                      # Подвал сайта с навигацией и быстрым вызовом Cookie-настроек
│   │   │   ├── SmoothScroll.tsx                # Обёртка плавного скролла Lenis + синхронизация ScrollTrigger
│   │   │   ├── PageTransition.tsx              # Кинематографичный 5-колоночный переход между страницами
│   │   │   ├── JsonLdSchema.tsx                # Микроразметка Schema.org (LocalBusiness + OfferCatalog)
│   │   │   └── navData.ts                      # Структура ссылок навигации и мега-меню
│   │   │
│   │   ├── home/                               # Секции главной страницы
│   │   │   ├── Hero.tsx                        # Первый экран с каскадной анимацией и видео-виджетом
│   │   │   ├── HeroVideoCard.tsx               # Интерактивная видео-карточка в Hero
│   │   │   ├── PartnersMarquee.tsx             # Бегущая строка брендов оборудования и стандартов
│   │   │   ├── ServicesDualSection.tsx         # Универсальная сетка карточек услуг (Reinigung & Bau)
│   │   │   ├── AboutSection.tsx                # Секция «О нас» с галереей и счётчиками фактов
│   │   │   ├── ProcessSection.tsx              # 4 этапа работы с интерактивным превью
│   │   │   ├── WerkschauSection.tsx            # Sticky-галерея портфолио с параллаксом
│   │   │   ├── TestimonialsSection.tsx         # Карточки отзывов клиентов со стековым скроллом
│   │   │   ├── FaqSection.tsx                  # Секция вопросов и ответов (аккордеон)
│   │   │   └── ClosingCtaSection.tsx           # Финальный экран призыва к действию с параллаксом
│   │   │
│   │   ├── contacts/                           # Модульная система страницы контактов
│   │   │   ├── ContactPageContent.tsx          # Оркестратор страницы /contacts
│   │   │   ├── ContactHero.tsx                 # Первый экран страницы контактов
│   │   │   ├── ContactHubSection.tsx           # Контактный хаб (форма, валидация, авто-скролл к ошибкам)
│   │   │   ├── ContactDirectSidebar.tsx        # Левая sticky-колонка с карточками телефона, почты и адреса
│   │   │   ├── ContactServiceSelects.tsx       # Кастомные выпадающие списки выбора направления и услуги
│   │   │   ├── ContactSuccessState.tsx         # Всплывающий Toast и карточка подтверждения заявки
│   │   │   ├── ContactCoverageSection.tsx      # Интерактивная секция географии выездов (Саксония и Германия)
│   │   │   └── contactHubData.ts               # Константы услуг, типы и чистые функции валидации/санитизации
│   │   │
│   │   ├── services/                           # Модульная система детальной страницы услуги
│   │   │   ├── ServiceDetailPageContent.tsx    # Оркестратор детальной страницы услуги
│   │   │   ├── ServiceDetailHero.tsx           # Архитектурный Hero конкретной услуги
│   │   │   ├── ServiceDetailBentoMatrix.tsx    # Bento-матрица характеристик, чек-листа и оборудования
│   │   │   └── ServiceDetailComparison.tsx     # Сравнительная таблица стандартов качества Tadiks
│   │   │
│   │   ├── reinigung/                          # Специализированные компоненты раздела клининга
│   │   ├── bau/                                # Специализированные компоненты раздела строительства
│   │   ├── about/                              # Специализированные компоненты страницы «О нас»
│   │   ├── animations/                         # Кинетическая типографика (RollingText)
│   │   └── ui/                                 # Базовые UI-компоненты (CtaButton, CookieBanner, Container и др.)
│   │
│   ├── data/                                   # Контентный слой (тексты, услуги, FAQ)
│   │   ├── serviceDetails.ts                   # Полные спецификации всех детальных страниц услуг
│   │   ├── reinigungServices.ts                # Карточки услуг для раздела клининга
│   │   ├── bauServices.ts                      # Карточки услуг для раздела строительства
│   │   ├── reinigungFaqs.ts                    # Вопросы и ответы по клинингу
│   │   ├── bauFaqs.ts                          # Вопросы и ответы по строительству
│   │   └── contactFaqs.ts                      # Вопросы и ответы для страницы контактов
│   │
│   ├── lib/                                    # Системные утилиты и константы
│   │   ├── constants.ts                        # Реквизиты компании и базовые пункты меню
│   │   ├── gsap.ts                             # Единая точка инициализации GSAP и ScrollTrigger
│   │   └── utils.ts                            # Утилита cn() (clsx + tailwind-merge)
│   │
│   └── types/
│       └── index.ts                            # Глобальные TypeScript-интерфейсы
│
├── next.config.ts                              # Конфигурация Next.js и HTTP-заголовков безопасности
├── package.json                                # Скрипты и зависимости проекта
└── tsconfig.json                               # Конфигурация TypeScript
```

---

## 🔒 Безопасность, антиспам и защита данных (Security & Privacy)

1. **HTTP Security Headers ([`next.config.ts`](./next.config.ts)):**
   - Скрыт заголовок `X-Powered-By` (`poweredByHeader: false`).
   - Настроены строгие заголовки: `Strict-Transport-Security` (HSTS 2 года + preload), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
2. **Многоуровневая защита формы и API ([`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts)):**
   - **CSRF / Origin Check:** проверка заголовка `Origin` при POST-запросах.
   - **Honeypot-ловушки:** скрытые поля `website` и `companyFax` для отсечения автоматических ботов.
   - **Контроль времени заполнения (`formLoadedAt`):** блокировка мгновенных сабмитов быстрее 2.5 секунд.
   - **Защита от DDoS и утечек памяти (Rate Limiting):** ограничение до 5 запросов с одного IP за 15 минут с жёстким лимитом памяти (`MAX_STORE_ENTRIES = 2000`) и автоматическим вытеснением старых записей (FIFO).
   - **Санитизация и фильтрация ссылок:** очистка управляющих символов, HTML-тегов и блокировка спам-ссылок (`http://`, `https://`, `<script`, `[url=`).
   - **Отсутствие утечки PII:** API возвращает только статус и номер заявки (`referenceId`) без отражения персональных данных в ответе.
3. **Юридическое соответствие Германии и ЕС (Stand: 01.11.2026):**
   - **Impressum ([`src/app/impressum/page.tsx`](./src/app/impressum/page.tsx)):** составлен по актуальному **§ 5 DDG** (заменившему старый TMG), **§ 18 Abs. 2 MStV** и **§ 36 VSBG** (без закрытой с июля 2025 года платформы EU-OS).
   - **Datenschutzerklärung ([`src/app/datenschutz/page.tsx`](./src/app/datenschutz/page.tsx)):** полное соответствие **Art. 13, 14, 21 DSGVO**, **§ 25 TDDDG** и **BDSG**, включая визуально выделенный блок права на возражение (`Art. 21 Abs. 4 DSGVO`) и кнопку прямого изменения Cookie-настроек.

---

## 🤖 Оптимизация для ИИ и поисковых систем (GEO & SEO)

Чтобы нейросети (**ChatGPT / SearchGPT, Claude, Perplexity AI, Google Gemini, Microsoft Copilot**) активно рекомендовали компанию **Tadik's Cleaning** пользователям при поиске клининга или ремонта в Саксонии и Германии, внедрены:

- **[`public/llms.txt`](./public/llms.txt) и [`public/llm.txt`](./public/llm.txt):** структурированный профиль компании, критерии рекомендаций для ИИ, список всех услуг и городов выезда.
- **[`public/llms-full.txt`](./public/llms-full.txt):** расширенная техническая база знаний (протокол работы, оборудование, стандарты DIN/RKI, FAQ, мультиязычная сводка на DE / EN / RU).
- **[`src/app/robots.ts`](./src/app/robots.ts):** явное разрешение индексации для всех ведущих ИИ-ботов (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`).
- **[`src/components/layout/JsonLdSchema.tsx`](./src/components/layout/JsonLdSchema.tsx):** глобальная схема `Schema.org` (`LocalBusiness` + `HomeAndConstructionBusiness` + `OfferCatalog`).

---

## ✏️ Как редактировать контент (Памятка для разработчиков)

1. **Изменить телефон, почту, адрес или часы работы:**
   Отредактируйте объект `COMPANY_INFO` в [`src/lib/constants.ts`](./src/lib/constants.ts).
2. **Изменить описания услуг, чек-листы или шаги процесса:**
   - Детальные страницы услуг: [`src/data/serviceDetails.ts`](./src/data/serviceDetails.ts)
   - Карточки в каталоге клининга: [`src/data/reinigungServices.ts`](./src/data/reinigungServices.ts)
   - Карточки в каталоге строительства: [`src/data/bauServices.ts`](./src/data/bauServices.ts)
3. **Подключить отправку заявок на почту / в Telegram / CRM:**
   Откройте [`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts) — все проверенные и очищенные поля заявки доступны в конце функции `POST(req)`. Достаточно добавить вызов `Resend`, `Nodemailer` или Telegram Bot API.

---

## 🛠 Установка, запуск и сборка

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск сервера разработки
```bash
npm run dev
```
Сайт будет доступен по адресу [http://localhost:3000](http://localhost:3000).

### 3. Проверка качества кода (ESLint + TypeScript)
```bash
npm run lint
npx tsc --noEmit
```

### 4. Продакшен-сборка и запуск
```bash
npm run build
npm run start
```
_Примечание: проект полностью готов к автоматическому деплою на **Vercel** при пуше в основную ветку Git-репозитория._
