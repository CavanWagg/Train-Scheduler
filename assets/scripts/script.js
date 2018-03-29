$(document).ready(function() {
//initialize Firebase 
const config = {
  apiKey: "AIzaSyDGh6gdhQ3bHiH0eAh6hAnDZb05L7PjYSQ",
  authDomain: "train-schedule-7d7f0.firebaseapp.com",
  databaseURL: "https://train-schedule-7d7f0.firebaseio.com",
  projectId: "train-schedule-7d7f0",
  storageBucket: "",
  messagingSenderId: "326540053992"
};
firebase.initializeApp(config);

let database = firebase.database();

//Button for adding Trains

$("#add-train-btn").on("click", function(event) {
  
  event.preventDefault();

//grab user input
let trainName = $('#train-name-input').val().trim()
let destination = $('#destination-input').val().trim()
let firstTrainTime = $('#train-time-input').val().trim()
let frequency = $('#frequency-input').val().trim()

// create local 'temp' object for holding employee data
let newTrain = {
  name: trainName,
  place: destination,
  start: firstTrainTime,
  frequency: frequency
};

//upload train data to the database 
database.ref().push(newTrain);

//log to console 
// console.log(newTrain.name);
// console.log(newTrain.place);
// console.log(newTrain.start);
// console.log(newTrain.frequency);

//Clear text boxes
$('#train-name-input').val("");
$('#destination-input').val("");
$('#train-time-input').val("");
$('#frequency-input').val("");

});

// Firebase event for adding trains to database and row in html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  //store snapshots in a variable

  let trainName = childSnapshot.val().name
  let destination = childSnapshot.val().place
  let firstTrainTime = childSnapshot.val().start
  let frequency = childSnapshot.val().frequency

  //employee info
  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTrainTime);
  // console.log(frequency);

  //change the employee time
  // let trainTimePretty = moment.unix(firstTrainTime).format("HH:mm");
  // console.log(trainTimePretty);

  //current time
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("HH:mm"));

  //calculate Next Arrival
  

  //Calculate Minutes Away
  // let minutesAway =
  //Add each train's data into the table
  // $('#train-table > tbody').append(`<tr><td> ${trainName} </td><td> ${destination} </td><td>
  // ${trainTimePretty} </td><td> ${nextArrival} </td><td> ${minutesAway} + </td></tr>`);

});



})

