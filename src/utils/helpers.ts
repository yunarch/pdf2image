import type {
  ImageTypes,
  ModesType,
  QueueCompletedFileType,
  QueueFileType,
} from "../types";

export const IMAGE_TYPES: ImageTypes = {
  JPEG: "jpeg",
  // SVG: "svg"
};
export const MODES: ModesType[] = [
  { type: "pdf2image", fileTypes: "application/pdf", text: "PDF to Image" },
  {
    type: "image2pdf",
    fileTypes: "image/png, image/jpeg",
    text: "Image to PDF",
  },
];

/**
 * Check if a mode type is pdf2image.
 *
 * @param mode the mode to check.
 * @returns true if the mode.type is pdf2image, false otherwise.
 */
export function isPdf2Image(mode: ModesType) {
  return mode.type === "pdf2image";
}

/**
 * CHeck if a mode type is image2pdf.
 *
 * @param mode the mode to check.
 * @returns true if the mode.type is image2pdf, false otherwise.
 */
export function isImage2Pdf(mode: ModesType) {
  return mode.type === "image2pdf";
}

/**
 * @returns the list of image type values.
 */
export function getImageTypes() {
  return Object.values(IMAGE_TYPES);
}

/**
 * Check if the queue can be downloaded.
 * A queue can be completed if the uploading queue is empty.
 *
 * @param queue the uploading queue.
 * @param queueCompleted the upload completed queue.
 * @returns true if the queue can be downloaded, false otherwise.
 */
export function canDownloadAllQueue(
  queue: QueueFileType[],
  queueCompleted: QueueCompletedFileType[]
) {
  return queue.length === 0 && queueCompleted.length > 0;
}

/**
 * Generate a unique id
 * Math.random should be unique because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
 *
 * @returns a uid string.
 */
export default function generateUID() {
  const randomId = Math.random().toString(36).substr(2, 9);
  return `_${randomId}`;
}
