const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("Hello World");
})

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
            // instructions: req.body.instructions
            //     ? req.body.intsructions
            //     : "You are a helpful assistant.",
        }),
    });
    const data = await r.json();

    // Send back the JSON we received from the OpenAI REST API
    res.send(data);
});

const port = 3001;

app.listen(port);
console.log(`started on http://localhost:${port}`);
if (process.env.OPENAI_API_KEY === undefined) {
    console.error("Please set the OPENAI_API_KEY environment variable");
    process.exit(1);
}
