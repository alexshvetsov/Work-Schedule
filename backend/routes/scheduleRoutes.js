import express from 'express';
const router = express.Router();
import { postSchedule, updateSchedule, getSchedules, getInProgressSchedule, postTemporarySchedule, updateTemporarySchedule } from '../controllers/scheduleController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getSchedules)
    .post(protect, admin, postSchedule)

router.route('/:id').put(protect, admin, updateSchedule)

router.route('/progression')
    .post(protect, admin, postTemporarySchedule)


router.route('/progression/:date/:daysamount') 
    .get(protect, admin, getInProgressSchedule)

router.route('/progression/:date').put(protect, admin, updateTemporarySchedule)


export default router
