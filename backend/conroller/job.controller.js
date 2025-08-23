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

export const getUniqueCompanies = async (req, res) => {
  try {
    const companies = await Job.distinct('company');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUniqueCities = async (req, res) => {
  try {
    const cities = await Job.distinct('city');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'createdAt'; // default sort
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const company = req.query.company || '';
    const city = req.query.city || '';
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getJobById = async (req, res) => {
  try {
    console.log("hi");
    
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};