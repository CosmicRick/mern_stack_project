import express from 'express';
import { createJob, updateJob, deleteJob, getJobs, getJobById } from '../conroller/job.controller.js';
import {auth} from '../middleware/isAuthenticated.js';


const router = express.Router();


router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);


export default router;