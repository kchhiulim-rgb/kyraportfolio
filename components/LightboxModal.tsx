"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type MediaType = "image" | "pdf" | "gif";

interface LightboxItem {
  src: string;
  alt?: string;
  type: MediaType;
}

interface LightboxContextType {
  openLightbox: (item: LightboxItem) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}

interface LightboxProviderProps {
  children: ReactNode;
}

export function LightboxProvider({ children }: LightboxProviderProps) {
  const [item, setItem] = useState<LightboxItem | null>(null);

  const openLightbox = useCallback((i: LightboxItem) => setItem(i), []);
  const closeLightbox = useCallback(() => setItem(null), []);

  // Close on Escape key
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [item, closeLightbox]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {item && <LightboxOverlay item={item} onClose={closeLightbox} />}
    </LightboxContext.Provider>
  );
}

interface LightboxOverlayProps {
  item: LightboxItem;
  onClose: () => void;
}

function LightboxOverlay({ item, onClose }: LightboxOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || "Enlarged media"}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] text-white/80 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Media content */}
      <div
        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "pdf" ? (
          <iframe
            src={item.src}
            className="w-[90vw] h-[90vh] rounded-lg bg-white"
            title={item.alt || "PDF document"}
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt || ""}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}
