/* eslint-disable no-unused-vars */

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://medication-reminder.onrender.com/medication";

export const addMedication = createAsyncThunk("/addmedication", async (medicationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}`, medicationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMedicationByUser = createAsyncThunk('/getMedication', async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
});

const medicationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.name - a.name,
  selectId: (entity) => entity._id,
});

const initialState = medicationAdapter.getInitialState({
  status: "idle",
  error: null
});

const medicationSlice = createSlice({
  name: "medication",
  initialState,
  reducers: {
    resetMedication: (state) => {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      // eslint-disable-next-line no-unused-vars
      .addCase(addMedication.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addMedication.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addMedication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      // getMedications
      .addCase(getMedicationByUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getMedicationByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        medicationAdapter.addMany(state, action.payload);
      })
      .addCase(getMedicationByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { selectAll: getAllMedications } = medicationAdapter.getSelectors(state => state.medication);

export const getMedicationError = (state) => state.medication.error;

export const { resetMedication } = medicationSlice.actions;

export default medicationSlice.reducer;
