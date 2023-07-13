import * as pdfLib from "pdfjs-dist/build/pdf";

pdfLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfLib.version}/pdf.worker.min.js`;

/**
 * Convert a pdf iterating all the pages into a images.
 *
 * @param {string} id the id of the file.
 * @param {any} file the file.
 * @param {number} quality the quality.
 * @param {number} scale the scale.
 * @returns A Promise that resolves to an object containing the ID, file, and extracted images.
 */
export async function pdf2image(id, file, quality, scale) {
  const result = { id, file, pages: [] };
  const url = URL.createObjectURL(file);
  const pdf = await pdfLib.getDocument({ url }).promise;
  const { numPages } = pdf;
  for (let i = 1; i <= numPages; i++) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = { canvasContext: ctx, viewport };
    await page.render(renderContext).promise;
    result.pages.push({
      baseName: `${file.name.replace(/\.[^.]*$/, "")}-page-${i}`,
      jpeg: canvas.toDataURL("image/jpeg", quality),
    });
  }
  return result;
}
