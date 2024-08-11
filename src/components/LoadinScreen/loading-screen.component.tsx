import { CircularProgress } from "@mui/material";
import "./loading-screen.styles.scss";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <CircularProgress />
    </div>
  );
}
export default LoadingScreen;
