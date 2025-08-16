import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    images: [{
        type: String, // Stores image URLs
        trim: true
    }],
    location: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'],
        default: 'Full-time'
    },
    experienceLevel: {
        type: String,
        enum: ['Entry', 'Mid', 'Senior'],
        default: 'Entry'
    },
    tags: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    salary: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    },
    deadline: {
        type: Date
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    images: [{
    type: String, // URL of uploaded image
    trim: true
}]

});

export const Job = mongoose.model('Job', jobSchema);
