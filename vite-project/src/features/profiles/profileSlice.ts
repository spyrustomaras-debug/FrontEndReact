import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Profile } from "../../types/Profile";


interface ProfileState {
    data: Profile[];
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchProfiles = createAsyncThunk<Profile[]>(
    "profiles/fetch",
    async () => {
      const response = await axios.get("http://localhost:8000/api/profiles/");
      return response.data;
    }
);

const profileSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfiles.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProfiles.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchProfiles.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message ?? "Failed to fetch profiles";
        });
    },
  });
  
  export default profileSlice.reducer;