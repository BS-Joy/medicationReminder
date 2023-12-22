import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../components/slices/user/userSlice'
import medicationReducer from "../components/slices/medication/medicationSlice";
import scheduleReducer from "../components/slices/schedule/scheduleSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        medication: medicationReducer,
        schedule: scheduleReducer
    }
})