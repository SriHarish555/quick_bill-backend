const road = require("../models/Road");
const { transporter } = require('../config/mailer');
const { roadConditionAlert } = require("../config/mailer");

// Haversine formula to calculate distance between two geo points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Main analyze function
const analyze = async (req, res) => {
  try {
    const thresholdDistance = 0.001; // approx ~100m
    const badConditionThreshold = 10; // in meters

    const data = await road.find();
    const clusters = [];

    // Group the data into clusters based on distance
    for (const point of data) {
      let addedToCluster = false;

      for (const cluster of clusters) {
        const distance = getDistance(
          point.latitude, point.longitude,
          cluster[0].latitude, cluster[0].longitude
        );

        if (distance < thresholdDistance) {
          cluster.push(point);
          addedToCluster = true;
          break;
        }
      }

      if (!addedToCluster) {
        clusters.push([point]);
      }
    }

    // Analyze each cluster and trigger alerts if needed
    for (const cluster of clusters) {
      const badPoints = cluster.filter(point =>
        point.distanceLeft < badConditionThreshold &&
        point.distanceRight < badConditionThreshold
      );

      if (badPoints.length / cluster.length > 0.5) {
        console.log(`🚨 Alert: Cluster with ${badPoints.length}/${cluster.length} bad points`);
        await sendEmailAlert(cluster);
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Analysis completed and alerts sent if necessary.'
    });
  } catch (error) {
    console.error("❌ Error during road condition analysis:", error);
    res.status(500).json({
      status: 'failed',
      message: 'An error occurred during the analysis.'
    });
  }
};

// Send email for a problematic cluster
const sendEmailAlert = async (cluster) => {
  if (!Array.isArray(cluster)) {
    console.error("Expected an array for 'cluster', got:", cluster);
    return;
  }

  const mapsLinks = cluster.map((point, index) => {
    return `${index + 1}. Location: (${point.latitude}, ${point.longitude}) - [View on Map](https://www.google.com/maps?q=${point.latitude},${point.longitude})`;
  }).join('\n');

  await transporter.sendMail(
    roadConditionAlert("sriharish.r2021ecec@sece.ac.in", mapsLinks)
  );

  console.log("✅ Email sent successfully");
};

module.exports = { analyze };
