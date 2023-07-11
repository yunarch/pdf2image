export type ModeType = "pdf2image" | "image2pdf";

export type ModesType = {
  type: ModeType;
  fileTypes: string;
  text: string;
};

export type ImageType = "jpeg";

export type ImageTypes = {
  [k: string]: ImageType;
};

export type QueueFileType = { id: string; file: File };

// ! FIXME it should not use any type
export type QueueCompletedFileType = QueueFileType & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseName?: any;
  blob?: Blob;
  imageURL?: string;
};
