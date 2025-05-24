// Define Modes
export type ModeType = 'pdf2image' | 'image2pdf';
export type Mode = {
  type: ModeType;
  fileTypes: string;
  text: string;
};
export const MODES: Mode[] = [
  {
    type: 'pdf2image',
    fileTypes: 'application/pdf',
    text: 'PDF to Image',
  },
  {
    type: 'image2pdf',
    fileTypes: 'image/png, image/jpeg',
    text: 'Image to PDF',
  },
] as const;

// Define queues
export interface QueueItem {
  id: string;
  file: File;
}
interface BaseQueueCompletedItem extends QueueItem {
  baseName: string;
}
export interface QueueCompletedImage2PdfItem extends BaseQueueCompletedItem {
  type: 'image2pdf';
  baseName: string;
  blob: Blob;
  imageURL: string;
}
export interface QueueCompletedPdf2ImageItem extends BaseQueueCompletedItem {
  type: 'pdf2image';
  baseName: string;
  pages: {
    baseName: string;
    jpeg: string;
  }[];
}
export type QueueCompletedItem =
  | QueueCompletedImage2PdfItem
  | QueueCompletedPdf2ImageItem;
