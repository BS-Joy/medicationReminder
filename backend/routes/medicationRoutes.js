import express from 'express';
import { createMedication, getMedications } from '../controllers/medicationController.js';

const medicationRouter = express.Router();

medicationRouter.post('/', createMedication);
medicationRouter.get('/:userId', getMedications);

export default medicationRouter;