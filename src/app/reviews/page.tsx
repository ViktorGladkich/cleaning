import { Metadata } from "next";
import { Star, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { REVIEWS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Kundenbewertungen — GlanzWerk Chemnitz",
  description:
    "Echte Bewertungen unserer Kunden aus Chemnitz zur Wohnungs-, Fenster- und Büroreinigung. Bewertung 4.9 von 5.0.",
};

export default function ReviewsPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Erfahrungsberichte"
          title="Was Chemnitzer Kunden sagen"
          subtitle="Authentisches Feedback von privaten und gewerblichen Auftraggebern aus Chemnitz und Umgebung"
        />

        {/* Rating summary */}
        <div className="max-w-xl mx-auto my-10 p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 text-center flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-500" />
            ))}
          </div>
          <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            4.9 von 5.0 Sternen
          </span>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Basierend auf über 850 Kundenrezensionen in Sachsen
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {REVIEWS.map((rev) => (
            <Card key={rev.id} className="p-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                    {rev.author}
                  </h3>
                  <span className="text-xs text-neutral-500">{rev.city}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <Badge variant="neutral" className="text-xs">
                  {rev.service}
                </Badge>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                «{rev.comment}»
              </p>
              <span className="block mt-4 text-xs text-neutral-400">{rev.date}</span>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button href="/contacts" size="lg" icon={<MessageSquare className="w-4 h-4" />}>
            Jetzt Reinigungsanfrage stellen
          </Button>
        </div>
      </Container>
    </div>
  );
}
