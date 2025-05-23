import { createContext, use, useMemo, useState, type ReactNode } from 'react';
import { useQueue } from '../hooks/useQueue';
import {
  MODES,
  type Mode,
  type QueueCompletedItem,
  type QueueItem,
} from '../types';

// Create context
type ContextProps = {
  queue: ReturnType<typeof useQueue<QueueItem>>;
  queueCompleted: ReturnType<typeof useQueue<QueueCompletedItem<unknown>>>;
  activeMode: Mode;
  setActiveMode: (mode: Mode) => void;
  quality: number;
  setQuality: (quality: number) => void;
  scale: number;
  setScale: (scale: number) => void;
};
const Pdf2ImageContext = createContext<ContextProps | undefined>(undefined);

// Context provider
export const Pdf2ImageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const queue = useQueue<QueueItem>([]);
  const queueCompleted = useQueue<QueueCompletedItem<unknown>>([]);
  const [activeMode, setActiveMode] = useState<Mode>(MODES[0]);
  const [quality, setQuality] = useState(0.1);
  const [scale, setScale] = useState(3);

  // Create context value
  const contextValue: ContextProps = useMemo(
    () => ({
      queue,
      queueCompleted,
      activeMode,
      setActiveMode: (mode) => {
        if (mode !== activeMode) {
          queue.clear();
          queueCompleted.clear();
        }
        setActiveMode(mode);
      },
      quality,
      setQuality,
      scale,
      setScale,
    }),
    [activeMode, quality, queue, queueCompleted, scale]
  );

  // Render
  return <Pdf2ImageContext value={contextValue}>{children}</Pdf2ImageContext>;
};

/**
 * @returns the context value of the Pdf2ImageContext.
 * @throws an error if the context is not used within a Pdf2ImageContextProvider.
 */
export function usePdf2ImageContext() {
  const context = use(Pdf2ImageContext);
  if (!context) {
    throw new Error(
      'usePdf2ImageContext must be used within a Pdf2ImageContextProvider'
    );
  }
  return context;
}
