const mongoose = require("mongoose");

const directorMessageSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            trim: true,
        },
        description: { 
            type: String, 
            required: [true, "Director message description is required"],
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

const DirectorMessage = mongoose.model("DirectorMessage", directorMessageSchema);
module.exports = DirectorMessage;