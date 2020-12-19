import SubmittedShifts from '../models/submittedShiftsModel.js';
import asyncHandler from 'express-async-handler';


const submitShifts = asyncHandler(async (req, res) => {
    const { submittedShift,date } = req.body

        const submittedShifts = new SubmittedShifts({
         user: req.user._id, submittedShift, date
            
        })
        const createdSubmittedShifts = await submittedShifts.save()
        res.status(201).json(createdSubmittedShifts)

})

export{
    submitShifts
}