import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import { canDownloadAllQueue, isImage2Pdf } from "../../utils/helpers";
import { mergePDFs } from "../../utils/mergePDFs";

// Component
const Pdf2ImageCombineBtn = () => {
  const { queue, queueCompleted, activeMode, isLoading, setIsLoading } =
    usePdf2ImageContext();

  // Methods
  const combinedAndDownload = () => {
    if (isImage2Pdf(activeMode)) {
      setIsLoading(true);
      const imageURLFiles = queueCompleted.reduce((acc, val) => {
        acc.push(val.imageURL!);
        return acc;
      }, [] as string[]);
      setTimeout(() => {
        mergePDFs(imageURLFiles).then((imageURL) => {
          const link = document.createElement("a");
          link.download = "combined.pdf";
          link.href = imageURL;
          link.click();
          setIsLoading(false);
        });
      }, 500);
    }
  };

  // Render
  return isImage2Pdf(activeMode) ? (
    <Button
      color="secondary"
      onClick={combinedAndDownload}
      disabled={isLoading || !canDownloadAllQueue(queue, queueCompleted)}
    >
      {isLoading ? <CircularProgress /> : "Combine"}
    </Button>
  ) : null;
};

export default Pdf2ImageCombineBtn;
