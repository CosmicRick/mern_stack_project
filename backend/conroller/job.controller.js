import { Job } from '../models/job.model.js';
import cloudinary from '../config/cloudinary.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Post a new job (Auth required)
export const postJob = async (req, res) => {
    try {
        const { title, description, location, companyId, jobType, salary, deadline, experienceLevel, tags } = req.body;

        if (!title || !description || !location || !companyId) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }

        // Upload images if provided
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: "job_portal/jobs"
                });
                imageUrls.push(uploadResult.secure_url);
            }
        }

        const newJob = new Job({
            title,
            description,
            location,
            jobType,
            salary,
            deadline,
            company: companyId,
            experienceLevel,
            tags,
            images: imageUrls, // store uploaded image URLs
            postedBy: req.user?._id || null
        });

        await newJob.save();
        return res.status(201).json({ message: "Job posted successfully", success: true, job: newJob });

    } catch (error) {
        console.error("Error posting job:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get all jobs with optional filters
export const getAllJobs = async (req, res) => {
    try {
        const filters = req.query || {};
        const jobs = await Job.find(filters).populate('company postedBy', 'name email');
        return res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get a specific job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId).populate('company postedBy');
        if (!job) return res.status(404).json({ message: "Job not found", success: false });
        return res.status(200).json({ success: true, job });
    } catch (error) {
        console.error("Error fetching job:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Update an existing job
export const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: "Job not found", success: false });
        return res.status(200).json({ message: "Job updated successfully", success: true, job: updatedJob });
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Delete a job
export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
        if (!deletedJob) return res.status(404).json({ message: "Job not found", success: false });
        return res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Search jobs by title or tag
export const searchJobs = async (req, res) => {
    try {
        const { title } = req.query;
        const jobs = await Job.find({
            $or: [
                { title: { $regex: title, $options: 'i' } },
                { tags: { $regex: title, $options: 'i' } }
            ]
        }).populate('company');

        return res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error("Error searching jobs:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Smart AI Job Search via external API
export const smartJobSearch = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ message: "Search query is required", success: false });

        const response = await axios.post(process.env.AI_JOB_SEARCH_API, {
            query,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.AI_API_KEY}`
            }
        });

        const results = response.data.jobs || [];
        return res.status(200).json({ success: true, results });
    } catch (error) {
        console.error("AI search error:", error.response?.data || error.message);
        return res.status(500).json({ message: "AI search failed", success: false });
    }
};
