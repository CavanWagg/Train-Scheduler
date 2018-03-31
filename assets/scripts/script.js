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

const database = firebase.database();

//Button for adding Trains

$("#add-train-btn").on("click", function(event) {
  
  event.preventDefault();

//grab user input
const trainName = $('#train-name-input').val().trim()
const destination = $('#destination-input').val().trim()
//set back a year to make sure train time is behind current time, set to military time,
const firstTrainTime = moment($('#train-time-input').val().trim(), "HH:mm").format();
// console.log(firstTrainTime);
const frequency = $('#frequency-input').val().trim()

// create local 'temp' object for holding employee data
const newTrain = {
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

  const trainName = childSnapshot.val().name
  const destination = childSnapshot.val().place
  const firstTrainTime = childSnapshot.val().start
  const frequency = childSnapshot.val().frequency

  //employee info
  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTrainTime);
  // console.log(frequency);

 //convert first time back a year so it is always before current time
 const firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
 

 //current time
 const currentTime = moment();

 //difference between current time and first time (in minutes);
 const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//  console.log(`diff in time: ${diffTime}`);

//time apart (remainder)
  const timeRemaining = diffTime % frequency
  // console.log(`time remaining: ${timeRemaining}`);
  

  //Calculate Minutes Away
  const minutesAway = frequency - timeRemaining;
  // console.log(`train is ${minutesAway} minutes away`)

  //Next train arrival
  var nextArrival = moment().add(minutesAway, "minutes");
  var nextArrivalFormat = moment(nextArrival).format("HH:mm")
  // console.log(`next train arrival is at ${nextArrivalFormat}`);

  //Append each train's data into the table
  $('#train-table > tbody').append(`<tr><td> ${trainName} </td><td> ${destination} </td><td>
  ${frequency} </td><td> ${nextArrivalFormat} </td><td> ${minutesAway} </td></tr>`);


  //remove train data from database and from page
  $('#clear-train').click(function() {
    database.ref().remove();
    $('#train-table > tbody').empty();
  });

});



})

