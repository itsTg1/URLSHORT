const express = require("express");
const router = express.Router();
const { createShortUrl,getAllUrls} = require("../controller/urlController");

router.post("/shorten", createShortUrl);
router.get("/admin/all", getAllUrls);

module.exports = router;
