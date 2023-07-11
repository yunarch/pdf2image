import {
  Box,
  Card,
  CardActions,
  CardHeader,
  LinearProgress,
  Typography,
} from "@mui/material";
import { usePdf2ImageContext } from "../../context";
import Pdf2ImageFilesQueueDownloadBtn from "./Pdf2ImageFilesQueueDownloadBtn";
import Pdf2ImageFilesQueueRemoveBtn from "./Pdf2ImageFilesQueueRemoveBtn";

// Component
const Pdf2ImageFilesQueue = () => {
  const { queue, queueCompleted } = usePdf2ImageContext();

  // Render
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
        gridGap: "16px",
        mt: "16px",
      }}
    >
      {queue.map((element) => (
        <Card key={`file-queue--${element.id}`}>
          <CardHeader title={<Typography>{element.file.name}</Typography>} />
          <CardActions sx={{ display: "block" }}>
            <LinearProgress />
          </CardActions>
        </Card>
      ))}
      {queueCompleted.map((element) => (
        <Card key={`file-completed--${element.id}`}>
          <CardHeader
            sx={{ "> .MuiCardHeader-content": { overflow: "hidden" } }}
            title={
              <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {element.file.name}
              </Typography>
            }
            action={<Pdf2ImageFilesQueueRemoveBtn element={element} />}
          />
          <CardActions>
            <Pdf2ImageFilesQueueDownloadBtn element={element} />
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Pdf2ImageFilesQueue;
