"use client";

import { useState, useRef, useEffect } from "react";
import { useLightbox } from "@/components/LightboxModal";

interface HoverToPlayGifProps {
  src: string;
  alt: string;
}

export default function HoverToPlayGif({ src, alt }: HoverToPlayGifProps) {
  const [hovering, setHovering] = useState(false);
  const [firstFrame, setFirstFrame] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openLightbox } = useLightbox();

  // Extract the first frame of the GIF on mount for the initial thumbnail
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          setFirstFrame(canvas.toDataURL("image/png"));
        }
      }
    };
  }, [src]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openLightbox({ src, alt, type: "gif" });
  };

  return (
    <div
      className="relative cursor-pointer group w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onDoubleClick={handleDoubleClick}
    >
      <canvas ref={canvasRef} className="hidden" />
      {(hovering || !firstFrame) ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
        />
      ) : firstFrame ? (
        <img
          src={firstFrame}
          alt={alt}
          className="w-full h-auto"
        />
      ) : (
        <div className="w-full bg-gray-200 min-h-[200px]" />
      )}
    </div>
  );
}
