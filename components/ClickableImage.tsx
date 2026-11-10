"use client";

import { useLightbox } from "@/components/LightboxModal";
import type { ReactNode } from "react";

interface ClickableImageProps {
  src: string;
  alt: string;
  children: ReactNode;
}

export default function ClickableImage({ src, alt, children }: ClickableImageProps) {
  const { openLightbox } = useLightbox();

  const mediaType: "image" | "pdf" | "video" =
    src.endsWith(".mp4") ? "video" : src.endsWith(".pdf") ? "pdf" : "image";

  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox({ src, alt, type: mediaType });
      }}
    >
      {children}
    </div>
  );
}
