import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { usePdf2ImageContext } from '../providers/Pdf2ImageContextProvider';
import { Spinner } from '../ui/Spinner';
import { downloadAllCombineImages } from '../utils/download';

export const DownloadAllCombineImagesBtn = () => {
  const { activeMode, queue, queueCompleted } = usePdf2ImageContext();
  const [isLoading, setIsLoading] = useState(false);
  const canDownload =
    !isLoading && queue.length === 0 && queueCompleted.length > 0;

  if (activeMode.type !== 'image2pdf') return null;
  if (queue.length === 0 && queueCompleted.length <= 1) return null;
  return (
    <button
      type="button"
      className={twJoin(
        'basis-full rounded border px-4 py-1 sm:basis-auto',
        canDownload &&
          'cursor-pointer border-emerald-500 !text-emerald-500 hover:border-emerald-600',
        !canDownload && 'cursor-not-allowed border-gray-500 opacity-50',
        'transition-all duration-500',
        'text-sm uppercase'
      )}
      onClick={async () => {
        try {
          setIsLoading(true);
          await downloadAllCombineImages(
            activeMode.type,
            queueCompleted.list.filter((item) => item.type === 'image2pdf')
          );
        } finally {
          setIsLoading(false);
        }
      }}
      disabled={isLoading || !canDownload}
    >
      {isLoading ? <Spinner /> : 'Combine & Download'}
    </button>
  );
};
