import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import type { QueueCompletedFileType } from "../../types";

// Prop types
type Pdf2ImageFilesQueueRemoveBtnProps = {
  element: QueueCompletedFileType;
};

// Component
const Pdf2ImageFilesQueueRemoveBtn = ({
  element,
}: Pdf2ImageFilesQueueRemoveBtnProps) => {
  const { queueCompleted, setQueueCompleted } = usePdf2ImageContext();

  // Handlers
  const handleRemoveUploadFile = () => {
    setQueueCompleted(queueCompleted.filter((item) => item.id !== element.id));
  };

  // Render
  return (
    <IconButton
      size="small"
      color="error"
      aria-label="Remove file"
      onClick={handleRemoveUploadFile}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default Pdf2ImageFilesQueueRemoveBtn;
