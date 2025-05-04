const express = require("express");
const router = express.Router();
const { saveData } = require("../controllers/projectController");
const {analyze} = require("../controllers/roadAnalysisController");
const {getLocation} = require ("../controllers/locationDataController");


router.post("/data",saveData);
router.get("/analyze",analyze);
router.get("/get-loc",getLocation);

module.exports = router;
