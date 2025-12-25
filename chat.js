import { db, auth, doc, getDoc, addDoc, collection, query, orderBy, onSnapshot, serverTimestamp, onAuthStateChanged } from "./config.js";

const messagesContainer = document.getElementById("messages-container");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const friendNameDisplay = document.getElementById("friend-name");
const friendImgDisplay = document.getElementById("friend-img");

// 1. URL se Room ID nikalna
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");

let currentUserId = null;

// 2. Auth Check & Initialize
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in", user)
        currentUserId = user.uid;
        if (roomId) {
            setupChat();
            loadMessages();
        }
    } else {
        window.location.href = "./sigin.html";
    }
});

// 3. Friend ki Details Load karna (Header ke liye)
async function setupChat() {
    // RoomId format: "ID1_ID2". Humne dusre bande ki ID nikalni hai.
    const ids = roomId.split("_");
    const friendId = ids.find(id => id !== currentUserId);

    if (friendId) {
        const friendDoc = await getDoc(doc(db, "users", friendId));
        if (friendDoc.exists()) {
            const data = friendDoc.data();
            const fullName = `${data.firstName} ${data.lastName}`;
            friendNameDisplay.innerText = fullName;
            friendImgDisplay.src = `https://ui-avatars.com/api/?name=${fullName.replace(" ", "+")}&background=random`;
        }
    }
    if (window.lucide) window.lucide.createIcons();
}

// 4. Real-time Messages Load karna
function loadMessages() {
    const q = query(
        collection(db, "chatrooms", roomId, "messages"),
        orderBy("createdAt", "asc")
    );

    onSnapshot(q, (snapshot) => {
        messagesContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            const msg = doc.data();
            renderMessage(msg);
        });
        // Auto Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

// 5. Message UI render karna
function renderMessage(msg) {
    const isMe = msg.senderId === currentUserId;
    
    const msgDiv = document.createElement("div");
    msgDiv.className = `flex ${isMe ? "justify-end" : "justify-start"}`;

    msgDiv.innerHTML = `
        <div class="max-w-[70%] px-4 py-2 rounded-2xl text-[15px] ${
            isMe 
            ? "bg-[#0866FF] text-white rounded-br-none" 
            : "bg-[#E4E6E9] text-black rounded-bl-none"
        }">
            ${msg.text}
        </div>
    `;
    messagesContainer.appendChild(msgDiv);
}

// 6. Message Send karna
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentUserId) return;

    messageInput.value = ""; // Input clear karein

    try {
        await addDoc(collection(db, "chatrooms", roomId, "messages"), {
            text: text,
            senderId: currentUserId,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error sending message: ", e);
    }
}

// Events
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});