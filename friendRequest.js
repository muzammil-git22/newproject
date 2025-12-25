

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
            <div class="px-10 py-2 border-b-[3px] border-[#0866FF] text-[#0866FF] cursor-pointer flex items-center h-full"><a href="dashboard.html"><i data-lucide="home" class="w-7 h-7 fill-[#0866FF]"></i> </a></div>
            <div class="px-10 py-2 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer flex items-center h-full"> <a href="./friend.html"><i data-lucide="users-2" class="w-7 h-7 "></i></div></a>
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
                <a href="./friend.html" class="flex items-center justify-between p-3 hover:bg-gray-100  rounded-lg group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-200  rounded-full ">
                            <i data-lucide="users" class="w-5 h-5 "></i>
                        </div>
                        <span class="font-semibold text-[15px]">Home</span>
                    </div>
                </a>
                
                <a href="./friendRequest.html" class="flex items-center justify-between p-3 bg-[#F0F2F5] rounded-lg transition group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-[#0866FF] text-white fill-white rounded-full">
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
            getFriendRequest(currentUserId);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getFriendRequest(currentUserId) {
    const container = document.getElementById("friendRequests");
    if (!container) return;

    try {
        const docRef = doc(db, "users", currentUserId);
        const docSnap = await getDoc(docRef);
        const friendRequestArray = docSnap.data()?.friendRequest || [];

        if (friendRequestArray.length === 0) {
            container.innerHTML = `<div class="bg-white p-8 rounded-xl border text-center text-gray-500 font-medium">No pending requests at the moment.</div>`;
            return;
        }

        // Firestore 'in' query supports up to 30 IDs
        const q = query(collection(db, "users"), where("userId", "in", friendRequestArray));
        const querySnapshot = await getDocs(q);
        
        container.innerHTML = ""; 
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            container.innerHTML += `
            <article class="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <img src="https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random" class="w-16 h-16 rounded-full border">
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg">${data.firstName} ${data.lastName}</h3>
                        <p class="text-gray-500 text-sm">Sent you a friend request</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="handleAcceptFriend('${docSnap.id}', '${currentUserId}')" class="bg-[#0866FF] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0756D8] transition">Confirm</button>
                    <button onclick="handleDeclineFriend('${docSnap.id}', '${currentUserId}')" class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">Delete</button>
                </div>
            </article>`;
        });
    } catch (e) {
        console.error("Fetch Error:", e);
        container.innerHTML = "Error loading requests.";
    }
}

window.handleAcceptFriend = async (friendId, currentUserId) => {
    try {
        const friendRef = doc(db, "users", friendId);
        const myRef = doc(db, "users", currentUserId);

        // Dono users ke friends array mein update
        await updateDoc(friendRef, { friends: arrayUnion(currentUserId) });
        await updateDoc(myRef, {
            friends: arrayUnion(friendId),
            friendRequest: arrayRemove(friendId)
        });

        alert("Request Accepted!");
        getFriendRequest(currentUserId);
    } catch (e) { console.error(e); }
};

window.handleDeclineFriend = async (friendId, currentUserId) => {
    try {
        await updateDoc(doc(db, "users", currentUserId), {
            friendRequest: arrayRemove(friendId)
        });
        getFriendRequest(currentUserId);
    } catch (e) { console.error(e); }
};

window.logOut = () => {
    signOut(auth).then(() => window.location.href = "./login.html");
}

getUser();