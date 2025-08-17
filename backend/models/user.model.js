import mongoose from "mongoose";


// Define the schema for a user
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  profile: {
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    experience: [{ 
      title: String, 
      company: String, 
      from: Date, 
      to: Date, 
      description: String 
    }],
    education: [{ 
      institution: String, 
      degree: String, 
      year: String 
    }],
    skills: [{ type: String }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", default: null }
  },

  socialLinks: {
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    portfolio: { type: String, default: "" }
  },

  resume: { type: String, default: "" },
  resumeFileName: { type: String, default: "" },

  smartTags: [{ type: String }], // e.g., "Top React Dev", "Full Stack", etc.
  aiSuggestedRoles: [{ type: String }], // AI-generated career recommendations

}, { timestamps: true });

export default mongoose.model("User", userSchema);
