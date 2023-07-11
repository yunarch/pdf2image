import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { createContext, useContext, useRef, useState } from "react";
import type {
  ImageType,
  ModesType,
  QueueCompletedFileType,
  QueueFileType,
} from "../types";
import { IMAGE_TYPES, MODES } from "../utils";

// Create context
type ContextProps = {
  fileUploadRef?: RefObject<HTMLInputElement>;
  queue: QueueFileType[];
  setQueue: Dispatch<SetStateAction<QueueFileType[]>>;
  queueCompleted: QueueCompletedFileType[];
  setQueueCompleted: Dispatch<SetStateAction<QueueCompletedFileType[]>>;
  activeMode: ModesType;
  setActiveMode: (mode: ModesType) => void;
  imageType: ImageType;
  setImageType: (imageType: ImageType) => void;
  scale: number;
  setScale: (scale: number) => void;
  quality: number;
  setQuality: (quality: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
const Pdf2ImageContext = createContext<ContextProps | undefined>(undefined);

// Context provider
type Pdf2ImageContextProviderProps = {
  children: ReactNode;
};
const Pdf2ImageContextProvider = ({
  children,
}: Pdf2ImageContextProviderProps) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [queue, setQueue] = useState<QueueFileType[]>([]);
  const [queueCompleted, setQueueCompleted] = useState<
    QueueCompletedFileType[]
  >([]);
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [imageType, setImageType] = useState<ImageType>(IMAGE_TYPES.JPEG);
  const [scale, setScale] = useState(3);
  const [quality, setQuality] = useState(0.1);
  const [isLoading, setIsLoading] = useState(false);

  // Create context value
  const contextValue: ContextProps = {
    fileUploadRef,
    queue,
    setQueue,
    queueCompleted,
    setQueueCompleted,
    activeMode,
    setActiveMode,
    imageType,
    setImageType,
    scale,
    setScale,
    quality,
    setQuality,
    isLoading,
    setIsLoading,
  };

  // Render
  return (
    <Pdf2ImageContext.Provider value={contextValue}>
      {children}
    </Pdf2ImageContext.Provider>
  );
};

// Hook to get the context value
function usePdf2ImageContext() {
  const context = useContext(Pdf2ImageContext);
  if (!context) {
    throw new Error(
      "usePdf2ImageContext must be used within a Pdf2ImageContextProvider"
    );
  }
  return context;
}

export { Pdf2ImageContextProvider, usePdf2ImageContext };
