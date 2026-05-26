const express = require("express");

const {
  createShortUrl,
  redirectUrl,
  getUserUrls,
} = require("../controllers/urlController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createShortUrl);

router.get("/myurls", authMiddleware, getUserUrls);

router.get("/:shortId", redirectUrl);

module.exports = router;