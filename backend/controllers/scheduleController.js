import Schedule from '../models/scheduleModel.js '
import asyncHandler from 'express-async-handler'

const getSchedules = asyncHandler(async (req, res) => {

    const pageSize = 1;
    const page = Number(req.query.pageNumber) || 1
console.log(page);
    const count = await Schedule.countDocuments({}) 
    const schedules = await Schedule.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))


    res.json({ schedules, page, pages: Math.ceil(count / pageSize) })

    // const schedules = await Schedule.find({ done: true });
    // res.json(schedules)
})

const getInProgressSchedule = asyncHandler(async (req, res) => {

    const schedule = await Schedule.findOne({ done: false, date: req.params.date });
    const doneSchedule = await Schedule.findOne({ done: true, date: req.params.date });
    if (schedule && schedule.shifts.length === Number(req.params.daysamount)) {
        res.json(schedule)
    } else if (doneSchedule && doneSchedule.shifts.length === Number(req.params.daysamount)) {
        res.json(doneSchedule)
    } else {
        res.status(404)
        throw Error('No Schedule found')
    }
})


const postTemporarySchedule = asyncHandler(async (req, res) => {
    let { shifts, dateState } = req.body;
    const newSchedule = new Schedule({
        user: req.user._id, date: dateState, done: false, shifts
    })
    const createdSchedule = await newSchedule.save()
    res.status(201).json(createdSchedule)
})

const updateTemporarySchedule = asyncHandler(async (req, res) => {
    let shifts = req.body;
    const submittedSchedule = await Schedule.findOne({ date: req.params.date, done: false })
    if (submittedSchedule && submittedSchedule.shifts.length === shifts.length) {
        submittedSchedule.shifts = req.body
        const updatedSchedule = await submittedSchedule.save()
        res.status(201).json(updatedSchedule)
    } else {
        res.status(404)
        throw Error('Schedule dosent found')
    }
})

const postSchedule = asyncHandler(async (req, res) => {

    //add if statement to check if schedule exist with done false and change it else save new
    let { shifts, dateState } = req.body;
    const newSchedule = new Schedule({
        user: req.user._id, date: dateState, done: true, shifts
    })
    const createdSchedule = await newSchedule.save()
    res.status(201).json(createdSchedule)
})

const updateSchedule = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    let shifts = req.body;
    const submittedSchedule = await Schedule.findById(req.params.id)
    if (submittedSchedule) {
        submittedSchedule.shifts = req.body
        submittedSchedule.done = true
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
    getSchedules, 
    getInProgressSchedule,
    postTemporarySchedule,
    updateTemporarySchedule
} 