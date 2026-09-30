"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { useGSAP, gsap } from "@/lib/gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-features > *",
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-card",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
          },
          "-=0.5"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-neutral-900/60 dark:via-neutral-950 dark:to-neutral-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-badge">
              <Badge variant="emerald" className="px-3.5 py-1.5 text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Клининг премиального уровня в Москве и МО
              </Badge>
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
              Идеальная чистота <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                без хлопот и пыли
              </span>{" "}
              за пару часов
            </h1>

            <p className="hero-desc text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              Освободите время для важных дел. Мы наведем безупречный порядок в квартире,
              доме или офисе с использованием безопасной эко-химии.
            </p>

            <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
              <Button href="/contacts" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Рассчитать стоимость
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Все услуги
              </Button>
            </div>

            {/* Bullet features */}
            <div className="hero-features pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Эко-химия без запаха</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Страховка на 5 млн ₽</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
                <span>Рейтинг 4.9 из 5.0</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Card Showcase */}
          <div className="hero-card lg:col-span-5">
            <div className="relative rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/90">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">
                    Экспресс-заказ
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                    Уборка со скидкой 15%
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                  Новым клиентам
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">1-комнатная квартира</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">от 2 490 ₽</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">2-комнатная квартира</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">от 3 490 ₽</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">3-комнатная квартира</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">от 4 490 ₽</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-neutral-600 dark:text-neutral-400">После ремонта</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">от 7 900 ₽</span>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/contacts" variant="primary" size="lg" className="w-full">
                  Вызвать клинера
                </Button>
                <p className="text-center text-xs text-neutral-500 mt-3">
                  Оплата картой или наличными после проверки работы
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
