const road = require("../models/Road");
const {transporter} = require('../config/mailer');
const {roadConditionAlert} = require("../config/mailer");



const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

const analyze = async (req, res) => {
    try {
      const thresholdDistance = 0.001; // threshold for considering the same location (in degrees)
      const badConditionThreshold = 10; // threshold for bad road conditions (in meters)
  
      const data = await road.find();
      const clusters = [];
  
      // Group the data based on proximity
      data.forEach((point) => {
        let addedToCluster = false;
        
        // Check if the point should be added to any existing cluster
        clusters.forEach((cluster) => {
          const distance = getDistance(
            point.latitude, point.longitude,
            cluster[0].latitude, cluster[0].longitude
          );
          
          if (distance < thresholdDistance) {
            cluster.push(point);
            addedToCluster = true;
          }
        });
  
        // If not added, create a new cluster
        if (!addedToCluster) {
          clusters.push([point]);
        }
      });
  
      // Analyze each cluster for bad road conditions
      clusters.forEach(async (cluster) => {
        let badConditionCount = 0;
        
        // Check how many points in the cluster have bad conditions
        cluster.forEach((point) => {
          if (point.distanceLeft < badConditionThreshold && point.distanceRight < badConditionThreshold) {
            badConditionCount++;
          }
        });
  
        // If the majority of points in the cluster have bad conditions, trigger an action
        if (badConditionCount / cluster.length > 0.5) {
          // Trigger email alert
          await sendEmailAlert(cluster);
        }
      });
  
      res.status(200).json({ status: 'success', message: 'Analysis completed and alerts sent if necessary.' });
    } catch (error) {
      console.error("Error during road condition analysis:", error);
      res.status(500).json({ status: 'failed', message: 'An error occurred during the analysis.' });
    }
  };

  const sendEmailAlert = async (cluster) => {
    console.log(cluster)
    
    await transporter.sendMail(roadConditionAlert("sriharish.r2021ecec@sece.ac.in", mapsLinks));
    console.log("Email send successfully --")
  };

module.exports={analyze}