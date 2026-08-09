const mongoose = require("mongoose");

const chiefMessageSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            trim: true,
        },
        description: { 
            type: String, 
            required: [true, "Chief message description is required"],
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

const ChiefMessage = mongoose.model("ChiefMessage", chiefMessageSchema);
module.exports = ChiefMessage;