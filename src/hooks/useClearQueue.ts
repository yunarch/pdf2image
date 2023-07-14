import { useCallback } from "react";
import { usePdf2ImageContext } from "../context/Pdf2ImageContextProvider";

/**
 * Generate a function to clear the queue.
 *
 * @returns a function that will clear the queue.
 */
export function useClearQueue() {
  const { setQueue, setQueueCompleted } = usePdf2ImageContext();
  return useCallback(() => {
    setQueue([]);
    setQueueCompleted([]);
  }, [setQueue, setQueueCompleted]);
}
