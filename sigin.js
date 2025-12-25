
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "./config.js";
const loadingCard = document.getElementById("loadingCard");
const form = document.querySelector(".form"); 
window.signIn = (event) => {
    event.preventDefault()
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user login hogaya", user);            
        })
        .catch((error) => {
            hideLoading();             
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

function getUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("ye user login he abhi", user);            
            window.location.replace("./dashboard.html"); 
            
        } else {
            console.log("ye user login nahi he abhi");            
        }
    });
}
getUser();
