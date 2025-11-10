import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { usePdf2ImageContext } from '../providers/Pdf2ImageContextProvider';
import { Spinner } from '../ui/Spinner';
import { downloadAll } from '../utils/download';

export const DownloadAllBtn = () => {
  const { activeMode, queue, queueCompleted } = usePdf2ImageContext();
  const [isLoading, setIsLoading] = useState(false);
  const canDownload =
    !isLoading && queue.length === 0 && queueCompleted.length > 0;

  if (queue.length === 0 && queueCompleted.length === 0) return null;
  return (
    <button
      type="button"
      className={twJoin(
        'basis-full rounded px-4 py-1 sm:basis-auto',
        canDownload && 'cursor-pointer bg-emerald-500 hover:bg-emerald-600',
        !canDownload && 'cursor-not-allowed opacity-50',
        'transition-all duration-500',
        'text-sm uppercase'
      )}
      onClick={async () => {
        try {
          setIsLoading(true);
          await downloadAll(activeMode.type, queueCompleted.list);
        } finally {
          setIsLoading(false);
        }
      }}
      disabled={!canDownload}
    >
      {isLoading ? <Spinner /> : 'Download All'}
    </button>
  );
};
