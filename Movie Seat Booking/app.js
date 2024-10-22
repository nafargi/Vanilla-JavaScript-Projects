const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const text = document.querySelector('.text');
const text2 = document.querySelector('.text2');
const occupiedSeat = document.querySelectorAll('.occupied');
populateUI();

let ticketPrice = +movieSelect.value;
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updatePrice(){
   const selectedSeats = document.querySelectorAll('.row .seat.selected');
   const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

   let selectedSeatsCount = selectedSeats.length;
   count.innerText = selectedSeatsCount;
   total.innerText = count.innerText * ticketPrice;

   setMovieData(movieSelect.selectedIndex, movieSelect.value);  
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
  
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  
    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }

function occupiedSeats(){
    text2.style.display ='block';
    const selectedSeats = document.querySelectorAll('.seat.border');
    let selectedSeatsCount = selectedSeats.length;
    let html = `<p class="text" >You have selected 
    <span id="reservedCounter">0</span> occupied seat.</p>`;
    
   
    divText= html;
    console.log(divText);
    text2.innerHTML = divText;
    text2.style.display ='none';

    const reservedCounter = document.getElementById('reservedCounter');
    reservedCounter.innerText = selectedSeatsCount; 

    if(reservedCounter.innerText > 0){
        text2.style.display ='block';
      updatePrice();
    }
}

movieSelect.addEventListener('change', (e) => {
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  }
);

container.addEventListener('click',e =>{
    if(e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        text.style.display = 'block';
        updatePrice();
    }else{
        e.target.classList.toggle('border');
        occupiedSeats();
      }
   
});

updatePrice();

