import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Author } from "../../types/Author";

interface AuthorState {
  data: Author[];
  loading: boolean;
  error: string | null;
  selectedAuthor: Author | null; // 👈 add this

}

const initialState: AuthorState = {
  data: [],
  loading: false,
  error: null,
  selectedAuthor: null, // 👈 add this

};

export const fetchAuthors = createAsyncThunk<Author[]>(
    "authors/fetch",
    async () => {
      const response = await axios.get("http://localhost:8000/api/authors/");
      return response.data;
    }
  );

  export const fetchAuthor = createAsyncThunk<Author, number>(
    "authors/fetchOne",
    async (id) => {
      const response = await axios.get(`http://localhost:8000/api/authors/${id}/`);
      return response.data;
    }
  );

  export const updateAuthor = createAsyncThunk<Author, { id: number; data: Partial<Author> }>(
    'authors/update',
    async ({ id, data }) => {
      const response = await axios.put(`http://localhost:8000/api/authors/${id}/`, data);
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
        })
        .addCase(fetchAuthor.fulfilled, (state, action) => {
            state.selectedAuthor = action.payload;
        })
        .addCase(updateAuthor.fulfilled, (state, action) => {
            const index = state.data.findIndex((a) => a.id === action.payload.id);
            if (index !== -1) {
              state.data[index] = action.payload;
            }
            state.selectedAuthor = null; // reset after update
          })
    },
  });
  
  export default authorsSlice.reducer;