import mongoose from "mongoose";

const medicationScheduleSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    medicineId: {
        type: String,
        required: true
    },
    medicineName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Schedule = mongoose.model('medicationSchedules', medicationScheduleSchema);

export default Schedule;