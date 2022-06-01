const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numRight = 0;
// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const targetDivs=document.querySelectorAll(`div.${letter}`);
  for(const div of targetDivs){
    div.innerHTML=`${letter}`;
    numRight += 1;
  }
  if(numRight === document.querySelectorAll('.letter-box').length){
    const link = document.querySelector('#win');
    link.style.display='';
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  
  const image= document.querySelector('img')
  image.setAttribute('src',`/static/images/guess${numWrong}.png`)
  
  if(numWrong === 5){
    const buttons = document.querySelectorAll("button");
    for(const button of buttons){
      disableLetterButton(button);
    }
    const link = document.querySelector('#play-again');
    link.style.display='';
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const randomIndex = Math.floor(Math.random() * WORDS.length)
  const randomWord = WORDS[randomIndex]


  createDivsForChars(randomWord);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
   button.addEventListener('click', () => {
     const letter = button.innerHTML;
     disableLetterButton(button);
     if(isLetterInWord(letter)){
      handleCorrectGuess(letter);
     } else{
      handleWrongGuess(); 
     }
   });
  }

  document.querySelector('#play-again').addEventListener('click', resetGame);
  document.querySelector('#win').addEventListener('click', resetGame);

})();
