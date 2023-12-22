import express from 'express'
import { createMedicationSchedule, getMedicationsSchedule } from '../controllers/scheduleController.js';

const scheduleRouter = express.Router();

scheduleRouter.post('/', createMedicationSchedule);
scheduleRouter.get('/:userId', getMedicationsSchedule);

export default scheduleRouter;