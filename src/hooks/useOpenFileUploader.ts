import { useCallback } from "react";
import { usePdf2ImageContext } from "../context";

/**
 * Generate a function to open a native browser file uploader.
 *
 * @returns a function that will clear the queue.
 */
export function useOpenFileUploader() {
  const { fileUploadRef } = usePdf2ImageContext();
  return useCallback(() => {
    fileUploadRef?.current?.click();
  }, [fileUploadRef]);
}
