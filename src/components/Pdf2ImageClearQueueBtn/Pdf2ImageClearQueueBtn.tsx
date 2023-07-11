import { Button } from "@mui/material";
import { usePdf2ImageContext } from "../../context";
import { useClearQueue } from "../../hooks";

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
