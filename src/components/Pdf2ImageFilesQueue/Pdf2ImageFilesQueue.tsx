import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { usePdf2ImageContext } from "../../context/Pdf2ImageContextProvider";
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
