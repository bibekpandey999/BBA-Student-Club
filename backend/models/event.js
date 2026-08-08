const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Event title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Event description is required"],
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Event location is required"],
            trim: true,
        },
        date: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;