import express from 'express';
import { applyToJob, myApplications, jobApplications, updateApplicationStatus } from '../conroller/application.controller.js';
import { auth } from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/multer.js';


const router = express.Router();


router.post('/:jobId', auth, applyToJob);
router.get('/me', auth, myApplications);
router.get('/job/:jobId', auth, jobApplications);
router.put('/:appId', auth, updateApplicationStatus);


export default router;