import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';
import axios from 'axios'; // For AI API integration (job match, etc.)

// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resume } = req.body;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found", success: false });

    const application = await Application.create({
      user: userId,
      job: jobId,
      coverLetter,
      resume
    });

    return res.status(201).json({
      message: "Job application submitted",
      success: true,
      application
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get applications by user
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('job');
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching applications", success: false });
  }
};

// Admin: Get all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user job');
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching all applications", success: false });
  }
};

// Update application status (admin or HR)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const updated = await Application.findByIdAndUpdate(applicationId, { status }, { new: true });

    if (!updated) return res.status(404).json({ message: "Application not found", success: false });

    return res.status(200).json({ success: true, updated });
  } catch (error) {
    return res.status(500).json({ message: "Error updating status", success: false });
  }
};

// AI API: Intelligent job matching
export const smartJobSearch = async (req, res) => {
  try {
    const { keywords, location, experience } = req.body;

    // Dummy AI API integration (Replace with actual endpoint)
    const aiResponse = await axios.post('https://your-ai-api.com/match-jobs', {
      keywords, location, experience
    });

    return res.status(200).json({
      message: "AI-powered job recommendations",
      jobs: aiResponse.data.jobs,
      success: true
    });
  } catch (error) {
    console.error("AI job search error:", error);
    return res.status(500).json({ message: "AI job search failed", success: false });
  }
};

export const existingApplication = await Application.findOne({ user: userId, job: jobId });
if (existingApplication) {
  return res.status(400).json({
    message: "You have already applied for this job",
    success: false
  });
};

