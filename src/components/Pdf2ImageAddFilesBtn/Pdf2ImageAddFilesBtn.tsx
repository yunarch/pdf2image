import Button from "@mui/material/Button";
import { useState } from "react";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import { useOpenFileUploader } from "../../hooks/useOpenFileUploader";
import { isPdf2Image } from "../../utils/helpers";
import Pdf2ImageAddFilesModal from "./Pdf2ImageAddFilesModal";

// Component
const Pdf2ImageAddFilesBtn = () => {
  const { activeMode } = usePdf2ImageContext();
  const [modalOpen, setModalOpen] = useState(false);
  const openFileUploader = useOpenFileUploader();

  // Handlers
  const handleAddFile = () => {
    if (isPdf2Image(activeMode)) {
      setModalOpen(true);
    } else {
      openFileUploader();
    }
  };

  // Render
  return (
    <>
      <Button variant="contained" onClick={handleAddFile}>
        Add Files
      </Button>
      <Pdf2ImageAddFilesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default Pdf2ImageAddFilesBtn;
