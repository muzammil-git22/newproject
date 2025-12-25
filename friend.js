import { arrayRemove, arrayUnion, auth, collection, db, doc, addDoc, getDoc, getDocs, onAuthStateChanged, query, signOut, updateDoc, where, serverTimestamp, setDoc } from "./config.js";

let mains = document.getElementById("mains");

function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUsersData(user.uid);
        } else {
            window.location.href = "./sigin.html";
        }
    });
}

async function currentUsersData(currentUserId) {
    try {
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Layout ka shell (Header aur Sidebar) sirf EK DAFA render hoga
            mains.innerHTML = `
             <header class="bg-white h-14 flex items-center justify-between px-4 sticky top-0 z-50 shadow-sm border-b">
        <div class="flex items-center gap-2 min-w-[300px]">
            <svg viewBox="0 0 36 36" class="fill-[#0866FF] w-10 h-10 cursor-pointer" fill="currentColor"><path d="M15 35.8C.8 34.8 0 24.7 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 6.7-.8 16.8-15 17.8V23h4.8l.8-5H21v-3.5c0-1.6.8-2.5 2.3-2.5H26V8h-3.8c-4.1 0-7.2 2.5-7.2 7v3h-3v5h3v12.8z"></path></svg>
            <div class="hidden sm:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 w-64">
                <i data-lucide="search" class="w-4 h-4 text-gray-500"></i>
                <input type="text" placeholder="Search Facebook" class="bg-transparent border-none focus:ring-0 text-[15px] ml-2 outline-none w-full">
            </div>
        </div>
        <nav class="hidden md:flex items-center gap-1 h-full">
            <div class="px-10 py-2 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer flex items-center h-full"><a href="dashboard.html"><i data-lucide="home" class="w-7 h-7 "></i> </a></div>
            <div class="px-10 py-2 border-b-[3px] border-[#0866FF] text-[#0866FF] cursor-pointer flex items-center h-full"> <a href="./friend.html"><i data-lucide="users-2" class="w-7 h-7 fill-[#0866FF]"></i></div></a>
            <div class="px-10 py-2 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer flex items-center h-full"><i data-lucide="tv-2" class="w-7 h-7"></i></div>
            <div class="px-10 py-2 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer flex items-center h-full"><i data-lucide="store" class="w-7 h-7"></i></div>
            <div class="px-10 py-2 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer flex items-center h-full"><i data-lucide="layout-grid" class="w-7 h-7"></i></div>
        </nav>
        <div class="flex items-center gap-2 min-w-[300px] justify-end">
            <div class="p-2 bg-[#E4E6E9] rounded-full hover:bg-gray-300 cursor-pointer"><i data-lucide="grid-3x3" class="w-5 h-5"></i></div>
            <div class="p-2 bg-[#E4E6E9] rounded-full hover:bg-gray-300 cursor-pointer"><i data-lucide="message-circle" class="w-5 h-5"></i></div>
            <div class="p-2 bg-[#E4E6E9] rounded-full hover:bg-gray-300 cursor-pointer relative">
                <i data-lucide="bell" class="w-5 h-5"></i>
                <span class="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] px-1.5 rounded-full border-2 border-white font-bold">9</span>
            </div>
            <img src="https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random" class="w-10 h-10 rounded-full border cursor-pointer">
        </div>
    </header>
             <div class="flex h-[calc(100vh-56px)]">
        
        <aside class="w-[360px] bg-white border-r border-gray-200 flex flex-col hidden lg:flex">
            <div class="p-4 flex justify-between items-center">
                <h1 class="text-2xl font-bold">Friends</h1>
                <div class="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition">
                    <i data-lucide="settings" class="w-5 h-5"></i>
                </div>
            </div>

            <nav class="flex-1 px-2 space-y-1 overflow-y-auto">
                <a href="#" class="flex items-center justify-between p-3 bg-[#F0F2F5] rounded-lg group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-[#0866FF] rounded-full text-white">
                            <i data-lucide="users" class="w-5 h-5 fill-white"></i>
                        </div>
                        <span class="font-semibold text-[15px]">Home</span>
                    </div>
                </a>
                
                <a href="./friendRequest.html" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-200 rounded-full">
                            <i data-lucide="user-plus" class="w-5 h-5"></i>
                        </div>
                        <span class="font-semibold text-[15px]">Friend Requests</span>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-500"></i>
                </a>

                <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-200 rounded-full">
                            <i data-lucide="user-check" class="w-5 h-5"></i>
                        </div>
                        <span class="font-semibold text-[15px]">Suggestions</span>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-500"></i>
                </a>

                <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-200 rounded-full">
                            <i data-lucide="users-2" class="w-5 h-5"></i>
                        </div>
                        <span class="font-semibold text-[15px]">All friends</span>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-500"></i>
                </a>

                <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-200 rounded-full">
                            <i data-lucide="cake" class="w-5 h-5"></i>
                        </div>
                        <span class="font-semibold text-[15px]">Birthdays</span>
                    </div>
                </a>

                <a href="#" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-200 rounded-full">
                            <i data-lucide="list" class="w-5 h-5"></i>
                        </div>
                        <span class="font-semibold text-[15px]">Custom Lists</span>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-gray-500"></i>
                </a>
            </nav>
        </aside> 

                <main class="flex-1 overflow-y-auto p-8">
                    <div class="max-w-[1200px] mx-auto">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-xl font-bold">People you may know</h2>
                        </div>
                        <div id="users-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            <p class="text-gray-500">Loading suggestions...</p>
                        </div>
                    </div>
                </main>
            </div>`;

            if (window.lucide) window.lucide.createIcons();
            getUsers(currentUserId);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Firebase Firestore functions (Ensure these are imported in your project)
// import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, addDoc, serverTimestamp } from "firebase/firestore";

async function getUsers(currentUserId) {
    const userContainer = document.getElementById("users-grid");
    if (!userContainer) return;

    try {
        const q = query(collection(db, "users"), where("userId", "!=", currentUserId));
        const querySnapshot = await getDocs(q);
        userContainer.innerHTML = ""; 

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const friendId = docSnap.id; // Firestore Document ID
            const fullName = `${data.firstName || 'User'} ${data.lastName || ''}`;
            
            // Check Status
            const isRequestSent = data.friendRequest && data.friendRequest.includes(currentUserId);
            const isFriend = data.friends && data.friends.includes(currentUserId);

            userContainer.innerHTML += `
                <div id="card-${friendId}" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <img src="https://ui-avatars.com/api/?name=${fullName.replace(" ", "+")}&background=random" class="w-full h-48 object-cover">
                    <div class="p-3 flex flex-col flex-1">
                        <h3 class="font-bold text-[17px] mb-0.5">${fullName}</h3>
                        <p class="text-gray-500 text-[13px] mb-3">Suggested for you</p>
                        
                        <div id="actions-${friendId}" class="mt-auto space-y-2">
                            ${isFriend || isRequestSent ? 
                                `<button onclick="ChatPage('${currentUserId}', '${friendId}')" class="w-full bg-[#0866FF] text-white font-semibold py-2 rounded-lg hover:bg-[#0756D8]">Chat</button>` 
                                : 
                                `<button id="btn-add-${friendId}" onclick="handleAddFriend('${friendId}', '${currentUserId}')" class="w-full bg-[#E7F3FF] text-[#0866FF] font-semibold py-2 rounded-lg hover:bg-[#DBE7F2]">Add friend</button>
                                 <button onclick="handleRemoveFriend('${friendId}', '${currentUserId}')" class="w-full bg-[#E4E6E9] text-[#050505] font-semibold py-2 rounded-lg hover:bg-[#D8DADF]">Remove</button>`
                            }
                        </div>
                    </div>
                </div>`;
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// --- ADD FRIEND LOGIC ---
window.handleAddFriend = (friendId, currentUserId) => {
    const actionsDiv = document.getElementById(`actions-${friendId}`);
    const btn = document.getElementById(`btn-add-${friendId}`);
    
    if(btn) {
        btn.innerText = "Sending...";
        btn.disabled = true;
    }

    const userRef = doc(db, 'users', friendId);
    
    updateDoc(userRef, { 
        friendRequest: arrayUnion(currentUserId) 
    })
    .then(() => {
        actionsDiv.innerHTML = `
            <button onclick="ChatPage('${currentUserId}', '${friendId}')" class="w-full bg-[#0866FF] text-white font-semibold py-2 rounded-lg hover:bg-[#0756D8] transition">
                Chat
            </button>`;
        console.log("Request sent.");
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Action failed!");
        if(btn) {
            btn.innerText = "Add Friend";
            btn.disabled = false;
        }
    });
}

// --- REMOVE / CANCEL LOGIC ---
window.handleRemoveFriend = async (friendId, currentUserId) => {
    const card = document.getElementById(`card-${friendId}`);
    try {
        const friendRef = doc(db, 'users', friendId);
        await updateDoc(friendRef, {
            friendRequest: arrayRemove(currentUserId)
        });

        if (card) {
            card.style.opacity = "0.5";
            setTimeout(() => card.remove(), 300);
        }
    } catch (error) {
        console.error("Remove error: ", error);
    }
}

// --- CHAT PAGE LOGIC ---
// Ensure 'serverTimestamp' is imported from 'firebase/firestore'
window.ChatPage = async (userId, friendId) => {
    // 1. Check karein ke dono IDs hain
    if (!userId || !friendId) {
        console.error("Missing IDs:", { userId, friendId });
        return;
    }

    // 2. Room ID aisi banayein jo dono taraf se same ho (Sort karke)
    const sortedIds = [userId, friendId].sort();
    const customRoomId = sortedIds[0] + "_" + sortedIds[1];

    console.log("Navigating to Room:", customRoomId);

    try {
        // 3. Check karein ke kya ye room pehle se Firestore mein hai?
        // Iske liye hum 'getDoc' use karenge (getDocs nahi)
        const roomRef = doc(db, "chatrooms", customRoomId);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            console.log("Pehli baar chat ho rahi hai. Room bana rahe hain...");
            // Naya room document create karein
            await setDoc(roomRef, {
                userDetails: {
                    [userId]: true,
                    [friendId]: true
                },
                createdAt: serverTimestamp(),
                participants: [userId, friendId]
            });
        } else {
            console.log("Purana room mil gaya!");
        }

        // 4. Chat page par bhej dein Room ID ke saath
        window.location.href = `chat.html?roomId=${customRoomId}`;

    } catch (error) {
        console.error("ChatPage Logic Error:", error);
        alert("Chat shuru nahi ho saki. Console check karein.");
    }
};
window.logOut = () => {
    signOut(auth).then(() => window.location.href = "./login.html");
}
getUser();
