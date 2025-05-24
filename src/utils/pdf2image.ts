import * as pdfLib from 'pdfjs-dist';
import type { QueueCompletedPdf2ImageItem, QueueItem } from '../types';

pdfLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

/**
 * Convert a pdf iterating all the pages into a images.
 *
 * @param item - The queue item to convert.
 * @param options - Options for the conversion.
 * @returns A Promise that resolves to an object containing the ID, file, and extracted images.
 */
export async function pdf2image(
  item: QueueItem,
  options: {
    quality: number;
    scale: number;
  }
): Promise<QueueCompletedPdf2ImageItem> {
  const { id, file } = item;
  const { quality, scale } = options;
  const result: QueueCompletedPdf2ImageItem = {
    type: 'pdf2image',
    id,
    file,
    baseName: file.name.replace(/\.[^.]*$/, ''),
    pages: [],
  };
  const url = URL.createObjectURL(file);
  const pdf = await pdfLib.getDocument({ url }).promise;
  const { numPages } = pdf;
  for (let i = 1; i <= numPages; i++) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) break;
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = { canvasContext: ctx, viewport };
    await page.render(renderContext).promise;
    result.pages.push({
      baseName: `${file.name.replace(/\.[^.]*$/, '')}-page-${i}`,
      jpeg: canvas.toDataURL('image/jpeg', quality),
    });
  }
  return result;
}
