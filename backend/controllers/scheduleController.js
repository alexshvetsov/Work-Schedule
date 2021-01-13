import Schedule from '../models/scheduleModel.js '
import asyncHandler from 'express-async-handler'

const getAllSchedules = asyncHandler(async (req, res) => {
    const schedules = await Schedule.find({});
    res.json(schedules)
})

const postSchedule = asyncHandler(async (req, res) => {
    let { shifts, dateState } = req.body;
    const newSchedule = new Schedule({
        user: req.user._id, date: dateState, done: true, shifts
    })
    const createdSchedule = await newSchedule.save()
    res.status(201).json(createdSchedule)
})

const updateSchedule = asyncHandler(async (req, res) => {
    let shifts  = req.body;
    console.log(shifts); 
    const submittedSchedule = await Schedule.findOne({ date: req.params.date })
    if (submittedSchedule) {
        submittedSchedule.shifts = req.body
        const updatedSchedule = await submittedSchedule.save()
        res.status(201).json(updatedSchedule)
    } else {
        res.status(404) 
        throw Error('Schedule dosent found')
    } 
})

export {
    postSchedule,
    updateSchedule,
    getAllSchedules
} 