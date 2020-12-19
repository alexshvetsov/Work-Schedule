import express from 'express';
const router = express.Router();
import { submitShifts} from '../controllers/submittedShiftsController.js';
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/')
.post(protect, submitShifts)

export default router    
