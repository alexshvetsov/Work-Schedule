import mongoose from 'mongoose';

const submittedShiftsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: { type: Date, required: true },
    submittedShiftsArray: [
        {
            date: { type: Date, required: true },
            submittedShift: { type: String, required: true }
        }
    ]

}, { timestamps: true });

const SubmittedShifts = mongoose.model('SubmittedShifts', submittedShiftsSchema)

export default SubmittedShifts