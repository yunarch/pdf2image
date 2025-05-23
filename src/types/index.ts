export type ModeType = 'pdf2image' | 'image2pdf';
export type Mode = {
  type: ModeType;
  fileTypes: string;
  text: string;
};

export interface QueueItem {
  id: string;
  file: File;
}
export interface QueueCompletedItem<T> extends QueueItem {
  pages?: T[];
  baseName?: string;
  blob?: Blob;
  imageURL?: string;
}

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
