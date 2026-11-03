"use client";

import { useLightbox } from "@/components/LightboxModal";

export default function OtherWorkPage() {
  const { openLightbox } = useLightbox();

  const otherWorks = [
    { name: "Holiday Card 24", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/b7c05113-f195-4dcd-aac1-6ebc949fd9ed/Holiday+Card+24.png?format=1000w" },
    { name: "Kitty Craft Beats and Breaks" },
    { name: "Khmr Ny Poster 2026", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/8463dfdc-1f79-4ef3-b8a8-57e93a32145e/Khmr+Ny+Poster+2026.png?format=1000w" },
    { name: "dp4 Release Party", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/97082cd4-fd78-4a07-955d-0237c1565b65/dp4_releaseParty7.png?format=1000w" },
    { name: "Sea Comedy NYC", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/d054d0c5-1257-4786-aece-46b6b62fadae/1080x1350_MainPoster26NYC_SeaComedy.png?format=1000w" },
    { name: "Valentines Day Card" },
    { name: "20Off Promo" },
    { name: "Monin Syrups 2025", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/f83c93f5-ba11-4be4-bebd-10e674fdc9a5/New+Monin+Syrups+2025+b2b.jpg?format=1000w" },
    { name: "Launch Post Hybrids", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/94003214-0954-4b5f-b7d2-d2482e11cabb/Launch-postHybrids.gif?format=1000w" },
    { name: "Minor Figures Oat", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/1793329533757-M3S055CT3YWEE47XXNWW/Minor%2BFigures%2BOat%2Bb2b.jpg?format=1000w" },
    { name: "Freshh Menu" },
    { name: "Holiday Blend Email" },
    { name: "Kiosk Mockup" },
    { name: "Diamond Torani", image: "https://images.squarespace-cdn.com/content/v1/697c2a57616cd82fd7d1bd35/769d358e-9764-47af-9e3c-cd97489135b3/Diamond+Torani-01.png?format=1000w" },
    { name: "Costa Rica Turrialba Stamp" },
    { name: "Costa Rica Valle Stamp" },
    { name: "Costa Rica West Valley Stamp" },
    { name: "Costa Rica Central Valley Stamp" },
  ];

  return (
    <div className="px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {otherWorks
            .filter((item): item is typeof item & { image: string } => item.image !== undefined)
            .map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-contain cursor-pointer"
                onClick={() => openLightbox({ src: item.image, alt: item.name, type: item.image.endsWith(".gif") ? "gif" : "image" })}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
