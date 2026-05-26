const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");

const { redirectUrl } = require("./controllers/urlController");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

app.get("/:shortId", redirectUrl);

module.exports = app;