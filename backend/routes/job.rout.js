import express from 'express';
import { createJob, updateJob, deleteJob, getJobs, getJobById, getUniqueCompanies, getUniqueCities ,getAdminJobs } from '../conroller/job.controller.js';
import {auth} from '../middleware/isAuthenticated.js';


const router = express.Router();


router.get('/', getJobs);
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);
router.get('/companies', getUniqueCompanies);
router.get('/cities', getUniqueCities);
router.get('/admin', auth, getAdminJobs);
router.get('/:id', getJobById);
export default router;