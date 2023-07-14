import { Button, ButtonGroup } from "@mui/material";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
import { useClearQueue } from "../../hooks/useClearQueue";
import type { ModesType } from "../../types";
import { MODES } from "../../utils/helpers";

// Component
const Pdf2ImageModeSelector = () => {
  const { activeMode, setActiveMode } = usePdf2ImageContext();
  const clearQueue = useClearQueue();
  const activeIndex = MODES.findIndex((m) => m.type === activeMode.type);

  // Handlers
  const handleChangeMode = (mode: ModesType) => () => {
    clearQueue();
    setActiveMode(mode);
  };

  // Render
  return (
    <ButtonGroup variant="outlined" fullWidth>
      {MODES.map((m, index) => (
        <Button
          key={m.type}
          variant={index === activeIndex ? "contained" : undefined}
          onClick={handleChangeMode(m)}
        >
          {m.text}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Pdf2ImageModeSelector;
