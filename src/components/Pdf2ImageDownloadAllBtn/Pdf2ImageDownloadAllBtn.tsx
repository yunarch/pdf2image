import { Button, CircularProgress } from "@mui/material";
import { usePdf2ImageContext } from "../../context";
import { canDownloadAllQueue, zipFiles } from "../../utils";

// Component
const Pdf2ImageDownloadAllBtn = () => {
  const { queue, queueCompleted, activeMode, isLoading, setIsLoading } =
    usePdf2ImageContext();

  // Methods
  const downloadAllFiles = () => {
    setIsLoading(true);
    setTimeout(() => {
      zipFiles(queueCompleted, "pdf").then((imageURL) => {
        const link = document.createElement("a");
        link.download = `${activeMode.type}.zip`;
        link.href = imageURL;
        link.click();
        setIsLoading(false);
      });
    }, 500);
  };

  // Render
  return (
    <Button
      color="secondary"
      onClick={downloadAllFiles}
      disabled={isLoading || !canDownloadAllQueue(queue, queueCompleted)}
    >
      {isLoading ? <CircularProgress /> : "Download All"}
    </Button>
  );
};

export default Pdf2ImageDownloadAllBtn;
