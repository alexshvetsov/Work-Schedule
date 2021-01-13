import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    date: { type: Date, required: true },
    done: { type: Boolean, required: true, default: false },
    shifts: [
        {
            morning: [{type:String, required: false}],
            afternoon: [{type:String, required: false}],
            evening: [{type:String, required: false}],
            trainings: [{type:String, required: false}],
        }
    ]

}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema)

export default Schedule