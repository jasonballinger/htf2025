const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// An endpoint which would work with the client code above - it returns
// the contents of a REST API request to this protected endpoint
app.post("/session", async (req, res) => {
    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-4o-realtime-preview-2024-12-17",
            voice: "verse",
        }),
    });
    const data = await r.json();

    // Send back the JSON we received from the OpenAI REST API
    res.send(data);
});

app.listen(3001);
console.log("started on http://localhost:3001");
