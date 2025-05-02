const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roadSchema = new mongoose.Schema(
    {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        distanceLeft: {
            type: Number,
            required: true,
        },
        distanceRight: {
            type: Number,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

const Road = mongoose.model("Road", roadSchema);

module.exports = Road;