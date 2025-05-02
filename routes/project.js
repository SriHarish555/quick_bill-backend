const express = require("express");
const router = express.Router();
const { saveData } = require("../controllers/projectController");
const {analyze} = require("../controllers/roadAnalysisController")


router.post("/data",saveData);
router.get("/analyze",analyze)

module.exports = router;
