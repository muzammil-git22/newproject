import { arrayRemove, arrayUnion, auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged, query, signOut, updateDoc, where } from "./config.js";

let mains = document.getElementById("mains");

function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUsersData(user.uid);
        } else {
            window.location.href = "./login.html";
        }
    });
}

async function currentUsersData(currentUserId) {
    try {
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Layout fixing: Added "friend-requests-container" and "suggestions-container"
            mains.innerHTML = `
            <header class="bg-white h-14 flex items-center justify-between px-4 sticky top-0 z-50 shadow-sm border-b">
                <div class="flex items-center gap-2 min-w-[300px]">
                    <svg viewBox="0 0 36 36" class="fill-[#0866FF] w-10 h-10 cursor-pointer" fill="currentColor"><path d="M15 35.8C.8 34.8 0 24.7 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 6.7-.8 16.8-15 17.8V23h4.8l.8-5H21v-3.5c0-1.6.8-2.5 2.3-2.5H26V8h-3.8c-4.1 0-7.2 2.5-7.2 7v3h-3v5h3v12.8z"></path></svg>
                    <div class="hidden sm:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 w-64">
                        <i data-lucide="search" class="w-4 h-4 text-gray-500"></i>
                        <input type="text" placeholder="Search Facebook" class="bg-transparent border-none focus:ring-0 text-[15px] ml-2 outline-none w-full">
                    </div>
                </div>
                <div class="flex items-center gap-2 min-w-[300px] justify-end">
                    <img src="https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random" class="w-10 h-10 rounded-full border cursor-pointer" onclick="logOut()">
                </div>
            </header>

            <div class="flex h-[calc(100vh-56px)]">
                <aside class="w-[360px] bg-white border-r border-gray-200 flex flex-col hidden lg:flex p-4">
                    <h1 class="text-2xl font-bold mb-4">Friends</h1>
                    <nav class="space-y-1">
                        <div class="p-3 bg-gray-100 rounded-lg font-semibold flex items-center gap-3 cursor-pointer">
                            <i data-lucide="user-plus"></i> Friend Requests
                        </div>
                    </nav>
                </aside> 

                <main class="flex-1 overflow-y-auto p-8 bg-[#F0F2F5]">
                    <div class="max-w-[1200px] mx-auto">
                        <div class="mb-10">
                            <h2 class="text-xl font-bold mb-4">Friend Requests</h2>
                            <div id="friendRequests" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p class="text-gray-500">Loading requests...</p>
                            </div>
                        </div>

                        <hr class="my-8 border-gray-300">

                        <div>
                            <h2 class="text-xl font-bold mb-4">People you may know</h2>
                            <div id="users-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <p class="text-gray-500">Loading suggestions...</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>`;

            if (window.lucide) window.lucide.createIcons();
            
            // Dono functions ko call karein
            getFriendRequest(currentUserId);
            getSuggestions(currentUserId, data.friends || []);

        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Fixed: getFriendRequest function
async function getFriendRequest(currentUserId) {
    const container = document.getElementById("friendRequests");
    if (!container) return;

    try {
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);
        const friendRequestArray = docSnap.data()?.friendRequest || [];

        if (friendRequestArray.length === 0) {
            container.innerHTML = `<p class="text-gray-500">No pending requests.</p>`;
            return;
        }

        // Fetching users who sent requests
        const q = query(collection(db, "users"), where("userId", "in", friendRequestArray));
        const querySnapshot = await getDocs(q);
        
        container.innerHTML = ""; 
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            container.innerHTML += `
            <div class="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}" class="w-14 h-14 rounded-full border">
                    <span class="font-bold">${data.firstName} ${data.lastName}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="handleAcceptFriend('${docSnap.id}', '${currentUserId}')" class="bg-[#0866FF] text-white px-4 py-1.5 rounded-lg text-sm font-semibold">Confirm</button>
                    <button onclick="handleDeclineFriend('${docSnap.id}', '${currentUserId}')" class="bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-semibold">Delete</button>
                </div>
            </div>`;
        });
    } catch (e) {
        console.error(e);
        container.innerHTML = "Error loading requests.";
    }
}

// New: getSuggestions function (to fill the grid)
async function getSuggestions(currentUserId, myFriendsList) {
    const grid = document.getElementById("users-grid");
    if (!grid) return;

    try {
        const q = query(collection(db, "users"), where("userId", "!=", currentUserId));
        const querySnapshot = await getDocs(q);
        grid.innerHTML = "";

        querySnapshot.forEach((uDoc) => {
            const userData = uDoc.data();
            // Sirf wo dikhao jo abhi dost nahi hain
            if (!myFriendsList.includes(uDoc.id)) {
                grid.innerHTML += `
                <div class="bg-white rounded-xl shadow border overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&size=200" class="w-full h-40 object-cover">
                    <div class="p-4">
                        <p class="font-bold">${userData.firstName} ${userData.lastName}</p>
                        <button onclick="sendRequest('${uDoc.id}', '${currentUserId}')" class="w-full bg-[#E7F3FF] text-[#0866FF] mt-3 py-2 rounded-lg font-semibold">Add Friend</button>
                    </div>
                </div>`;
            }
        });
    } catch (e) { console.error(e); }
}

// Actions
window.handleAcceptFriend = async (friendId, currentUserId) => {
    try {
        await updateDoc(doc(db, "users", friendId), { friends: arrayUnion(currentUserId) });
        await updateDoc(doc(db, "users", currentUserId), {
            friends: arrayUnion(friendId),
            friendRequest: arrayRemove(friendId)
        });
        alert("Friend Confirmed!");
        location.reload(); // Refresh to update lists
    } catch (e) { console.error(e); }
};

window.handleDeclineFriend = async (friendId, currentUserId) => {
    await updateDoc(doc(db, "users", currentUserId), { friendRequest: arrayRemove(friendId) });
    location.reload();
};

window.logOut = () => signOut(auth).then(() => window.location.href = "./login.html");

getUser();