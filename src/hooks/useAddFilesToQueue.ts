import type { SyntheticEvent } from "react";
import { useCallback } from "react";
import { usePdf2ImageContext } from "../context";
import type { QueueCompletedFileType, QueueFileType } from "../types";
import { image2pdf, isImage2Pdf, isPdf2Image, pdf2image } from "../utils";
import generateUID from "../utils/helpers";

/**
 * Generate a function to generate a file
 *
 * ! FIXME correct the any type.
 *
 * @returns a function that will generate a file.
 */
export function useGenerateFile() {
  const { activeMode, quality, scale, setQueue, setQueueCompleted } =
    usePdf2ImageContext();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (id: string, file: any) => {
      let promise = null;
      if (isPdf2Image(activeMode)) {
        promise = pdf2image(id, file, quality, scale);
      } else if (isImage2Pdf(activeMode)) {
        promise = image2pdf(id, file);
      }
      if (promise) {
        promise.then((props) => {
          setQueue((queue) => queue.filter((item) => item.id !== props.id));
          setQueueCompleted((queueCompleted) => [
            ...queueCompleted,
            props as QueueCompletedFileType,
          ]);
        });
      }
    },
    [activeMode, quality, scale, setQueue, setQueueCompleted]
  );
}

/**
 * Generate a function add a file to the queue.
 *
 * @returns a function that will add a file to the queue.
 */
export function useAddFilesToQueue() {
  const { fileUploadRef, activeMode, setQueue } = usePdf2ImageContext();
  const generateFile = useGenerateFile();
  return useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (fileUploadRef?.current) {
        const tmpFiles = fileUploadRef.current.files;
        if (tmpFiles) {
          const files: QueueFileType[] = [];
          for (let i = 0; i < tmpFiles.length; ++i) {
            const file = tmpFiles.item(i);
            if (file && activeMode.fileTypes.includes(file.type)) {
              const id = generateUID();
              files.push({ id, file });
              generateFile(id, file);
            }
          }
          fileUploadRef.current.value = "";
          setQueue((queue) => [...queue, ...files]);
        }
      }
    },
    [activeMode.fileTypes, fileUploadRef, generateFile, setQueue]
  );
}
