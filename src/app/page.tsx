import Image from "next/image";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Full-width 16:9 Hero Image */}
      <section className="relative w-full aspect-video min-h-[500px] max-h-[88vh] overflow-hidden">
        <Image
          src="/images/hero_cleaning_bg.jpg"
          alt="Tadiks Cleaning Chemnitz"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle top gradient for high contrast under the frosted floating navbar */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
