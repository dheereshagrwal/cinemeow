import { createSlice } from "@reduxjs/toolkit";
export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
      state.genreIdOrCategoryName = "";
    },
    clearSelectedGenreOrCategory: (state) => {
      state.genreIdOrCategoryName = "";
    },
  },
});
export const { selectGenreOrCategory, searchMovie, clearSelectedGenreOrCategory  } = genreOrCategory.actions;
export default genreOrCategory.reducer;
