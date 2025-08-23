import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema(
{
title: { type: String, required: true, trim: true },
company: { type: String, required: true, trim: true },
location: { type: String, required: true, trim: true },
type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], default: 'full-time' },
salaryMin: { type: Number },
image: { type: String },
salaryMax: { type: Number },
description: { type: String, required: true },
requirements: [{ type: String }],
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{ timestamps: true }
);


export default mongoose.model('Job', jobSchema);