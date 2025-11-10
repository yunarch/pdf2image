import { useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { usePdf2ImageContext } from '../providers/Pdf2ImageContextProvider';
import type { QueueCompletedItem, QueueItem } from '../types';
import { image2pdf } from '../utils/image2pdf';
import { pdf2image } from '../utils/pdf2image';
import { AddFilesModal } from './AddFilesModal';

export const AddFilesBtn = () => {
  const { activeMode, queue, queueCompleted } = usePdf2ImageContext();
  const queueListRef = useRef(queue.list);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quality, setQuality] = useState(0.1);
  const [scale, setScale] = useState(3);

  // Methods
  const openFileUploader = () => {
    fileUploadRef.current?.click();
  };

  // Handlers
  const onLoadingItem = (loadingItem: QueueItem) => {
    queueListRef.current.push(loadingItem);
    queue.push(loadingItem);
  };
  const onLoadedItem = (loadedItem: QueueCompletedItem) => {
    const queueItemIndex = queueListRef.current.findIndex(
      (item) => item.id === loadedItem.id
    );
    if (queueItemIndex !== -1) {
      queueListRef.current.splice(queueItemIndex, 1);
      queue.splice(queueItemIndex, 1);
      queueCompleted.push(loadedItem);
    }
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const tmpFiles = e.target.files;
    if (!tmpFiles) return;
    const promises: Promise<QueueCompletedItem>[] = [];
    for (const file of tmpFiles) {
      if (activeMode.fileTypes.includes(file.type)) {
        const id = `_${Math.random().toString(36).slice(2, 9)}`;
        const queueItem: QueueItem = { id, file };
        onLoadingItem(queueItem);
        switch (activeMode.type) {
          case 'pdf2image': {
            promises.push(pdf2image(queueItem, { quality, scale }));
            break;
          }
          case 'image2pdf': {
            promises.push(image2pdf(queueItem));
            break;
          }
          default:
          // no-op
        }
      }
    }
    const result = await Promise.allSettled(promises);
    for (const res of result) {
      if (res.status === 'fulfilled') {
        const loadedItem = res.value;
        onLoadedItem(loadedItem);
      }
    }
  };

  // Render
  return (
    <>
      <input
        ref={fileUploadRef}
        className="hidden"
        type="file"
        multiple
        accept={activeMode.fileTypes}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        className={twJoin(
          'basis-full cursor-pointer rounded bg-sky-500 px-4 py-1 hover:bg-sky-600 sm:basis-auto',
          'transition-all duration-500',
          'text-sm uppercase'
        )}
        onClick={() => {
          if (activeMode.type === 'pdf2image') {
            dialogRef.current?.showModal();
            setModalOpen(true);
          } else {
            openFileUploader();
          }
        }}
      >
        Add Files
      </button>
      <AddFilesModal
        ref={dialogRef}
        open={modalOpen}
        onClose={() => {
          dialogRef.current?.close();
          setModalOpen(false);
        }}
        onAccept={() => {
          openFileUploader();
        }}
        quality={quality}
        setQuality={setQuality}
        scale={scale}
        setScale={setScale}
      />
    </>
  );
};
