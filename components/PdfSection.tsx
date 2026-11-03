'use client';

import dynamic from 'next/dynamic';

const PdfFlipbook = dynamic(
  () => import('@/components/PdfFlipbook'),
  { ssr: false, loading: () => <div className="py-12 text-center text-gray-400 font-body text-sm">Loading PDF viewer...</div> }
);

export default function PdfSection({ src, title }: { src: string; title?: string }) {
  return <PdfFlipbook src={src} title={title} />;
}
