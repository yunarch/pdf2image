import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import type { ImageType } from "../../types";
import { getImageTypes, isPdf2Image } from "../../utils/helpers";

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
