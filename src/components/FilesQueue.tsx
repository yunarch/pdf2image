import { usePdf2ImageContext } from '../providers/Pdf2ImageContextProvider';
import { downloadItem } from '../utils/download';
import { FilesQueueItem } from './FilesQueueItem';

export const FilesQueue = () => {
  const { queue, queueCompleted } = usePdf2ImageContext();
  return (
    <>
      {queue.list.current.map((element) => (
        <FilesQueueItem
          key={`file--${element.id}`}
          name={element.file.name}
          isLoading
        />
      ))}
      {queueCompleted.list.current.map((element, index) => (
        <FilesQueueItem
          key={`file--${element.id}`}
          name={element.file.name}
          onDelete={() => {
            queueCompleted.splice(index, 1);
          }}
          onDownload={async () => {
            await downloadItem(element);
          }}
        />
      ))}
    </>
  );
};
