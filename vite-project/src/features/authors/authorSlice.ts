import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Author } from "../../types/Author";

interface AuthorState {
  data: Author[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthorState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAuthors = createAsyncThunk<Author[]>(
    "authors/fetch",
    async () => {
      const response = await axios.get("http://localhost:8000/api/authors/");
      return response.data;
    }
  );


  const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAuthors.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAuthors.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchAuthors.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? "Failed to fetch authors";
        });
    },
  });
  
  export default authorsSlice.reducer;