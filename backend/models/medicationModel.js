import mongoose from "mongoose";

const medicationSchema = mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;