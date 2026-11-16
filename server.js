require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json({ limit: "15kb" }));

app.use(cors({
    origin: ["https://YOUR-GITHUB-USERNAME.github.io"],
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "x-groq-api-key"]
}));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: "बहुत अधिक सवाल भेजे गए। कृपया एक मिनट बाद प्रयास करें।" }
});

app.use("/api/chat", limiter);

app.get("/", (req, res) => {
    res.send("Agri Knowledge Hub AI Backend is running!");
});

app.post("/api/chat", async (req, res) => {
    try {
        const question = req.body.question;
        
        // **यहाँ आप अपनी Groq API Key सीधे नीचे लिख सकते हैं (या फ्रंटएंड से आने देगी)**
        const ENTER_YOUR_GROQ_API_KEY = "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"; 

        const userApiKey = req.headers["x-groq-api-key"];
        const apiKey = userApiKey || process.env.GROQ_API_KEY || ENTER_YOUR_GROQ_API_KEY;

        if (!question || typeof question !== "string") {
            return res.status(400).json({ error: "कृपया सही कृषि सवाल लिखें।" });
        }

        if (question.length > 1500) {
            return res.status(400).json({ error: "सवाल बहुत लंबा है।" });
        }

        if (!apiKey || apiKey.includes("xxxxxx")) {
            return res.status(500).json({ error: "कृपया कोड में वैध Groq API Key दर्ज करें।" });
        }

        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiKey
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: `You are Agri Knowledge Hub Agriculture AI Assistant. Answer in Hindi.`
                        },
                        {
                            role: "user",
                            content: question
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 1200
                })
            }
        );

        const result = await groqResponse.json();

        if (!groqResponse.ok) {
            return res.status(502).json({ error: result.error?.message || "AI सेवा से जवाब नहीं मिल पाया।" });
        }

        const answer = result.choices?.[0]?.message?.content;
        if (!answer) {
            return res.status(502).json({ error: "AI का जवाब खाली मिला।" });
        }

        res.json({ answer: answer });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Backend में समस्या हुई।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log("Agri Knowledge Hub Backend running on port " + PORT);
});
