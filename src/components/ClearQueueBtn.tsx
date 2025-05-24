import { twJoin } from 'tailwind-merge';
import { usePdf2ImageContext } from '../providers/Pdf2ImageContextProvider';

export const ClearQueueBtn = () => {
  const { queue, queueCompleted } = usePdf2ImageContext();
  const canClearQueue = queue.length > 0 || queueCompleted.length > 0;

  return (
    <button
      type="button"
      className={twJoin(
        'basis-full rounded border px-4 py-1 sm:basis-auto',
        canClearQueue &&
          'cursor-pointer border-amber-500 !text-amber-500 hover:border-amber-600',
        !canClearQueue && 'cursor-not-allowed border-gray-500 opacity-50',
        'transition-all duration-500',
        'text-sm uppercase'
      )}
      onClick={() => {
        queue.clear();
        queueCompleted.clear();
      }}
      disabled={!canClearQueue}
    >
      Clear Queue
    </button>
  );
};
