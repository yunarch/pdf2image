import { usePdf2ImageContext } from "../../context";
import { useAddFilesToQueue } from "../../hooks";

// Component
const Pdf2ImageFileInput = () => {
  const { fileUploadRef, activeMode } = usePdf2ImageContext();
  const addFileToQueue = useAddFilesToQueue();

  // Render
  return (
    <input
      ref={fileUploadRef}
      type="file"
      multiple
      accept={activeMode.fileTypes}
      onChange={addFileToQueue}
      style={{ display: "none" }}
    />
  );
};

export default Pdf2ImageFileInput;
