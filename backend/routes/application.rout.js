import express from 'express';
import {
  applyToJob} from '../conroller/application.controller.js';
import { authMiddleware, isAdmin } from '../middleware/isAuthenticated.js';

const router = express.Router();

// User applies to job
router.post('/apply/:jobId', authMiddleware, applyToJob);

// User gets their applications
router.get('/my-applications', authMiddleware, applyToJob);

export default router;
