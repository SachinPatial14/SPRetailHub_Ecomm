let signupData = document.getElementById("signup-area");
let loginAccount = document.getElementById("login-area");
let loginForm = document.querySelector(".login-form");
let signupForm = document.querySelector(".signup-form");
let loginSpan = document.getElementById("login-span");
let signupSpan = document.getElementById("signup-span");
let loginTitle = document.getElementById("login-page");
let signupTitle = document.getElementById("signup-page");


signupData.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
        let fullName = document.getElementById("full-name").value;
        let createUsername = document.getElementById("create-username").value;
        let setPassword = document.getElementById("set-password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if (setPassword !== confirmPassword) {
            return window.alert("Passwords do not match, please enter the correct password.");
        }

        
        let existingUserData = JSON.parse(localStorage.getItem("getuserdata")) || [];
        let isUsernameTaken = existingUserData.some(user => user.createUsername === createUsername);

        if (isUsernameTaken) {
            return window.alert("This username is already in use. Please try using a different username.");
        }

        if (setPassword.length < 4) {
            return window.alert("Password should be at least 4 characters long.");
        }

        
        let userData = {
            fullName,
            createUsername,
            setPassword,
        };

        existingUserData.push(userData);
        localStorage.setItem("getuserdata", JSON.stringify(existingUserData));

        window.alert("Your account has been set up successfully. Now you can log in.");

        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        console.error("Unable to create your account, please try again", error);
        window.alert("Unable to create your account. Please try again.");
    }

    showLogincontainer();
});


loginAccount.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
        let loginUsername = document.getElementById("username").value;
        let loginPassword = document.getElementById("password").value;

        let existingUserData = JSON.parse(localStorage.getItem("getuserdata")) || [];

        let user = existingUserData.find(user => user.createUsername === loginUsername && user.setPassword === loginPassword);

        if (user) {
            alert("Login successful");
            window.location.href = "home.html"; 
        } else {
            alert("Login failed. Invalid username or password.");
        }
    } catch (error) {
        console.error("Unable to login your account, please try again", error);
        window.alert("Unable to login your account. Please try again.");
    }
});


function showSignupcontainer() {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    loginTitle.style.display = "none";
    signupTitle.style.display = "block";
}


function showLogincontainer() {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    signupTitle.style.display = "none";
    loginTitle.style.display = "block";
}


loginSpan.addEventListener("click", () => {
    showSignupcontainer();
});


signupSpan.addEventListener("click", () => {
    showLogincontainer();
});
