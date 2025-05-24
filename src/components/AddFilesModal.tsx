import type { RefObject } from 'react';
import { twJoin } from 'tailwind-merge';

export const AddFilesModal = ({
  ref,
  open,
  onClose,
  onAccept,
  quality,
  setQuality,
  scale,
  setScale,
}: {
  ref?: RefObject<HTMLDialogElement | null>;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  quality: number;
  setQuality: (quality: number) => void;
  scale: number;
  setScale: (scale: number) => void;
}) => {
  return (
    <dialog
      ref={ref}
      open={open}
      className={twJoin(
        'mx-auto self-center-safe rounded bg-white p-4 shadow dark:bg-slate-800',
        'w-11/12 max-w-2xl',
        'backdrop:bg-gray-400 backdrop:opacity-50'
      )}
    >
      <p className="text-lg font-bold">Image Resolution</p>
      <div className="my-6 flex flex-col gap-4">
        <p className="text-xs">
          The quality parameter determines the value of image quality when
          extracting images from the PDF, ranging from 0.1 to 1. A higher
          quality value results in a larger image file size. For editing
          purposes, such as cropping, we recommend a value between 0.8 and 1.
          However, if you intend to directly use (e.g upload) the image, a value
          of 0.1 is recommended.
        </p>
        <p className="text-xs">
          The scale parameter determines the resolution at which the PDF is
          expanded and the image is extracted. A higher scale value increases
          the image size, but (might) enhances its quality. We recommend using a
          scale value of 3 for optimal results.
        </p>
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs">Quality</p>
            <input
              type="number"
              className={twJoin(
                'border-b bg-transparent px-3 py-2 text-sm focus:outline-none',
                'border-slate-200 hover:border-slate-300 focus:border-slate-400',
                'text-slate-700 placeholder:text-slate-400',
                'transition duration-300',
                'min-w-20'
              )}
              value={quality}
              min={0.1}
              max={1}
              step={0.1}
              onChange={(e) => {
                setQuality(e.currentTarget.valueAsNumber);
              }}
            />
          </div>
          <div>
            <p className="text-xs">Scale</p>
            <input
              type="number"
              className={twJoin(
                'border-b bg-transparent px-3 py-2 text-sm focus:outline-none',
                'border-slate-200 hover:border-slate-300 focus:border-slate-400',
                'text-slate-700 placeholder:text-slate-400',
                'transition duration-300',
                'min-w-20'
              )}
              value={scale}
              min={1}
              max={5}
              step={1}
              onChange={(e) => {
                setScale(e.currentTarget.valueAsNumber);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          className={twJoin(
            'cursor-pointer rounded px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700',
            'transition-all duration-500',
            'text-sm uppercase'
          )}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className={twJoin(
            'cursor-pointer rounded bg-teal-500 px-4 py-2 hover:bg-teal-600',
            'transition-all duration-500',
            'text-sm uppercase'
          )}
          onClick={() => {
            onClose();
            onAccept();
          }}
        >
          Add files
        </button>
      </div>
    </dialog>
  );
};
