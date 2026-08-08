const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: [true, "ID is required"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;