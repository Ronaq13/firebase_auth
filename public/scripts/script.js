 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyDbd6bvg2fQ50Fvo_b-WA6SUNPFHogX-3w",
     authDomain: "aviate-web-e6ae0.firebaseapp.com",
     databaseURL: "https://aviate-web-e6ae0.firebaseio.com",
     storageBucket: "aviate-web-e6ae0.appspot.com",
     messagingSenderId: "151455867392"
 };
 firebase.initializeApp(config);
 //*************************************************************--AUTHENTICATION--***************************************************************** */
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
             console.log(user.uid);
             var displayName = user.displayName;
             var email = user.email;

             var uid = user.uid;
             var providerData = user.providerData;
             document.getElementById('afterSignInDiv').style.visibility = 'visible';
             document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
             document.getElementById('quickstart-sign-in').textContent = 'Sign out';
             document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

         } else {
             document.getElementById('afterSignInDiv').style.visibility = 'hidden';
             document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
             document.getElementById('quickstart-sign-in').textContent = 'Sign in';
             document.getElementById('quickstart-account-details').textContent = 'null';
         }

         document.getElementById('quickstart-sign-in').disabled = false;

     });

     document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
     document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
 }

 //**********************************************************************AUTHENTICATION-END************************************************************/

 //************************************-SENDING DATA TO DATABASE-********************* */

 //            Adding Project
 var addProjectBtn = document.getElementById('addProjectBtn');
 addProjectBtn.addEventListener('click', addProjectFunc);

 function addProjectFunc() {
     if (document.getElementById('quickstart-sign-in-status').textContent == 'Signed in') {
         // Checking data
         if (document.getElementById('addProjectID') !== null) {
             var addProjectID = document.getElementById('addProjectID').value;
         }
         var projectData = {
             tmp: "This is not an assignment of this project"
         };
         var addPro = {};
         addPro[addProjectID] = projectData;
         // Sending the new Project
         var refOfProject = firebase.database().ref().child('projects');
         refOfProject.update(addPro);
     } else {
         alert("First Sign in please");
     }
 }

 //   Deleting Project
 var deleteProjectBtn = document.getElementById('deleteProjectBtn');
 deleteProjectBtn.addEventListener('click', deleteProjectFunc);

 function deleteProjectFunc() {

     if (document.getElementById('deleteProjectID') !== null) {
         var deleteProjectID = document.getElementById('deleteProjectID').value;
     }

     var refOfProject = firebase.database().ref("projects/" + deleteProjectID);
     refOfProject.remove();
 }

 //  Writing Assignment
 var addAssiBtn = document.getElementById('addAssiBtn');
 addAssiBtn.addEventListener('click', writeAssignment);

 function writeAssignment() {
     if (document.getElementById('quickstart-sign-in-status').textContent == "Signed in") {
         // checking data
         if (document.getElementById('addAssiUsername') !== null && document.getElementById('addAssiID') !== null && document.getElementById('addAssiRoll_no') !== null && document.getElementById('addAssiProjectID') !== null) {
             var projectID = document.getElementById('addAssiProjectID').value;
             var username = document.getElementById('addAssiUsername').value;
             var assiID = document.getElementById('addAssiID').value;
             var roll_no = document.getElementById('addAssiRoll_no').value;
         }
         var assiData = {
             Name: username,
             Roll_no: Number(roll_no)
         };
         var updates = {};
         updates[assiID] = assiData;
         // sending data to firebase database
         var ref = firebase.database().ref("projects/" + projectID);
         ref.update(updates);
     } else {
         alert("First Sign In please.");
     }
 }

 // Updating Assignment
 var updateAssiBtn = document.getElementById('updateAssiBtn');
 updateAssiBtn.addEventListener('click', updateAssignment);

 function updateAssignment() {
     if (document.getElementById('quickstart-sign-in-status').textContent == "Signed in") {
         if (document.getElementById('updateAssiUsername') !== null && document.getElementById('updateAssiID') !== null && document.getElementById('updateAssiRoll_no') !== null && document.getElementById('updateAssiProjectID') !== null) {
             var projectID = document.getElementById('updateAssiProjectID').value;
             var username = document.getElementById('updateAssiUsername').value;
             var assiID = document.getElementById('updateAssiID').value;
             var roll_no = document.getElementById('updateAssiRoll_no').value;
         }
         var assiData = {
             Name: username,
             Roll_no: roll_no
         };
         var updates = {};
         updates[assiID] = assiData;
         var ref = firebase.database().ref('projects/' + projectID);
         ref.update(updates);
     } else {
         alert("Please Sign in first");
     }
 }

 // Deleting Assignment
 var deleteAssiBtn = document.getElementById('deleteAssiBtn');
 deleteAssiBtn.addEventListener('click', deleteAssignment);

 function deleteAssignment() {
     if (document.getElementById('quickstart-sign-in-status').textContent == "Signed in") {
         if (document.getElementById('deleteAssiID') !== null && document.getElementById('deleteAssiProjectID') !== null) {
             var projectID = document.getElementById('deleteAssiProjectID').value;
             var assiID = document.getElementById('deleteAssiID').value;
         }
         var ref = firebase.database().ref('projects/' + projectID + '/' + assiID);
         ref.remove();
     }
 }

 // Checking Assignment exists or not
 var checkAssiBtn = document.getElementById('checkAssiBtn');
 checkAssiBtn.addEventListener('click', checkAssignment);

 function checkAssignment() {
     if (document.getElementById('checkAssiID') !== null && document.getElementById('checkAssiProjectID') !== null) {
         var projectID = document.getElementById('checkAssiProjectID').value;
         var assiID = document.getElementById('checkAssiID').value;
     }
     var refOfProject = firebase.database().ref('projects/' + projectID);
     refOfProject.on('value', function(snapshot) {
         console.log(snapshot.val());
         if (snapshot.hasChild(assiID)) {
             alert("Yes, Assignment with this ID is present");
         } else {
             alert("No, Assignment present with this ID");
         }
     });
 }
 //*******************************************************************-- DATABASE --******************************************************************/
 /*
  var ref = firebase.database().ref().child('projects').child('project_0001').orderByChild("Roll_no");
  ref.on('value', function(snapshot) {
      console.log(snapshot.val());
  });



  //Getting the element of HTML
  var preObject = document.getElementById('object');
  var ulList1 = document.getElementById('list1'); //Not accessible inside any function.
  //Creating reference of database
  */
 const dbRefProjects = firebase.database().ref().child('projects');
 const dbRefList1 = dbRefProjects.child('project_0001');
 const dbRefList2 = dbRefProjects.child('project_0003');


 //Sync data in real time -> by 'on' method, 'snap' is snapshot of your data, so you nedd to call .val to get only value.
 //  Just displaying the whole data..
 dbRefProjects.on('value', snap => {
     if (document.getElementById('box') !== null) {
         document.getElementById('box').innerText = JSON.stringify(snap.val(), null, 3);
     } else {
         console.log("There is an error in showing you complete data");
     }
 });


 var ref = firebase.database().ref().child("projects");
 ref.on('value', function(snapshot) {
     // for making div's 
     // here I am getting project list.
     for (var i = 0; i < snapshot.numChildren(); i++) {
         var myDiv = document.createElement('div');
         myDiv.innerText = "Assignments of Project " + (i + 1) + "\n\n";
         myDiv.id = "projectBox" + (i + 1);
         myDiv.style.textAlign = "center";
         myDiv.className = "jumbotron";
         document.body.appendChild(myDiv);
     }

     // ------------------displaying data (not sorted)
     var i = 1;
     snapshot.forEach(function(childSnapshot) {
         console.log(childSnapshot.val());
         var Value = childSnapshot.val();
         document.getElementById('projectBox' + i).innerText += "Project Key : " + childSnapshot.key + "\n\n";
         document.getElementById('projectBox' + i).innerText += JSON.stringify(Value, null, 3);
         i++;
     });

     // ----------------------- Sorting  data, displaying on console
     var ref = firebase.database().ref('projects/');
     ref.once('value', function(snapshot) {
         var j = 1;
         snapshot.forEach(function(childSnapshot) {
             //    console.log(snapshot.key); //projects
             //    console.log(childSnapshot.key); // project_0001
             console.log("\n------------------------\n\n" + childSnapshot.key + "\n\n-------------------\n"); // project_0001
             // make reference here
             var refForAssi = firebase.database().ref('projects/' + childSnapshot.key).orderByChild("Roll_no");
             refForAssi.once('value', function(snapshot) {
                 snapshot.forEach(function(item) {
                     console.log(JSON.stringify(item.val()));
                 });
             });
         });
     });
     /*
     var refExtra = firebase.database().ref().child('projects').child('project_0001').orderByChild("Roll_no");
     refExtra.once('value', function(snapshot) {
         snapshot.forEach(function(item) {
             console.log(JSON.stringify(item.val().Roll_no));
         });
     });
     */
 });

 // If anything happens in project 1

 /*
  // At firebase console if you do anything then by these functions, changes will be seen at HTML
  dbRefList1.on('child_added', snap => {
      var x = document.createElement('div');
      x.innerText = snap.val();
      if (document.getElementById('list1') !== 'undefined') {
          x.id = snap.key;
          document.getElementById('list1').appendChild(x);
      } else {
          console.log("There is a mistake in adding data to project 1");
      }

  });

  dbRefList1.on('child_changed', snap => {
      var x = document.getElementById(snap.key); //Important: dont put coloumn like this: 'snap.key' -> this will not work.
      console.log(x);
      if (document.getElementById(snap.key) !== 'null') {
          document.getElementById(snap.key).innerText = snap.val();
      } else {
          console.log("Updated child's key value is null");
      }
  });

  dbRefList1.on('child_removed', snap => {
      if (document.getElementById(snap.key) !== 'null') {
          document.getElementById(snap.key).remove();
      } else {
          console.log("Removed child's key value is null");
      }

  });
  */