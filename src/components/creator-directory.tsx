import { creatorProfiles } from "@/lib/creators";
import { TalentCarousel } from "./home-talent-carousel";

export function CreatorDirectory({ className = "" }: { className?: string }) {
  return (
    <TalentCarousel
      id="our-creators"
      title="SOME OF OUR CREATORS"
      description="Meet the creators sharing fresh perspectives on tech, everyday life, and the great outdoors."
      theme="dark"
      profiles={creatorProfiles}
      className={className}
    />
  );
}
