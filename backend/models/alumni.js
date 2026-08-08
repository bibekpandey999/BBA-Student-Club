const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        pastRole: {
            type: String,
            required: [true, "Role is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String, 
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        socialLinks: {
            linkedin: { type: String, trim: true },
            github: { type: String, trim: true },
            instagram: { type: String, trim: true },
        },
        batch: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true, 
    }
);

const Alumni = mongoose.model("Alumni", alumniSchema);
module.exports = Alumni;