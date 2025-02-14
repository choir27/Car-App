const express = require("express")
const router = express.Router();
const clientController = require("../controllers/client");

router.post("/sendEmail", clientController.sendEmail);

module.exports = router;