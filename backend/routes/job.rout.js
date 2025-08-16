import express from 'express';
import {
  postJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
  smartJobSearch
} from '../conroller/job.controller.js'; 

import { isAuthenticated, isAdmin } from '../middleware/isAuthenticated.js';
import upload from '../middlewares/multer.js'; //  multer for file uploads

const router = express.Router();

//  POST a job (Admin only) with image uploads
router.post(
  '/post',
  isAuthenticated,
  isAdmin,
  upload.array('images', 5), //  handles up to 5 images from form-data
  postJob
);

//  GET all jobs (Public, with filters)
router.get('/all', getAllJobs);

//  GET job by ID
router.get('/:jobId', getJobById);

//  UPDATE job (Admin only)
router.put('/:jobId', isAuthenticated, isAdmin, updateJob);

//  DELETE job (Admin only)
router.delete('/:jobId', isAuthenticated, isAdmin, deleteJob);

//  SEARCH jobs by title or tags
router.get('/search/keyword', searchJobs);

//  SMART AI Job Search (Protected)
router.post('/smart-search', isAuthenticated, smartJobSearch);

export default router;
