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
          The quality is the value of 0.1 to 1 that the images extracted from
          the PDF will have. The higher the quality, the greater the weight in
          the image. We recommend a value from 0.8 to 1 if you want to edit the
          image later (for example to crop), if you want to upload the image
          directly we recommend a value of 0.1.
        </Typography>
        <Typography mt="16px">
          The scale value is the value to expand the PDF and extract the image
          in that resolution, the higher the scale the greater the weight in the
          image, but the image quality will be better. We recommend a value of
          3.
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
