import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import { canDownloadAllQueue } from "../../utils/helpers";
import { zipFiles } from "../../utils/zipFiles";

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
