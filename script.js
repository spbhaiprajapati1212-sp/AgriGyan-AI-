const cropContainer = document.getElementById("cropContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function displayCrops(list) {

    cropContainer.innerHTML = "";

    if (list.length === 0) {
        cropContainer.innerHTML =
            "<p>कोई फसल नहीं मिली। दूसरी फसल खोजें।</p>";
        return;
    }

    list.forEach(crop => {

        const card = document.createElement("div");
        card.className = "crop-card";

        const title = document.createElement("h3");
        title.textContent = crop.hindi + " (" + crop.english + ")";

        const botanical = document.createElement("p");
        botanical.className = "botanical";
        botanical.textContent = crop.botanical;

        const category = document.createElement("p");
        category.textContent =
            "श्रेणी: " + crop.category + " | मौसम: " + crop.season;

        const pests = document.createElement("p");
        pests.textContent = "🐛 प्रमुख कीट: " + crop.pests.join(", ");

        const diseases = document.createElement("p");
        diseases.textContent = "🦠 प्रमुख रोग: " + crop.diseases.join(", ");

        const varieties = document.createElement("p");
        varieties.textContent = "🌱 उन्नत किस्में: " + crop.varieties.join(", ");

        card.append(title, botanical, category, pests, diseases, varieties);

        cropContainer.appendChild(card);
    });
}

function filterCrops() {

    const query = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = crops.filter(crop => {

        const allText = [
            crop.hindi,
            crop.english,
            crop.botanical,
            crop.category,
            crop.season,
            ...crop.pests,
            ...crop.diseases,
            ...crop.varieties
        ].join(" ").toLowerCase();

        const matchesSearch = allText.includes(query);

        const matchesCategory =
            !selectedCategory ||
            crop.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayCrops(filtered);
}

searchInput.addEventListener("input", filterCrops);
categoryFilter.addEventListener("change", filterCrops);

// शुरुआती सभी फसलें दिखाएँ
displayCrops(crops);


// ===============================
// AGRI AI CHATBOT
// ===============================

const chatBox = document.getElementById("chatBox");
const userQuestion = document.getElementById("userQuestion");
const askButton = document.getElementById("askButton");

// Render पर Backend URL सेट करें
// उदाहरण: https://your-backend.onrender.com
const BACKEND_URL = "https://YOUR-BACKEND-URL.onrender.com";

function addMessage(message, className) {

    const div = document.createElement("div");
    div.className = className;

    // textContent HTML injection से बचाता है
    div.textContent = message;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function askAI() {

    const question = userQuestion.value.trim();

    if (!question) {
        alert("कृपया अपना कृषि सवाल लिखें।");
        return;
    }

    addMessage("आप: " + question, "user-message");

    userQuestion.value = "";
    askButton.disabled = true;
    askButton.textContent = "AI जवाब दे रहा है...";

    try {

        const response = await fetch(
            BACKEND_URL + "/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "AI से जवाब नहीं मिला।");
        }

        addMessage(
            "AI: " + data.answer,
            "bot-message"
        );

    } catch (error) {

        addMessage(
            "त्रुटि: " + error.message,
            "bot-message"
        );

    } finally {

        askButton.disabled = false;
        askButton.textContent = "AI से पूछें";
    }
}

askButton.addEventListener("click", askAI);

userQuestion.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        askAI();
    }

});

