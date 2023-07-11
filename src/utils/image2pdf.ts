import { PDFDocument } from "pdf-lib";

/**
 * Converts an image file to a PDF document.
 *
 * @param id - The ID of the converted document.
 * @param file - The image file to convert.
 * @returns A promise that resolves to an object containing the converted PDF document information.
 */
export async function image2pdf(id: string, file: Blob) {
  const url = URL.createObjectURL(file);
  const imageBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.create();
  let image;
  if (file.type === "image/jpeg") {
    image = await pdfDoc.embedJpg(imageBytes);
  } else {
    image = await pdfDoc.embedPng(imageBytes);
  }
  const imageDims = image.scale(1);
  const page = pdfDoc.addPage([imageDims.width, imageDims.height]);
  page.drawImage(image);
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes]);
  return {
    id,
    file,
    baseName: file.name.replace(/\.[^.]*$/, ""),
    blob,
    imageURL: URL.createObjectURL(blob),
  };
}
