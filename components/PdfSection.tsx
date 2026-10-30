'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(
  () => import('@/components/PdfViewer'),
  { ssr: false, loading: () => <div className="py-12 text-center text-gray-400 font-space-grotesk text-sm">Loading PDF viewer...</div> }
);

export default function PdfSection({ src, title }: { src: string; title?: string }) {
  return <PdfViewer src={src} title={title} />;
}
