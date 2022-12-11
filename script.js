'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const modalPara = document.getElementById('modalPara');
const modalClose = document.getElementById('modalClose');
const instructions = document.getElementById('instructions');

let target = 100;
document.getElementById('startGame').addEventListener('click',function(){
  target = parseInt(document.getElementById('target').value ) || 100;
  document.querySelector('main').classList.remove('hidden');
  document.getElementById('initial').style.display = 'none';
  document.getElementById('name--0').textContent = 
    document.getElementById('player1name').value || 'Player 1';
  document.getElementById('name--1').textContent = 
    document.getElementById('player2name').value || 'Player 2';
  document.getElementById('targetShow').textContent = 'Target '+target;
})

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= target) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//Modal Logic
document.getElementById('homePage').onclick = ()=> window.location.reload();

document.getElementById('aboutPage').onclick = function(){
  modalPara.innerHTML = `The Pig Game
  <br> by Rahul Vishwakarma
  <br> Open To Play
  <br> Contact for any valuable suggestion or feedback at
  <br> Email: vishwakarma.rahul77@gmail.com
  <br> Phone : 8779201698
  `
  overlay.classList.remove('hidden');
}
instructions.onclick = function(){
  modalPara.innerHTML = `Pig Game is simple 2 player
  <br> Dice based game. First Set-up a target. The Player who reach first 
  <br> to target will be winner.
  <br> You can roll as many times as you wish. Hold The score will add current sum
  <br> to Overall sum of player and shift the turn.
  <br> if will roll 1 turn will shifted and current sum will lost.
  `
  overlay.classList.remove('hidden');
}
overlay.onclick = closeModal;
modal.onclick = (e)=> e.stopPropagation();
modalClose.onclick = closeModal;
function closeModal(){
  overlay.classList.add('hidden');
}

