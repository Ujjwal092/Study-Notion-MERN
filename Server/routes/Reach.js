const express = require("express");
const router = express.Router();

const { contactUs } = require("../controllers/Reach");

// POST -> /api/v1/reach/contact
router.post("/contact", contactUs);

module.exports = router;
