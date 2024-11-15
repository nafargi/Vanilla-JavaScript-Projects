const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [];
async function names(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    data.forEach(element => {
        words.push({name : element.address.city});
    });  
}
names();
let difficulty = localStorage.getItem('difficulty') !== null 
                ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = localStorage.getItem('difficulty') !== null
                         ? localStorage.getItem('difficulty') : 'medium';
text.focus();
let score = 0;
let time = 25;
let  timeInterval;

async function getRandomWord(){
    if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWord = words[randomIndex].name;
        return randomWord;
    } else {
        await names(); 
        return getRandomWord();
    }

}
async function addWordToDOM(){
    word.innerHTML = await getRandomWord();
}
addWordToDOM();
function updateScore(){
   score++;
   scoreEl.innerHTML = score;
}
function gameOver(){
    endgameEl.innerHTML =`
    <h1>Loerm ipsm</h1>
    <p>your score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`
    endgameEl.style.display = 'flex';
}
function updateTime(){
    time--;
    timeEl.innerHTML = time;
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    timeInterval = setInterval(updateTime,1000)
   if(insertedText === randomWord){
      addWordToDOM();
      updateScore();
      text.value = '';
      updateTime();
  
      if(difficulty === 'easy'){
            time += 5;
      }else if(difficulty === 'medium'){
          time += 3;
      }else{
            time += 2;
      }

   }
});
settingsBtn.addEventListener('click',() =>settings.classList.toggle('hide'));
difficultySelect.addEventListener('change', e =>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
});
