import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  heartBreakImage: {
    width: "40%",
    [theme.breakpoints.down("lg")]: {
      margin: "0 auto",
      width: "70%",
      display: "flex",
      marginBottom: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      marginBottom: "30px",
    },
  },
}));
