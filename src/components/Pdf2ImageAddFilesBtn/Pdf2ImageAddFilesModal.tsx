import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { usePdf2ImageContext } from "../../context";
import { useOpenFileUploader } from "../../hooks";

// Prop types
type Pdf2ImageAddFilesModalProps = {
  open: boolean;
  onClose: () => void;
};

// Component
const Pdf2ImageAddFilesModal = ({
  open,
  onClose,
}: Pdf2ImageAddFilesModalProps) => {
  const { scale, setScale, quality, setQuality } = usePdf2ImageContext();
  const openFileUploader = useOpenFileUploader();

  // Handlers
  const handleAddFiles = () => {
    onClose();
    openFileUploader();
  };

  // Render
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Image Resolution</DialogTitle>
      <DialogContent>
        <Typography>
          The quality parameter determines the value of image quality when
          extracting images from the PDF, ranging from 0.1 to 1. A higher
          quality value results in a larger image file size. For editing
          purposes, such as cropping, we recommend a value between 0.8 and 1.
          However, if you intend to directly use (e.g upload) the image, a value
          of 0.1 is recommended.
        </Typography>
        <Typography mt="16px">
          The scale parameter determines the resolution at which the PDF is
          expanded and the image is extracted. A higher scale value increases
          the image size, but (might) enhances its quality. We recommend using a
          scale value of 3 for optimal results.
        </Typography>
        <Box display="flex" alignItems="center" mt="30px" gap="16px">
          <TextField
            variant="standard"
            type="number"
            label="Quality"
            inputProps={{
              min: 0.1,
              max: 1,
              step: 0.1,
            }}
            value={quality}
            onChange={(e) => setQuality(+e.target.value)}
          />
          <TextField
            variant="standard"
            type="number"
            label="Scale"
            inputProps={{
              min: 1,
              max: 5,
              step: 1,
            }}
            defaultValue={scale}
            onChange={(e) => setScale(+e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAddFiles}>
          Add Files
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Pdf2ImageAddFilesModal;
