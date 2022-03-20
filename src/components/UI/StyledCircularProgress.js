import styled from "@mui/system/styled";
import CircularProgress from "@mui/material/CircularProgress";

const StyledCircularProgress = styled(CircularProgress)(() => ({
  position: "absolute",
  top: "20%",
  left: "40%",
  transform: "translate(-50%)",
}));

export default StyledCircularProgress;
