import Application from '../models/application.model.js';


export const applyToJob = async (req, res) => {
  try {
    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      resume: req.file.path
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const myApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id }).populate('job');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const jobApplications = async (req, res) => {
  try {
    const apps = await Application.find({ job: req.params.jobId }).populate('applicant');
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.appId, { status: req.body.status }, { new: true });
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};