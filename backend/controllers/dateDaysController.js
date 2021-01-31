import DateDays from '../models/dateDaysModel.js'
import asyncHandler from 'express-async-handler'

const postDateDays = asyncHandler(async(req,res)=>{
    let {startDate, daysAmount}=req.body
    const daysAmountNumber = Number(daysAmount) 
    const date= new Date(startDate)
    const newDateDays= new DateDays({ 
        user:req.user._id, date, daysAmount:daysAmountNumber
    })
    const createdDateDays= await newDateDays.save()
    res.status(201).json(createdDateDays)
})

const getLastDateDatys = asyncHandler(async(req,res)=>{
    const lastDateDays = await DateDays.findOne().sort({ _id: -1 })
    if(lastDateDays){ 
        res.json(lastDateDays) 
    }else{
        res.status(404)
        throw new Error('there is no previous record')
    }
})

const updateDateDays = asyncHandler(async (req, res) => {
    const dateDays = await DateDays.findById(req.params.id)
    if (dateDays) {
        dateDays.disableSubmitting = req.body.disable
        const updatedDateDays = await dateDays.save()
        res.status(201).json(updatedDateDays)
    } else {
        res.status(404)
        throw Error('Could not procced with this action')
    }
})

export{
    postDateDays,
    getLastDateDatys,
    updateDateDays
}    