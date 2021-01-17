import express from 'express';
const router = express.Router();
import { submitShifts, updateShifts, getAllSubmittedShiftsByDate,getOneShiftsByDate } from '../controllers/submittedShiftsController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .post(protect, submitShifts)
 
router.route('/:id').put(protect, updateShifts)

router.route('/getone/:date').get(protect, getOneShiftsByDate)

router.route('/date/:date').get(protect, admin, getAllSubmittedShiftsByDate)

export default router
