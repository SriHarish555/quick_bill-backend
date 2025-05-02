const express = require("express");
const router = express.Router();
const { saveData } = require("../controllers/projectController");


router.post("/data",saveData);
router.get("/analyze")

module.exports = router;
