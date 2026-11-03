"use client";

import { useState, useRef } from "react";
import { useLightbox } from "@/components/LightboxModal";

interface HoverImageProps {
  src?: string;
  alt: string;
  className?: string;
  lightbox?: boolean;
}

export default function HoverImage({ src, alt, className, lightbox = true }: HoverImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (lightbox && src) {
      e.preventDefault();
      e.stopPropagation();
      const mediaType = src.endsWith(".gif") ? "gif" : "image";
      openLightbox({ src, alt, type: mediaType });
    }
  };

  if (src) {
    return (
      <div
        ref={containerRef}
        className={`relative flex items-center justify-center cursor-pointer ${className || ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCursorPos({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleDoubleClick}
        style={{ overflow: "visible" }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-out"
          style={{
            transform: isHovered
              ? `scale(0.85) translate(${cursorPos.x * 0.4}px, ${cursorPos.y * 0.4}px)`
              : "scale(1)",
            boxShadow: isHovered ? "0 25px 50px rgba(0, 0, 0, 0.25)" : "none",
            zIndex: isHovered ? 10 : 1,
          }}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
    </div>
  );
}
