import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";

import { getBanner, getServices } from '../controllers/information.contoller.js';

const router = express.Router();

router.get('/banner', verifyToken, getBanner);
router.get('/services', verifyToken, getServices);

export default router;
