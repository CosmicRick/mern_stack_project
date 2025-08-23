import Job from '../models/job.model.js';


export const createJob = async (req, res) => {
try {
const job = await Job.create({ ...req.body, createdBy: req.user._id });
res.status(201).json(job);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


export const updateJob = async (req, res) => {
try {
const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(job);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


export const deleteJob = async (req, res) => {
try {
await Job.findByIdAndDelete(req.params.id);
res.json({ message: 'Job deleted' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};


export const getJobs = async (req, res) => {
try {
const jobs = await Job.find();
res.json(jobs);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


export const getJobById = async (req, res) => {
try {
const job = await Job.findById(req.params.id);
res.json(job);
} catch (error) {
res.status(500).json({ message: error.message });
}
};