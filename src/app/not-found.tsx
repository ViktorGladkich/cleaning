import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32">
      <Container size="small" className="text-center">
        <span className="text-base font-semibold text-[#1a77ed]">404</span>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Seite nicht gefunden
        </h1>
        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
          Die von Ihnen aufgerufene Seite existiert leider nicht oder wurde verschoben.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Zur Startseite
          </Button>
          <Button href="/services" variant="outline" size="md">
            Zu unseren Leistungen
          </Button>
        </div>
      </Container>
    </div>
  );
}
