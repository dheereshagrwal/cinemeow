import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "90%",
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  genreImages: {
    filter: theme.palette.mode === "dark" && "invert(1)",
  },
  categoryText: {
    fontFamily: "epilogue, sans-serif",
    fontSize: "0.9rem",
  },
  genreText: {
    fontFamily: "epilogue, sans-serif",
    fontSize: "0.9rem",
  },
}));
