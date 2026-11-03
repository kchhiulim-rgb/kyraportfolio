'use client';

import { PDFViewer } from '@embedpdf/viewer-react';
import { chromeHelpers } from '@embedpdf/viewer';
import type { ViewerHandle } from '@embedpdf/viewer';

interface PdfViewerProps {
  src: string;
  title?: string;
}

// Hide view-redact and related controls
const removeCommands = [
  'mode:annotate',
  'mode:shapes',
  'mode:insert',
  'mode:form',
  'mode:redact',
  'annotation:delete',
  'annotation:comment',
  'annotation:style',
  'annotation:group',
  'annotation:ungroup',
  'annotation:link',
  'annotation:goto-link',
  'annotation:remove-link',
  'panel:annotation-style',
  'panel:redaction',
  'panel:comment',
];

export default function PdfViewer({ src, title }: PdfViewerProps) {
  return (
    <div className="pdf-viewer my-6">
      {title && (
        <p className="font-body text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-800">{title}</span>
        </p>
      )}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '800px' }}>
        <PDFViewer
          src={src}
          chrome={(base, helpers) => {
            const without = helpers.removeItems(base, removeCommands);
            return { ...without, frame: { ...without.frame, tabs: 'never' } };
          }}
          onReady={(viewer: ViewerHandle) => {
            // Use built-in commands to set two-page spread and paged flow
            viewer.execute('spread:odd');
          }}
        />
      </div>
    </div>
  );
}
