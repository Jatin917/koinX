import express from 'express'
import { statsController } from '../Controller/statsController.js';

const router = express.Router();


router('/stats', statsController);
export default router;
