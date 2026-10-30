'use client';

import { PDFViewer } from '@embedpdf/viewer-react';

interface PdfViewerProps {
  src: string;
  title?: string;
}

export default function PdfViewer({ src, title }: PdfViewerProps) {
  return (
    <div className="pdf-viewer my-6">
      {title && (
        <p className="font-space-grotesk text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-800">{title}</span>
        </p>
      )}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '800px' }}>
        <PDFViewer
          src={src}
          disabledCategories={[
            'annotation',
            'redaction',
            'form',
          ]}
        />
      </div>
    </div>
  );
}
