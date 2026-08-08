const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "Image URL or path is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;