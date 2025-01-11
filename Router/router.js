import express from 'express'
import { statsController } from '../Controller/statsController.js';
import { deviationController } from '../Controller/deviationController.js';

const router = express.Router();

router.get('/stats', statsController);
router.get('/deviation', deviationController);
router.get('/', "backend is running");
export default router;
