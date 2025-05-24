import { IoCloseCircleSharp } from 'react-icons/io5';
import { twJoin } from 'tailwind-merge';
import { ProgressBar } from '../ui/ProgressBar';

export const FilesQueueItem = ({
  name,
  isLoading,
  onDelete,
  onDownload,
}: {
  name: string;
  isLoading?: boolean;
  onDelete?: () => void;
  onDownload?: () => void;
}) => {
  return (
    <div className="rounded shadow dark:shadow-cyan-400">
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="text-base font-bold break-all">{name}</div>
          {!isLoading && (
            <button
              aria-label={`Remove ${name} from queue`}
              title={`Remove ${name} from queue`}
              type="button"
              className={twJoin(
                'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2',
                'transition-all duration-200 hover:bg-gray-300 dark:hover:bg-slate-600'
              )}
              onClick={() => {
                onDelete?.();
              }}
            >
              <IoCloseCircleSharp className="fill-red-500" />
            </button>
          )}
        </div>
        {isLoading ? (
          <ProgressBar />
        ) : (
          <button
            type="button"
            className={twJoin(
              'w-full rounded border px-4 py-1',
              'cursor-pointer border-sky-500 !text-sky-500 hover:border-sky-600',
              'transition-all duration-500',
              'text-sm uppercase'
            )}
            onClick={() => {
              onDownload?.();
            }}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};
