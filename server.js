
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json({ limit: "15kb" }));

// GitHub Pages वेबसाइट का Origin
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5500",
    "http://127.0.0.1:5500"
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        error: "बहुत अधिक सवाल भेजे गए। एक मिनट बाद प्रयास करें।"
    }
});

app.get("/", (req, res) => {
    res.send("Agri Knowledge Hub AI Backend is running!");
});

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.post("/api/chat", limiter, async (req, res) => {
    try {
        const question = req.body.question;

        if (!question || typeof question !== "string" || !question.trim()) {
            return res.status(400).json({
                error: "कृपया कृषि से संबंधित सवाल लिखें।"
            });
        }

        if (question.length > 1500) {
            return res.status(400).json({
                error: "सवाल बहुत लंबा है।"
            });
        }

        // API Key केवल Backend Environment से मिलेगी
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Backend में Groq API Key सेट नहीं है।"
            });
        }

        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are Agri Knowledge Hub Agriculture AI Assistant. Answer agricultural questions accurately in Hindi. Explain crop diseases, pests, fertilizers, irrigation and farming methods in simple language."
                        },
                        {
                            role: "user",
                            content: question.trim()
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 1200
                })
            }
        );

        const result = await groqResponse.json();

        if (!groqResponse.ok) {
            console.error("Groq API Error:", result);

            return res.status(502).json({
                error: result.error?.message || "Groq AI से जवाब नहीं मिला।"
            });
        }

        const answer = result.choices?.[0]?.message?.content;

        if (!answer) {
            return res.status(502).json({
                error: "AI का जवाब खाली मिला।"
            });
        }

        return res.json({ answer });

    } catch (error) {
        console.error("Backend Error:", error);

        return res.status(500).json({
            error: "Backend में समस्या हुई। कृपया बाद में प्रयास करें।"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Agri Knowledge Hub running on port ${PORT}`);
});
