import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "70%",
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  genreImages: {
    filter: theme.palette.mode === "dark" ? "dark" : "invert(0)",
  },
  categoryText: {
    fontFamily: "epilogue, sans-serif",
    fontSize: "0.9rem",
  },
  genreText: {
    // fontFamily: "Meows, sans-serif",
    fontFamily: "epilogue, sans-serif",
    fontSize: "0.9rem",
  },
}));
