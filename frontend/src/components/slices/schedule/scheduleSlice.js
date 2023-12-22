/* eslint-disable no-unused-vars */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://medication-reminder-gsj30zhd7-bs-joy.vercel.app/schedule";

export const createSchedule = createAsyncThunk(
  "/addSchedule",
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl, scheduleData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getScheduleByUser = createAsyncThunk("/getSchedule",async (userId) => {
    const response = await axios.get(`${baseUrl}/${userId}`);
    return response.data;
  }
);

const scheduleAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.time - a.time,
  selectId: entity => entity._id
});

const initialState = scheduleAdapter.getInitialState({
  status: "idle",
  error: null,
});

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetSchedule : (state, action) => {
      return initialState;
    }
  },
  extraReducers(builder){
    builder
      .addCase(createSchedule.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
        console.log(state.error);
      })
      // getSchedules
      .addCase(getScheduleByUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getScheduleByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        scheduleAdapter.addMany(state, action.payload);
      })
      .addCase(getScheduleByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
    selectAll: getAllSchedule
} = scheduleAdapter.getSelectors(state => state.schedule);

export const { resetSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
