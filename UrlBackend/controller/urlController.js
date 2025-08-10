const shortid = require("shortid");
const Url = require("../Models/Url");

exports.createShortUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    let existing = await Url.findOne({ fullUrl });
    if (existing) {
      return res.json({
        shortId: existing.shortId
      });
    }

    const shortId = shortid.generate();
    const newUrl = new Url({ fullUrl, shortId });
    await newUrl.save();

    res.json({ shortId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortId });

    if (!urlDoc) {
      return res.status(404).json({ error: "URL not found" });
    }

    urlDoc.clicks = (urlDoc.clicks || 0) + 1;
    await urlDoc.save();

    return res.redirect(urlDoc.fullUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().select("fullUrl shortId clicks createdAt").sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ message: "Server error" });
  }
};