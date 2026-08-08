const mongoose = require("mongoose");

const bodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        role: {
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
    },
    {
        timestamps: true,
    }
);

const Bod = mongoose.model("Bod", bodSchema);
module.exports = Bod;