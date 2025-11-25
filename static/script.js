// Emoji picker
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
const messageInput = document.getElementById("messageInput");

// Simple emoji list
const emojis = ["😀","😁","😂","🤣","😊","😍","😘","😎","😢","😡","👍","🙏","🔥","✨","❤️"];

function loadEmojis() {
    emojis.forEach(e => {
        const span = document.createElement("span");
        span.textContent = e;
        span.onclick = () => {
            messageInput.value += e;
            emojiPicker.classList.remove("show");
        };
        emojiPicker.appendChild(span);
    });
}
loadEmojis();

emojiBtn.onclick = () => {
    emojiPicker.classList.toggle("show");
};

// File attachment
const attachBtn = document.getElementById("attachBtn");
const attachmentInput = document.getElementById("attachmentInput");

attachBtn.onclick = () => {
    attachmentInput.click();
};

// To send msg 
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");

sendBtn.onclick = sendMessage;
messageInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const msg = messageInput.value.trim();
    if (msg === "") return;

    addMessage(msg, "user-message");
    messageInput.value = "";
    emojiPicker.classList.remove("show");

    fetch("/get-response", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: msg })
    })
    .then(res => res.json())
    .then(data => {
        addMessage(data.reply, "bot-message");
    })
    .catch(() => {
        addMessage("Error contacting server!", "bot-message");
    });
}

// Add msg to UI 
function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = `message ${className}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
