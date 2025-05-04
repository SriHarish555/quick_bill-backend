const road = require("../models/Road");

function generateHazardPoints(data) {
  return data
    .map(doc => {
      const { latitude, longitude, distanceLeft, distanceRight } = doc;

        if (distanceLeft <= 0 || distanceRight <=0) {
            return null;
        }

      if (distanceLeft < 25 || distanceRight < 25) {
        return { latitude, longitude, type: "bump" };
      }

      if (distanceLeft > 40 || distanceRight > 40) {
        return { latitude, longitude, type: "pothole" };
      }

      return null; 
    })
    .filter(Boolean); 
}

const getLocation = async (req, res) => {
  try {
    const data = await road.find(); 
    const hazards = generateHazardPoints(data); 
    res.status(200).json(hazards); 
  } catch (error) {
    console.error("Error fetching road data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { getLocation };
