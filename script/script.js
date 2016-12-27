// Initialize Firebase
var config = {
    apiKey: "AIzaSyB3WiDutUF90a5NqvpT2QwZ3Mvy10Jm984",
    authDomain: "quick-web-d821c.firebaseapp.com",
    databaseURL: "https://quick-web-d821c.firebaseio.com",
    storageBucket: "quick-web-d821c.appspot.com",
    messagingSenderId: "240895840355"
};
firebase.initializeApp(config);




// Getting elements
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');


// sign up call back function

function signUp() {
    var email = email.value;
    var pass = password.value;

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.')
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}

// sign in call back function
function signIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        fierbase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('btnLogin').disable = false;
        });
        document.getElementById('btnLogin').disable = true;
    }
}

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // If user is signed in already
            var email = user.email;
            var pass = user.password;
            document.getElementById(btnLogin).textContent = 'Sign Out';
            document.getElementById(signInStatus).textContent = 'Signed In';
        } else {
            document.getElementById(btnLogin).textContent = 'Sign In';
            document.getElementById(signInStatus).textContent = 'Signed Out';
        }
    });


    // setting of all functions
    document.getElementById('btnLogin').addEventListener('click', signIn, false);
    document.getElementById('btnSignup').addEventListener('click', signUp, false);
}

window.onload = function() {
    initApp();
};