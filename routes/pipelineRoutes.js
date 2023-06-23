const express = require("express");

const { removeProcess, addProcess } = require("../controllers/pipelineControllers");

const router = express.Router();

router.post("/removeProcess", removeProcess);
router.post("/addProcess", addProcess);

module.exports = router;