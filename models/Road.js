const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roadSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
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
    },
    location: {
      type: {
        type: String, 
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number], 
        required: true
      }
    }
  },
  { timestamps: true }
);

roadSchema.index({ location: "2dsphere" });

const Road = mongoose.model("Road", roadSchema);

module.exports = Road;
