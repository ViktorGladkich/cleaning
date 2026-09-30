import { Metadata } from "next";
import { CheckCircle2, Plus, Sparkles, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PRICING_PLANS, EXTRA_SERVICES } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Цены и тарифы на клининг",
  description:
    "Прозрачные цены на уборку квартир и домов. Выберите тариф или добавьте дополнительные опции (мытье духовки, холодильника, окон).",
};

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container>
        <SectionHeading
          badge="Прайс-лист"
          title="Понятные фиксированные цены"
          subtitle="Мы работаем по фиксированным тарифам. Вы точно знаете, сколько заплатите, еще до начала уборки"
        />

        {/* Main plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col justify-between p-8 relative ${
                plan.isPopular
                  ? "border-2 border-emerald-500 shadow-xl shadow-emerald-500/10"
                  : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="emerald">Самый популярный</Badge>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-6">{plan.description}</p>

                <div className="mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-4xl font-extrabold text-neutral-900 dark:text-white">
                    {plan.price.toLocaleString("ru-RU")} ₽
                  </span>
                  <span className="text-xs text-neutral-500 block mt-1">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                href="/contacts"
                variant={plan.isPopular ? "primary" : "outline"}
                size="lg"
                className="w-full"
              >
                {plan.ctaText}
              </Button>
            </Card>
          ))}
        </div>

        {/* Extra Services table */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Дополнительные опции
            </h3>
            <p className="text-sm text-neutral-500 mt-2">
              Вы можете добавить любые индивидуальные услуги к основному заказу
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXTRA_SERVICES.map((extra, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-sm text-neutral-800 dark:text-neutral-200">
                    {extra.name}
                  </h4>
                  <span className="text-xs text-neutral-400">за {extra.unit}</span>
                </div>
                <span className="font-bold text-emerald-600 text-sm">
                  {extra.price} ₽
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
