/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://medication-reminder-gsj30zhd7-bs-joy.vercel.app/user";

export const createUser = createAsyncThunk("/register", async (userData, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${baseUrl}`, userData);
    return response.data;
  } catch (err){
     return rejectWithValue(err.response.data)
  }
  
});

export const logIn = createAsyncThunk("/login", async (credential, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, credential);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const fetchAllUser = createAsyncThunk("/allUser", async () => {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
});

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  allUser: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.error : 'SOmething wrong'
      })
      // login
      .addCase(logIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.user));
      })
      .addCase(logIn.rejected, (state, action) => {
        state.user = null
        state.status = "failed";
        state.error = action.payload ? action.payload.error : 'Something wrong'
      })
      // all user
      .addCase(fetchAllUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allUser = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.status = 'failed';
        state.err = action.error.message
      })
  },
});

export const getCurrentUser = (state) => state.user.user;
export const getAllUser = (state) => state.user.allUser;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
