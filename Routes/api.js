const express = require("express");
const router = express.Router();
const credController = require("../controllers/credcontrollers");

router
  .route("/creds")
  .get(credController.getCred)
  .post(credController.createCreds);

module.exports = router;
