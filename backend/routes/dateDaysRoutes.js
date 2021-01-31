import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js'
import { postDateDays, getLastDateDatys,updateDateDays } from '../controllers/dateDaysController.js'


router.route('/')
    .get(getLastDateDatys)
    .post(protect, admin, postDateDays)

router.route('/:id').put(protect, admin, updateDateDays)

 

export default router  