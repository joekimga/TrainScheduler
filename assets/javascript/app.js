

// Initialize Firebase
 var config = {
  apiKey: "AIzaSyAmzFi9GKoB7V6APAZr3goNsZnRGlaDCXA",
  authDomain: "maidenvoyage-9fa43.firebaseapp.com",
  databaseURL: "https://maidenvoyage-9fa43.firebaseio.com",
  projectId: "maidenvoyage-9fa43",
  storageBucket: "maidenvoyage-9fa43.appspot.com",
  messagingSenderId: "795370132163"
};

firebase.initializeApp(config);

var database = firebase.database();

//button for adding train name
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  //user input
  var trainName = $("$train-name-input").val().trim();
  var trainDestination = $("#Destination-input").val().trim(); 
  var trainTime = $("#Time-input").val().trim();
  var trainFrequency = $("#Frequency-input").val().trim();

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
  