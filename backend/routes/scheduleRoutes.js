import express from 'express';
const router = express.Router();
import { postSchedule, updateSchedule, getAllSchedules } from '../controllers/scheduleController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getAllSchedules) 
    .post(protect, admin, postSchedule)

router.route('/:date').put(protect, updateSchedule)


export default router
