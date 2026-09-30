import { Metadata } from "next";
import { ShieldCheck, Award, Users, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "О компании и стандарты качества",
  description:
    "Узнайте о стандартах клининговой компании Чистый Дом, подготовке клинеров, оборудовании Kärcher и гарантиях безопасности.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-20">
      <Container>
        <SectionHeading
          badge="О компании"
          title="С заботой о чистоте и вашем уюте"
          subtitle="Мы создаем сервис, которому можно безоговорочно доверить ключи от дома"
        />

        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Наша миссия — освободить ваше время
            </h3>
            <p>
              Компания «{COMPANY_INFO.name}» была основана с целью изменить представление о клининге. Мы считаем, что уборка должна быть не просто разовой услугой, а комфортным, предсказуемым и безопасным процессом.
            </p>
            <p>
              Каждый сотрудник нашей команды проходит 3 этапа отбора: проверка службой безопасности, теоретический курс по уходу за деликатными поверхностями и стажировка под контролем старшего бригадира.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-emerald-500 pl-4">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white block">
                  5+ лет
                </span>
                <span className="text-xs text-neutral-500">
                  Безупречной работы на рынке
                </span>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <span className="text-3xl font-extrabold text-neutral-900 dark:text-white block">
                  12 000+
                </span>
                <span className="text-xs text-neutral-500">
                  Убранных квартир и домов
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-emerald-50 to-teal-50 dark:from-neutral-900 dark:to-neutral-800/80 p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700/60 space-y-6">
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
              4 принципа нашей работы:
            </h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Безопасность и страховка
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Финансовая ответственность за имущество на сумму до 5 млн рублей.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Award className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Экологичные европейские средства
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Используем профессиональную химию Kiehl и Buzil, безопасную для детей и животных.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Штатные проверенные клинеры
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Никаких случайных исполнителей с улицы — только проверенные сотрудники в униформе.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <HeartHandshake className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    Оплата по факту
                  </h5>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Вы платите только тогда, когда лично проверите результат уборки.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button href="/contacts" size="lg">
            Познакомиться и заказать уборку
          </Button>
        </div>
      </Container>
    </div>
  );
}
