const Url = require("../models/Url");
const shortid = require("shortid");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortId = shortid.generate();

    const shortUrl = `${process.env.BASE_URL}/${shortId}`;

    const newUrl = await Url.create({
      originalUrl,
      shortId,
      shortUrl,
      user: req.user.id,
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.clicks += 1;

    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getUserUrls,
};