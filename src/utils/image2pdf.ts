import { PDFDocument } from 'pdf-lib';
import type { QueueCompletedImage2PdfItem, QueueItem } from '../types';

/**
 * Converts an image file to a PDF document.
 *
 * ? this should be run in a web worker as if a big image is used will block the main thread.
 *
 * @param item - The queue item to convert.
 * @returns A promise that resolves to an object containing the converted PDF document information.
 */
export async function image2pdf(
  item: QueueItem
): Promise<QueueCompletedImage2PdfItem> {
  const { id, file } = item;
  const url = URL.createObjectURL(file);
  const imageBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.create();
  const image = await (file.type === 'image/jpeg'
    ? pdfDoc.embedJpg(imageBytes)
    : pdfDoc.embedPng(imageBytes));
  const imageDims = image.scale(1);
  const page = pdfDoc.addPage([imageDims.width, imageDims.height]);
  page.drawImage(image);
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes)]);
  return {
    type: 'image2pdf',
    id,
    file,
    baseName: file.name.replace(/\.[^.]*$/, ''),
    blob,
    imageURL: URL.createObjectURL(blob),
  };
}
