// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resume } = req.body;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // ✅ Check if user already applied
    const existingApplication = await Application.findOne({ user: userId, job: jobId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false
      });
    }

    // ✅ Create new application
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
