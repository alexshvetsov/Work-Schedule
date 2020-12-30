import SubmittedShifts from '../models/submittedShiftsModel.js';
import asyncHandler from 'express-async-handler';


const submitShifts = asyncHandler(async (req, res) => {
    let { submittedShiftsArray,date } = req.body
    const dateFromString = new Date(date)
    let newDate = new Date(dateFromString.setDate(dateFromString.getDate() + 1))
        const newSubmittedShifts = new SubmittedShifts({ 
         user: req.user._id, submittedShiftsArray, date 
            
        })
        const createdSubmittedShifts = await newSubmittedShifts.save()
        res.status(201).json(createdSubmittedShifts)

})

const updateShifts = asyncHandler(async (req,res)=>{
    const {submittedShiftsArray,date}= req.body
    const submittedShifts = await SubmittedShifts.findById(req.params.id)
    if(submittedShifts){
        submittedShifts.submittedShiftsArray=submittedShiftsArray
        const updatedShifts = await submittedShifts.save()
        res.status(201).json(updatedShifts)
    }else{
        res.status(404)
        throw Error('Shifts dosent found')
    }
})

export{
    submitShifts,
    updateShifts
} 