
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "./config.js";

let email = document.getElementById("email");
let password = document.getElementById("password");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");


window.signUp = async (event) => {
    event.preventDefault();


    try {
        console.log("Account create ho raha hai...");        
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log("User create ho gaya:", user.uid);
        await saveDataToDb(firstName, lastName, email,  user.uid);
        console.log("Sab kuch sahi chal gaya, ab redirect kar rahe hain...");
        window.location.href = "./dashboard.html";
    } catch (error) {
        const errorMessage = error.message;
        console.log("Masla agaya hai:", errorMessage);
        alert(errorMessage); 
        if(signupBtn) {
            signupBtn.innerText = "Signup";
            signupBtn.disabled = false;
        }
    }
}
async function saveDataToDb(firstName, lastName, email,  userId) {
    console.log("Database mein data ja raha hai...");    
    await setDoc(doc(db, "users", userId), {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        userId: userId,
    });
    console.log("Data saved successfully!");
}

