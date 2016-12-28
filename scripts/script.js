 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyDbd6bvg2fQ50Fvo_b-WA6SUNPFHogX-3w",
     authDomain: "aviate-web-e6ae0.firebaseapp.com",
     databaseURL: "https://aviate-web-e6ae0.firebaseio.com",
     storageBucket: "aviate-web-e6ae0.appspot.com",
     messagingSenderId: "151455867392"
 };
 firebase.initializeApp(config);

 /**
  * Handles the sign in button press.
  */
 function toggleSignIn() {
     //If previously signed in then do sign out
     if (firebase.auth().currentUser) {
         firebase.auth().signOut();
     } else {
         var email = document.getElementById('email').value;
         var password = document.getElementById('password').value;

         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;

             if (errorCode === 'auth/wrong-password') {
                 alert('Wrong password.');
             } else {
                 alert(errorMessage);
             }
             console.log(error);
             document.getElementById('quickstart-sign-in').disabled = false;

         });

     }
     document.getElementById('quickstart-sign-in').disabled = true;
 }

 /**
  * Handles the sign up button press.
  */
 function handleSignUp() {
     var email = document.getElementById('email').value;
     var password = document.getElementById('password').value;

     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;

         if (errorCode == 'auth/weak-password') {
             alert('The password is too weak.');
         } else {
             alert(errorMessage);
         }
         console.log(error);

     });

 }


 /**
  * initApp handles setting up UI event listeners and registering Firebase auth listeners:
  *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
  *    out, and that is where we update the UI.
  */
 function initApp() {
     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             // User is signed in.
             var displayName = user.displayName;
             var email = user.email;

             var uid = user.uid;
             var providerData = user.providerData;

             document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
             document.getElementById('quickstart-sign-in').textContent = 'Sign out';
             document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

         } else {

             document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
             document.getElementById('quickstart-sign-in').textContent = 'Sign in';
             document.getElementById('quickstart-account-details').textContent = 'null';

         }

         document.getElementById('quickstart-sign-in').disabled = false;

     });

     document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
     document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
 }