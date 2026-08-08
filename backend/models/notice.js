const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Notice title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Notice description is required"],
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

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;