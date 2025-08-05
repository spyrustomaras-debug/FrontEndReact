import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Author } from "../../types/Author";

interface AuthorState {
  data: Author[];
  loading: boolean;
  error: string | null;
  selectedAuthor: Author | null;
  creating: boolean;
  createdAuthor: Author | null;
}

const initialState: AuthorState = {
  data: [],
  loading: false,
  error: null,
  selectedAuthor: null,
  creating: false,
  createdAuthor: null,
};

// Fetch all authors
export const fetchAuthors = createAsyncThunk<Author[]>(
  "authors/fetchAll",
  async () => {
    const response = await axios.get("http://localhost:8000/api/authors/");
    return response.data;
  }
);

// Fetch one author by ID
export const fetchAuthor = createAsyncThunk<Author, number>(
  "authors/fetchOne",
  async (id) => {
    const response = await axios.get(`http://localhost:8000/api/authors/${id}/`);
    return response.data;
  }
);

// Update author by ID
export const updateAuthor = createAsyncThunk<Author, { id: number; data: Partial<Author> }>(
  "authors/update",
  async ({ id, data }) => {
    const response = await axios.put(`http://localhost:8000/api/authors/${id}/`, data);
    return response.data;
  }
);

// Create new author
export const createAuthor = createAsyncThunk<Author, { name: string; books: { title: string }[] }, { rejectValue: any }>(
  "authors/create",
  async (authorData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/authors/", authorData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to create author");
    }
  }
);

// Main slice
const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    clearCreatedAuthor(state) {
      state.createdAuthor = null;
    },
    clearSelectedAuthor(state) {
      state.selectedAuthor = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
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
        state.error = action.error.message || "Failed to load authors.";
      })

      // Fetch one
      .addCase(fetchAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedAuthor = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAuthor = action.payload;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load author.";
      })

      // Create
      .addCase(createAuthor.pending, (state) => {
        state.creating = true;
        state.error = null;
        state.createdAuthor = null;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.creating = false;
        state.createdAuthor = action.payload;
        state.data.push(action.payload); // optional: add to list
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || "Failed to create author.";
      })

      // Update
      .addCase(updateAuthor.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.data.findIndex((a) => a.id === updated.id);
        if (index !== -1) {
          state.data[index] = updated;
        }
        if (state.selectedAuthor?.id === updated.id) {
          state.selectedAuthor = updated;
        }
      });
  },
});

export const { clearCreatedAuthor, clearSelectedAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
