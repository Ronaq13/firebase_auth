 var app = angular.module('app', ['firebase']);

 app.controller("displayCtrl", function($scope, $firebaseArray) {
     const rootRef = firebase.database().ref().child('projects');
     const refProject1 = rootRef.child('project_0001');
     const refProject2 = rootRef.child('project_0002');
     this.object1 = $firebaseArray(refProject1);
     this.object2 = $firebaseArray(refProject2);
 });

 app.controller("deleteProjectCtrl", ["$scope", "$firebaseArray",
     function($scope, $firebaseArray) {

         $scope.myDeleteFunc = function() {
             var ref = firebase.database().ref().child('projects');
             var projectArray = $firebaseArray(ref);
             projectArray.$remove(1);
         }

     }
 ]);