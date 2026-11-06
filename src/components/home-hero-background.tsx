import Image from "next/image";

export function HomeHeroBackground() {
  return (
    <>
      <div className="home-hero-background">
        <Image
          src="/images/home-influencer-hero.webp"
          alt="Creators recording videos and sharing their perspectives"
          fill
          preload
          sizes="100vw"
        />
      </div>
      <div className="home-hero-shade" aria-hidden="true" />
    </>
  );
}
