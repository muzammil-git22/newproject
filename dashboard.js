import { auth, db, doc, getDoc, onAuthStateChanged, signOut } from "./config.js";

// Global variables to store UI elements
const mains = document.getElementById("mains");

// 1. Logout Function
window.logOut = () => {
    signOut(auth).then(() => {
        console.log("Logged out successfully");
        window.location.href = "./sigin.html";
    }).catch((error) => console.error("Logout Error:", error));
};

// 2. Auth State Check
function init() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User logged in:", user.uid);
            fetchAndRenderData(user.uid);
        } else {
            window.location.href = './sigin.html';
        }
    });
}

async function fetchAndRenderData(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            renderDashboard(data);
        } else {
            console.error("User data not found in Firestore!");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 4. Main Rendering Function
function renderDashboard(userData) {
    const fullName = `${userData.firstName} ${userData.lastName}`;
    const avatarUrl = `https://ui-avatars.com/api/?name=${fullName.replace(" ", "+")}&background=random`;

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
            <img src="${avatarUrl}" class="w-10 h-10 rounded-full border cursor-pointer">
        </div>
    </header>

    <div class="flex justify-between h-[calc(100vh-56px)]">
        <aside class="hidden xl:flex flex-col w-[360px] p-2 overflow-y-auto">
            <a href="#" class="flex items-center gap-3 p-2.5 hover:bg-[#E4E6E9] rounded-lg">
                <img src="${avatarUrl}" class="w-9 h-9 rounded-full border">
                <span class="font-semibold text-[15px]">${fullName}</span>
            </a>
            <a href="./friend.html" class="flex items-center gap-3 p-2.5 hover:bg-[#E4E6E9] rounded-lg">
                <i data-lucide="users" class="text-blue-500 w-8 h-8"></i>
                <span class="font-semibold text-[15px]">Friends</span>
            </a>
            <a href="#" class="flex items-center gap-3 p-2.5 hover:bg-[#E4E6E9] rounded-lg" onclick="logOut()">
                <i data-lucide="log-out" class="text-red-500 w-8 h-8"></i>
                <span class="font-semibold text-[15px]">Logout</span>
            </a>
        </aside>

        <main class="flex-1 overflow-y-auto pt-5 flex flex-col items-center">
            <div class="bg-white rounded-xl shadow-sm w-full max-w-[590px] p-4 mb-4 border border-gray-200">
                <div class="flex gap-3 items-center border-b pb-3">
                    <img src="${avatarUrl}" class="w-10 h-10 rounded-full">
                    <div class="bg-[#F0F2F5] hover:bg-[#E4E6E9] flex-1 rounded-full px-4 py-2.5 text-[#65676B] cursor-pointer">
                        What's on your mind, ${userData.firstName}?
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm w-full max-w-[590px] mb-4 border border-gray-200">
                <div class="p-4 flex gap-3">
                    <img src="https://ui-avatars.com/api/?name=Group" class="w-10 h-10 rounded-lg">
                    <div>
                        <h4 class="font-bold text-[15px]">Sample Group Post</h4>
                        <span class="text-[#65676B] text-[13px]">Just now • <i data-lucide="globe" class="w-3 h-3 inline"></i></span>
                    </div>
                </div>
                <div class="px-4 pb-2 text-[15px]">Welcome to your new Facebook clone, ${userData.firstName}!</div>
                <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800" class="w-full">
            </div>
        </main>

        <aside class="hidden lg:flex flex-col w-[360px] p-2 pt-4">
            <span class="font-bold text-[#65676B] text-[17px] px-2 mb-2">Contacts</span>
            <div class="flex items-center gap-3 p-2 hover:bg-[#E4E6E9] rounded-lg cursor-pointer">
                <div class="relative">
                </div>
            </div>
        </aside>
    </div>
    `;

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

init();