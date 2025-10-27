const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/payoneer/status/test", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Create Payoneer session (stub now — replace with real API call)
app.post("/api/payoneer/create-session", async (req, res) => {
  try {
    const fakeUrl = "https://www.payoneer.com/"; // TODO: replace with real session URL
    res.status(200).json({ url: fakeUrl });
  } catch (e) {
    console.error("create-session error", e);
    res.status(500).json({ error: "create-session failed" });
  }
});

// IMPORTANT: listen on 0.0.0.0 so your phone can reach it over Wi-Fi
const PORT = 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ API running on http://0.0.0.0:${PORT}`);
});
