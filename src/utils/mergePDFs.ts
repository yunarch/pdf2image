import { PDFDocument } from "pdf-lib";

/**
 * Merge different pdfs into one unique pdf.
 *
 * @param pdfsToMerge the list of pdfs to merge.
 * @returns a promise that resolves to the merged pdf.
 */
export async function mergePDFs(pdfsToMerge: string[]) {
  const mergedPdf = await PDFDocument.create();
  for (let i = 0, len = pdfsToMerge.length; i < len; i++) {
    const pdfUrl = pdfsToMerge[i];
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }
  const pdfBytes = await mergedPdf.save();
  return URL.createObjectURL(new Blob([pdfBytes]));
}
