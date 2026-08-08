const mongoose = require("mongoose");

const presidentMessageSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            trim: true,
        },
        description: { 
            type: String, 
            required: [true, "President message description is required"],
            trim: true 
        },
        image: { 
            type: String, 
            trim: true 
        },
    },
    {
        timestamps: true,
    }
);

const PresidentMessage = mongoose.model("PresidentMessage", presidentMessageSchema);
module.exports = PresidentMessage;