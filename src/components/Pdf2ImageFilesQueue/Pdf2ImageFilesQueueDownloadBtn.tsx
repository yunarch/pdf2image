import { Button } from "@mui/material";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import type { QueueCompletedFileType } from "../../types";
import { isImage2Pdf, isPdf2Image } from "../../utils/helpers";
import { zipFiles } from "../../utils/zipFiles";

// Prop types
type Pdf2ImageFilesQueueDownloadBtnProps = {
  element: QueueCompletedFileType;
};

// Component
const Pdf2ImageFilesQueueDownloadBtn = ({
  element,
}: Pdf2ImageFilesQueueDownloadBtnProps) => {
  const { activeMode, imageType, isLoading } = usePdf2ImageContext();

  // Handlers
  const handleDownloadFile = () => {
    if (isLoading) return;
    if (isPdf2Image(activeMode)) {
      const { file, pages } = element;
      if (pages!.length > 1) {
        zipFiles(pages!, imageType).then((imageURL) => {
          const link = document.createElement("a");
          link.download = file.name.replace(".pdf", ".zip");
          link.href = imageURL;
          link.click();
        });
      } else {
        const link = document.createElement("a");
        link.download = `${pages![0].baseName}.${imageType}`;
        link.href = pages![0][imageType];
        link.click();
      }
    } else if (isImage2Pdf(activeMode)) {
      const { baseName, imageURL } = element;
      const link = document.createElement("a");
      link.download = `${baseName}.pdf`;
      link.href = imageURL!;
      link.click();
    }
  };

  // Render
  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={handleDownloadFile}
      disabled={isLoading}
    >
      Download
    </Button>
  );
};

export default Pdf2ImageFilesQueueDownloadBtn;
