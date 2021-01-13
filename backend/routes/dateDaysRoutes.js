import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js'
import { postDateDays, getLastDateDatys } from '../controllers/dateDaysController.js'


router.route('/')
    .get(getLastDateDatys)
    .post(protect, admin, postDateDays)
 

export default router  