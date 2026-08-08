const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Result title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Result description is required"],
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;