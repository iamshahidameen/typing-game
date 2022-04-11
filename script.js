const 
word = document.getElementById('word'),
text = document.getElementById('text'),
scoreEl = document.getElementById('score'),
timeEl = document.getElementById('time'),
endgameEl = document.getElementById('end-game-container'),
settingsBtn = document.getElementById('settings-btn'),
settings = document.getElementById('settings'),
settingsForm = document.getElementById('settings-form'),
difficultySelect = document.getElementById('difficulty')

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

// Focus on Input Field
text.focus();

//  Start Countdown

const timeInterval = setInterval(updateTime, 1000)

// Init Word

let randomWord;

//  Init Score

let score = 0;

//  Init Time

let time =10;

// Set difficulty to value in local storage or medium;

let difficulty = localStorage.getItem('difficulty') != null ? 'difficulty' : 'medium';

// Set Difficulty set value on reload

difficultySelect.value = localStorage.getItem('difficulty') != null ? 'difficulty' : 'medium';

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
addWordToDOM();


// Event Listener for text field

text.addEventListener('input', e => {
    
    if(randomWord == e.target.value){
        addWordToDOM();

        //  Score Added/Incremented into DOM

        score++;
        scoreEl.innerText = score;

        //Seetings the game difficulty time

        if( difficulty === 'hard'){
            time +=2;
        } else if(difficulty === 'medium'){
            time += 3;
        } else {
            time += 5;
        }

         timeEl.innerText = time;
        //  Clear the input
        e.target.value = '';
    }
})

//  Game Over

function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time Ran Out</h1>
        <p>Your Final Score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    console.log(time)
    if(time <= 0) {
        clearInterval(timeInterval);

        // End Game
        gameOver();
    }
}
//  Toggle Difficulty Changer

settingsBtn.addEventListener('click', e => {
    settings.classList.toggle('hide');
})

// Select Settings

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})