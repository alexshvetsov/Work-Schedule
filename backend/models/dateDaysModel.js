import mongoose from 'mongoose';

const dateDaysSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: { type: Date, required: true }, 
    daysAmount: { type: Number, required: true },
    disableSubmitting: { 
        type: Boolean,
        required: true,
        default: false
    },  
}, { timeStamps: true });

const DateDays = mongoose.model('DateDays', dateDaysSchema)

export default DateDays 