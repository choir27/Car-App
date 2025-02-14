const express = require("express")
const router = express.Router();
const clientController = require("../controllers/client");

router.post("/sendEmail", clientController.sendEmail);
router.get("/", (req,res)=>{res.send("Hello World")})
module.exports = router;