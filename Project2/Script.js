// get DOM Elements
const containor = document.querySelector('.containor');
const seats = document.querySelectorAll('.row .seat');
const total = document.getElementById('total');
const count = document.getElementById('count');
const selectmovie = document.getElementById('movie');

// Get the ticket price from the select movie
let ticketPrice = +selectmovie.value;

//Call the Update UI function - get data from the localstorage and update the UI
updateUI();

// Function to update count
function updateCount(){
    //calculate how many seats are selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //creating an array using node list
    const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat) );
    //Get the number of seats from nodelist
    const selectedSeatsCount = selectedSeats.length;
    //Update DOM with the count
    count.innerText = selectedSeatsCount;
    //Update DOM with the total price
    total.innerText = selectedSeatsCount*ticketPrice;
    localStorage.setItem('SelectedSeats',JSON.stringify(seatIndex));
};

//Function to save movie data in local storage
function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
};

//Function to get data from localstorage and update the UI
function updateUI() {
    //Get the selected seats from localstroage
    const selectedSeats = JSON.parse(localStorage.getItem('SelectedSeats')); 
 //   console.log(selectedSeats);
    //Check if there are any selected seats 
    if (selectedSeats !== null && selectedSeats.length > 0 ) {
        //Loop over all the seats in the threater
        seats.forEach ( (seat, index) => {
            //If the index of seat is contained inside selectedSeat array
            if (selectedSeats.indexOf(index) > -1 ) {
                seat.classList.add('selected');
            }    
        } )
    }

    //Get the selected movie from localstorage
    const movieIndex = localStorage.getItem('movieIndex');
    //Check if the a movie Index
    if (movieIndex !== null) {
        //Use the movieIndex from localstorage to update the movie from dropdown
        selectmovie.selectedIndex= movieIndex;
    }

    //Update the counts
    updateCount();

};

//Event Listners
//1. Listen for click on containor
containor.addEventListener('click', e =>{
    // check if target has  a class of seat and also is not occupied
   if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ) {
       //Add and Remove the seleceted class on click
    e.target.classList.toggle('selected');
    //update the count of selected seats
    updateCount();
   }
})

//2. Listen for change in movie selection
selectmovie.addEventListener('change', e => {
    //Update ticket price to the selected movie
    ticketPrice = e.target.value;
    //change the counts in DOM
    updateCount();   

    saveMovieData(e.target.selectedIndex, e.target.value); 
}
)