angular.module('app', ['firebase'])
    .controller('displayCtrl', displayfunc)



function displayfunc($scope, $firebaseArray) {
    const rootRef = firebase.database().ref().child('projects');
    const refProject1 = rootRef.child('project_0001');
    const refProject2 = rootRef.child('project_0002');
    this.object1 = $firebaseArray(refProject1);
    this.object2 = $firebaseArray(refProject2);
}