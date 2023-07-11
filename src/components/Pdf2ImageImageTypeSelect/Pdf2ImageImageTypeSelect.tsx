import { Box, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { usePdf2ImageContext } from "../../context";
import type { ImageType } from "../../types";
import { getImageTypes, isPdf2Image } from "../../utils";

// Component
const Pdf2ImageImageTypeSelect = () => {
  const { activeMode, imageType, setImageType } = usePdf2ImageContext();

  // Handlers
  const handleChangeImageType = (e: SelectChangeEvent) => {
    setImageType(e.target.value as ImageType);
  };

  // Render
  return isPdf2Image(activeMode) ? (
    <Box
      sx={{
        width: "25ch",
      }}
    >
      <Select
        size="small"
        fullWidth
        value={imageType}
        onChange={handleChangeImageType}
      >
        {getImageTypes().map((val) => (
          <MenuItem key={`image-type--${val}`} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </Box>
  ) : null;
};

export default Pdf2ImageImageTypeSelect;
