import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";

const root = document.querySelector(":root");
const theme = root.getAttribute("data-theme");
changeTheme(theme);

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.getElementById("name").innerHTML = profile.getName();
    document.getElementById("email").innerHTML = profile.getEmail();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
    });
}

window.onSignIn = onSignIn;
window.signOut = signOut;
