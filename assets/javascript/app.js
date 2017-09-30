$(document).ready(function () {

// Initialize Firebase
 var config = {
  apiKey: "AIzaSyAmzFi9GKoB7V6APAZr3goNsZnRGlaDCXA",
  authDomain: "maidenvoyage-9fa43.firebaseapp.com",
  databaseURL: "https://maidenvoyage-9fa43.firebaseio.com",
  projectId: "maidenvoyage-9fa43",
  storageBucket: "maidenvoyage-9fa43.appspot.com",
  messagingSenderId: "795370132163",
};

firebase.initializeApp(config);

var database = firebase.database();

//button for adding train name
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  //user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim(); 
  var trainTime = $("#time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  //local "temp"object for new train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainTime,
    frequency: trainFrequency,
  };

  //uploads train data to database
  database.ref().push(newTrain);

  //logs everythign to console
  console.log(newTrain.name);
  console.log(newTrain.destination);  
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  //alert
  alert("Train has been added to schedule")

  //clears all of the input boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

//firebase event to add train to database and a row in html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //store everything into a varibale
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  //train info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  //prettify the first train time
  var trainTimePretty = moment.unix(trainTime).format("HH:mm");

  
  //calculate the hours worked with math
  //calculate the hours worked
  var trainHours = moment().diff(moment.unix(trainTime, "X"), "hours");
  console.log(moment);
  console.log(trainHours);

  //calculate the total amount of trips (frequency)
  var trainTotal = trainHours * trainFrequency;
  console.log(trainTotal);

  //add each train's data into table
  $("tbody").append("<tr><td>" + trainName + "</tr><td>" + trainDestination + "</tr><td>" + 
    trainTimePretty + "</td><td>" + trainHours + "</td><td>" + 
    trainFrequency + "</td><td>" + trainTotal + "</td><tr>");


});
});

