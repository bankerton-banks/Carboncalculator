import express from "express";
import fetch from "node-fetch";
const API_KEY = process.env.CLIMATIQ_API_KEY;
console.log("Key loaded:", API_KEY);

const app = express();
app.use(express.json());
app.use(express.static("."));

app.post("/api/estimate", async (req, res) => {
  try {
    const body = {
      ...req.body,
      emission_factor: {
        ...req.body.emission_factor,
        data_version: "^32"
      }
    };

    const response = await fetch("https://api.climatiq.io/data/v1/estimate", {
      method: "POST",
      headers: {
"Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log("Climatiq response:", JSON.stringify(data, null, 2));
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));