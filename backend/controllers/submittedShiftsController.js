import SubmittedShifts from '../models/submittedShiftsModel.js';
import asyncHandler from 'express-async-handler';


const submitShifts = asyncHandler(async (req, res) => {
    let { submittedShiftsArray, date } = req.body
    const newSubmittedShifts = new SubmittedShifts({
        user: req.user._id, submittedShiftsArray, date

    })
    const createdSubmittedShifts = await newSubmittedShifts.save()
    res.status(201).json(createdSubmittedShifts)

})

const getOneShiftsByDate = asyncHandler(async(req,res)=>{
    const submittedShifts = await SubmittedShifts.find({user:req.user._id, date:req.params.date})
    if(submittedShifts){
        res.status(201).json(submittedShifts[0])
    }else{
        res.status(404)
        throw Error('Shifts dosent found')
    }
})

const updateShifts = asyncHandler(async (req, res) => {
    const { submittedShiftsArray, date } = req.body
    const submittedShifts = await SubmittedShifts.findById(req.params.id)
    if (submittedShifts) {
        submittedShifts.submittedShiftsArray = submittedShiftsArray
        const updatedShifts = await submittedShifts.save()
        res.status(201).json(updatedShifts)
    } else {
        res.status(404)
        throw Error('Shifts dosent found')
    }
})

const getAllSubmittedShiftsByDate = asyncHandler(async (req, res) => {
    let scheduleOptions = {
        date: req.params.date,
        options: [],
        submitted:[]
    }
    const submitShifts = await SubmittedShifts.find({ date: req.params.date }).populate('user')
    submitShifts.forEach(submitShift=>scheduleOptions.submitted.push(submitShift.user.name)) 
    if (submitShifts.length>0) {
        for (let i = 0; i < submitShifts[0].submittedShiftsArray.length; i++) {
            let options = []
            for (let j = 0; j < submitShifts.length; j++) { 
                options.push([submitShifts[j].user.name, submitShifts[j].submittedShiftsArray[i].submittedShift ])
            }
            let key = new Date(submitShifts[0].submittedShiftsArray[i].date).getDate() +'/'+ (new Date(submitShifts[0].submittedShiftsArray[i].date).getMonth()+1) 
            scheduleOptions.options.push([key,options])
        } 
        res.status(201).json(scheduleOptions)     
    } else { 
        res.status(404)
        throw Error('Shifts dosent found') 
    }
})

export {
    submitShifts,
    updateShifts,
    getAllSubmittedShiftsByDate,
    getOneShiftsByDate
} 