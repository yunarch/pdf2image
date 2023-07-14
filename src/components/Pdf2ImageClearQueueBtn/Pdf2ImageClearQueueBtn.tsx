import Button from "@mui/material/Button";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import { useClearQueue } from "../../hooks/useClearQueue";

// Component
const Pdf2ImageClearQueueBtn = () => {
  const { queue, queueCompleted } = usePdf2ImageContext();
  const clearQueue = useClearQueue();
  const canClearQueue = queue.length > 0 || queueCompleted.length > 0;

  // Render
  return (
    <Button
      variant="outlined"
      color="warning"
      onClick={clearQueue}
      disabled={!canClearQueue}
    >
      Clear Queue
    </Button>
  );
};

export default Pdf2ImageClearQueueBtn;
