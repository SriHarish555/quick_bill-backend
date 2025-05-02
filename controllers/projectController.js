const road = require("../models/Road");
const Config = require("../models/Config");

const saveData = async (req, res) => {
  try {
    // Fetch the configuration to check if data should be saved
    const config = await Config.findOne();

    // Check if data saving is allowed in the config
    if (config?.addData || false) {
      const { latitude, longitude, distanceLeft, distanceRight } = req.body;

      // Create a new road data object
      const roadData = new road({
        ip: req.ip,
        latitude,
        longitude,
        distanceLeft,
        distanceRight,
        location: {
          type: "Point",
          coordinates: [longitude, latitude], // [longitude, latitude] for GeoJSON format
        },
      });

      // Save the road data to the database
      await roadData.save();

      // Log and respond to indicate success
      console.log("Data saved in DB");
      res.status(200).json({ status: "success", msg: "Data saved successfully" });
    } else {
      // If data saving is not allowed, log and respond with failure
      console.log("Data not saved in DB");
      res.status(200).json({ status: "failed", msg: "Data not saved" });
    }
  } catch (err) {
    // Log and respond with an error if something goes wrong
    console.error("Error saving data:", err);
    res.status(500).json({ status: "failed", msg: "Internal Server Error", error: err.message });
  }
};


module.exports = { saveData };
