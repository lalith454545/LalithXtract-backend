const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const app = express();

app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post("/extract-text", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { data } = await Tesseract.recognize(req.file.buffer, "eng");
    res.json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract text" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
