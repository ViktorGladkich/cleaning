import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerList } from "@/components/animations/StaggerList";
import { SERVICES } from "@/data/services";
import { PRICING_PLANS } from "@/data/pricing";
import { REVIEWS } from "@/data/reviews";
import { FAQS } from "@/data/faqs";
import { COMPANY_INFO } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section with GSAP */}
      <Hero />

      {/* 2. Popular Services Section */}
      <section>
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Наши направления"
              title="Популярные клининговые услуги"
              subtitle="Подберем оптимальный формат уборки для вашей квартиры, загородного коттеджа или офиса"
            />
          </FadeIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
                      <ServiceIcon name={service.iconName} className="w-6 h-6" />
                    </div>
                    {service.popular && (
                      <Badge variant="emerald">Популярно</Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {service.features.slice(0, 3).map((f, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 block">Стоимость:</span>
                    <span className="text-lg font-bold text-neutral-900 dark:text-white">
                      от {service.priceFrom.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>

                  <Button
                    href={`/services/${service.slug}`}
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Подробнее
                  </Button>
                </div>
              </Card>
            ))}
          </StaggerList>

          <div className="text-center mt-12">
            <Button href="/services" variant="secondary" size="lg">
              Смотреть все услуги клининга
            </Button>
          </div>
        </Container>
      </section>

      {/* 3. Advantages / Why Us Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900/40 py-20 border-y border-neutral-200 dark:border-neutral-800">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Преимущества"
              title="Почему доверяют именно нам"
              subtitle="Мы превратили уборку в надежный сервис со строгими стандартами качества и безопасности"
            />
          </FadeIn>

          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Страховка и гарантия
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Финансовая ответственность за сохранность ваших вещей застрахована на 5 000 000 ₽.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Обученные клинеры
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Все сотрудники проходят проверку СБ, обучение стандартам и стажировку с наставником.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Эко-химия и Kärcher
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Безопасные гипоаллергенные средства европейских марок, без едких химических запахов.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                Точно ко времени
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Приезжаем минута в минуту в удобное для вас время. Работаем 7 дней в неделю без выходных.
              </p>
            </div>
          </StaggerList>
        </Container>
      </section>

      {/* 4. Pricing Plans Overview */}
      <section>
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Тарифы"
              title="Прозрачные фиксированные цены"
              subtitle="Никаких скрытых доплат. Окончательная стоимость согласовывается до начала уборки"
            />
          </FadeIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between ${
                  plan.isPopular
                    ? "border-2 border-emerald-500 shadow-xl shadow-emerald-500/10"
                    : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="emerald" className="shadow-sm">
                      Выбор клиентов
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                      {plan.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="text-xs text-neutral-500 ml-1.5 block">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href="/contacts"
                  variant={plan.isPopular ? "primary" : "outline"}
                  size="md"
                  className="w-full"
                >
                  {plan.ctaText}
                </Button>
              </Card>
            ))}
          </StaggerList>

          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1.5"
            >
              Смотреть полный прайс-лист и доп. услуги
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. Reviews */}
      <section className="bg-neutral-50 dark:bg-neutral-900/40 py-20 border-y border-neutral-200 dark:border-neutral-800">
        <Container>
          <FadeIn>
            <SectionHeading
              badge="Отзывы"
              title="Что говорят наши клиенты"
              subtitle="Более 1 200 довольных постоянных клиентов по всей Москве и Московской области"
            />
          </FadeIn>

          <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((rev) => (
              <Card key={rev.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white">
                      {rev.author}
                    </h4>
                    <span className="text-xs text-neutral-500">{rev.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <Badge variant="neutral" className="text-[11px]">
                    {rev.service}
                  </Badge>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                  «{rev.comment}»
                </p>
                <span className="block mt-4 text-xs text-neutral-400">{rev.date}</span>
              </Card>
            ))}
          </StaggerList>
        </Container>
      </section>

      {/* 6. FAQ Section */}
      <section>
        <Container size="small">
          <FadeIn>
            <SectionHeading
              badge="Вопросы и ответы"
              title="Часто задаваемые вопросы"
              subtitle="Отвечаем на главные вопросы о заказе уборки, безопасности и оплате"
            />
          </FadeIn>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 bg-white dark:bg-neutral-900">
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. CTA Section */}
      <section>
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 sm:p-14 text-white overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider">
                Специальное предложение
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Получите скидку 15% на первую уборку
              </h2>
              <p className="text-base sm:text-lg text-emerald-50 leading-relaxed">
                Оставьте заявку онлайн прямо сейчас, и наш менеджер перезвонит вам в течение 5 минут для точного расчета и подбора удобного времени.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  href="/contacts"
                  className="bg-white text-emerald-800 hover:bg-neutral-100 shadow-lg"
                  size="lg"
                >
                  Оставить заявку
                </Button>
                <Button
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                  size="lg"
                  icon={<Phone className="w-4 h-4" />}
                >
                  {COMPANY_INFO.phone}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
