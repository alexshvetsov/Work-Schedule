import express from 'express';
const router = express.Router();
import { submitShifts,updateShifts} from '../controllers/submittedShiftsController.js';
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/')
.post(protect, submitShifts)

router.route('/:id').put(protect,updateShifts)

export default router    
