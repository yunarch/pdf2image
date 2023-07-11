/* eslint-disable @typescript-eslint/no-explicit-any */
import JSZip from "jszip";

/**
 * Compress files into zip.
 *
 * ! FIXME use the correct type and remove any once the type doesn't have the any type.
 *
 * @param completed the list of completed files.
 * @param extension the extension of the files.
 * @returns a promise that resolves to the zip file.
 */
export async function zipFiles(completed: any[], extension: string) {
  const zip = new JSZip();
  for (let i = 0, len = completed.length; i < len; i++) {
    const element = completed[i];
    let fileName;
    if (element.blob) {
      fileName = `${element.baseName}.${extension}`;
      zip.file(fileName, element.blob);
    } else if (element.pages) {
      for (let j = 0, lenJ = element.pages.length; j < lenJ; j++) {
        const page = element.pages[j];
        const imageBlob = await fetch(page[extension]).then((r) => r.blob());
        fileName = `${page.baseName}.${extension}`;
        zip.file(fileName, imageBlob);
      }
    } else if (element[extension]) {
      const imageBlob = await fetch(element[extension]).then((r) => r.blob());
      fileName = `${element.baseName}.${extension}`;
      zip.file(fileName, imageBlob);
    }
  }
  const blob = await zip.generateAsync({ type: "blob" });
  return URL.createObjectURL(blob);
}
