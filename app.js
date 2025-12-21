import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./config.js";

let email = document.getElementById("email");
let password = document.getElementById("password");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let signupBtn = document.getElementById("signup-btn"); 

const loadingCard = document.getElementById("loadingCard"); 
const form = document.querySelector(".form"); 

function showLoading() {
    loadingCard.classList.add('active'); 
}

function hideLoading() {
    loadingCard.classList.remove('active');
    form.classList.remove('disabled');
}
window.signUp = async (event) => {
    event.preventDefault();

showLoading();

    try {
        console.log("Account create ho raha hai...");        
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log("User create ho gaya:", user.uid);
        await saveDataToDb(firstName, lastName, email, phoneNumber, user.uid);
        console.log("Sab kuch sahi chal gaya, ab redirect kar rahe hain...");
        window.location.href = "./dashboard.html";
    } catch (error) {
        hideLoading();
        const errorMessage = error.message;
        console.log("Masla agaya hai:", errorMessage);
        alert(errorMessage); 
        if(signupBtn) {
            signupBtn.innerText = "Signup";
            signupBtn.disabled = false;
        }
    }
}
async function saveDataToDb(firstName, lastName, email, phoneNumber, userId) {
    console.log("Database mein data ja raha hai...");    
    await setDoc(doc(db, "users", userId), {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        userId: userId,
    });
    console.log("Data saved successfully!");

}