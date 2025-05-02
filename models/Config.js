const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
    {
        addData: {
            type: Boolean,
            required: true
          }
    }
);

const Config = mongoose.model("Config", configSchema);
module.exports = Config;
