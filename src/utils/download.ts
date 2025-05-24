import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import type { QueueCompletedImage2PdfItem, QueueCompletedItem } from '../types';

/**
 * @param url - The URL of the resource to fetch.
 * @returns A promise that resolves to a Blob object containing the fetched resource.
 */
async function fetchBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  return response.blob();
}

/**
 * Creates a zip file.
 *
 * @param items - An array of objects to be zipped.
 * @returns A promise that resolves to a Blob URL of the zip file.
 */
async function zipFiles(
  items: {
    fileName: string;
    blob: Blob;
  }[]
) {
  const zip = new JSZip();
  for (const item of items) {
    zip.file(item.fileName, item.blob);
  }
  const blob = await zip.generateAsync({ type: 'blob' });
  return URL.createObjectURL(blob);
}

/**
 * Downloads a single completed item.
 *
 * @param item - The completed item to be downloaded.
 */
export async function downloadItem(item: QueueCompletedItem) {
  switch (item.type) {
    case 'image2pdf': {
      const { baseName, imageURL } = item;
      const link = document.createElement('a');
      link.download = `${baseName}.pdf`;
      link.href = imageURL;
      link.click();
      break;
    }
    case 'pdf2image': {
      const { baseName, pages } = item;
      const filePromises: Promise<{ fileName: string; blob: Blob }>[] = [];
      for (const [pageIndex, page] of pages.entries()) {
        filePromises.push(
          fetchBlob(page.jpeg).then((blob) => ({
            fileName: `${baseName}_page_${pageIndex + 1}.jpeg`,
            blob,
          }))
        );
      }
      const files = await Promise.all(filePromises);
      const href = await zipFiles(files);
      const link = document.createElement('a');
      link.download = `${baseName}.zip`;
      link.href = href;
      link.click();
      break;
    }
    default:
    // no-op
  }
}

/**
 * Downloads all completed items as a zip file.
 *
 * @param name - The name of the zip file to be downloaded.
 * @param items - Array of completed items to be included in the zip file.
 */
export async function downloadAll(name: string, items: QueueCompletedItem[]) {
  const filePromises: Promise<{ fileName: string; blob: Blob }>[] = [];
  for (const item of items) {
    switch (item.type) {
      case 'image2pdf': {
        filePromises.push(
          fetchBlob(item.imageURL).then((blob) => ({
            fileName: `${item.baseName}.pdf`,
            blob,
          }))
        );
        break;
      }
      case 'pdf2image': {
        for (const [pageIndex, page] of item.pages.entries()) {
          filePromises.push(
            fetchBlob(page.jpeg).then((blob) => ({
              fileName: `${item.baseName}_${pageIndex + 1}.jpeg`,
              blob,
            }))
          );
        }
        continue;
      }
      default:
      // no-op
    }
  }
  const files = await Promise.all(filePromises);
  const href = await zipFiles(files);
  const link = document.createElement('a');
  link.download = `${name}.zip`;
  link.href = href;
  link.click();
}

/**
 * Downloads all completed image to PDF items as a combined PDF.
 *
 * @param name - The name of the combined PDF file to be downloaded.
 * @param items - Array of completed image to PDF items.
 */
export async function downloadAllCombineImages(
  name: string,
  items: QueueCompletedImage2PdfItem[]
) {
  const imageUrls = items.map((item) => item.imageURL).filter(Boolean);
  const pdf = await PDFDocument.create();
  for (const imageUrl of imageUrls) {
    const bytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
    const input = await PDFDocument.load(bytes);
    const copiedPages = await pdf.copyPages(input, input.getPageIndices());
    for (const page of copiedPages) {
      pdf.addPage(page);
    }
  }
  const pdfBytes = await pdf.save();
  const imageUrl = URL.createObjectURL(new Blob([pdfBytes]));
  const link = document.createElement('a');
  link.download = `${name}_combined.pdf`;
  link.href = imageUrl;
  link.click();
}
