import { Box } from "@mui/material";
import { Pdf2ImageAddFilesBtn } from "../components/Pdf2ImageAddFilesBtn";
import { Pdf2ImageClearQueueBtn } from "../components/Pdf2ImageClearQueueBtn";
import { Pdf2ImageCombineBtn } from "../components/Pdf2ImageCombineBtn";
import { Pdf2ImageDownloadAllBtn } from "../components/Pdf2ImageDownloadAllBtn";
import { Pdf2ImageFileInput } from "../components/Pdf2ImageFileInput";
import { Pdf2ImageFilesQueue } from "../components/Pdf2ImageFilesQueue";
import { Pdf2ImageImageTypeSelect } from "../components/Pdf2ImageImageTypeSelect";
import { Pdf2ImageModeSelector } from "../components/Pdf2ImageModeSelector";
import { Pdf2ImageContextProvider } from "../context";

export default function Pdf2ImagePage() {
  return (
    <Pdf2ImageContextProvider>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "16px",
        }}
      >
        <Pdf2ImageFileInput />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Pdf2ImageModeSelector />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px",
              py: "12px",
              "> *": {
                flexGrow: {
                  xs: 1,
                  sm: "inherit",
                },
              },
            }}
          >
            <Pdf2ImageAddFilesBtn />
            <Pdf2ImageClearQueueBtn />
            <Pdf2ImageImageTypeSelect />
          </Box>
        </Box>
        <Box
          sx={{ flex: "1", overflowY: "auto", mx: "-16px", px: "16px" }}
          className="flex-1"
        >
          <Pdf2ImageFilesQueue />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: "16px",
            py: "16px",
          }}
        >
          <Pdf2ImageDownloadAllBtn />
          <Pdf2ImageCombineBtn />
        </Box>
      </Box>
    </Pdf2ImageContextProvider>
  );
}
