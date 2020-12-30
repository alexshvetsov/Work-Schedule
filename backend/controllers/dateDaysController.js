import DateDays from '../models/dateDaysModel.js'
import asyncHandler from 'express-async-handler'

const postDateDays = asyncHandler(async(req,res)=>{
    let {startDate, daysAmount}=req.body
    const daysAmountNumber = Number(daysAmount) 
    const date= new Date(startDate)
    const newDateDays= new DateDays({ 
        user:req.user._id, date, daysAmount:daysAmountNumber
    })
    console.log(newDateDays);
    const createdDateDays= await newDateDays.save()
    res.status(201).json(createdDateDays)
})

const getLastDateDatys = asyncHandler(async(req,res)=>{
    const lastDateDays = await DateDays.findOne().sort('-created_at')
    if(lastDateDays){
        res.json(lastDateDays)
    }else{
        res.status(404)
        throw new Error('there is no previous record')
    }
})

export{
    postDateDays,
    getLastDateDatys
}    