/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

function createCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`; // template for how our <li> tags will be dynamically generated.
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */ 
 const deck = document.querySelector('.deck');
 
 function startGame() {
   const cardHTML = shuffle(cards).map(function(card) {
     return createCard(card);
   });
   
   deck.innerHTML = cardHTML.join('');
 }
 
startGame();

// reset Cards
// reset cards code reference:https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
function resetCards() {
  const deck = document.querySelector('.deck');
  
  const cards = shuffle(Array.from(document.querySelectorAll('.deck li')));
  deck.innerHTML = '';
  for(let card of cards) {
    deck.appendChild(card);
    card.classList.remove('open', 'show', 'match');
  }
}

// Game Timer
// game timer code reference: https://codepen.io/anon/pen/LojzVv?editors=0010 
const totalGameClock = document.querySelector('.time-counter');
let h = 0, m = 0, s = 0;

function gameClock() {
  s++;
  if(s >= 60) {
    s = 0;
    m++;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }
  
  totalGameClock.textContent = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${s > 9 ? s : "0" + s}`;
  
  setTimeout(gameClock, 1000);
}

gameClock(); // timer for how log the game is taking 

// Move Counter
// move counter code reference: https://github.com/ryanwaite28/udacity-memory-game/blob/master/js/app.js
const numMoves = document.querySelector('.moves');
let moves = 0;

function gameCounter() {
  moves++;
  numMoves.innerText = moves;
}

// star rating 
// star rating code reference: https://codepen.io/anon/pen/LojzVv?editors=0010
const scoreBoard = document.querySelector('.stars');

function score() {
  if(moves === 20) {
    scoreBoard.firstElementChild.outerHTML = " ";
  } if(moves === 30) {
    scoreBoard.firstElementChild.outerHTML = " ";
  } if (moves > 40) {
    scoreBoard.innerHTML = `<li><i>No Stars</i></li>`;
  }
}

console.log(scoreBoard.length);

// Congratulation message window when the game has ended
// congrats window code reference: https://codepen.io/anon/pen/LojzVv?editors=0010
function congrats() {
  if(document.querySelectorAll('.match').length === 16) {
    window.alert('CONGRATULATIONS.\n' + `You complete the game in: ${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${s > 9 ? s : "0" + s}` + ` with: ${moves} moves ` + 'and a star rating of: ' + scoreBoard.length + (scoreBoard.length === 1 ? " star" : " stars") + '\n Play again?');
    gameClock=false;
    resetGame();
  }
}

// reset memory game:
// reset code reference: https://matthewcranford.com/memory-game-walkthrough-part-8-putting-it-all-together/
const restartGame = document.querySelector('.fa-repeat');

function resetGame() {
  //reset the Timer
  h = 0;
  m = 0;
  s = 0;
  
  document.querySelector('.time-counter').textContent = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${s > 9 ? s : "0" + s}`;
  
  //reset the star rating
  document.querySelector('.stars').innerHTML = `<li><i class="fa fa-star"></i></li>` + `<li><i class="fa fa-star"></i></li>` + `<li><i class="fa fa-star"></i></li>`;
  
  // reset the move counter
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
  
  // reset deck and create new cards
  //clearCards()
  resetCards();
  
}

document.querySelector('.restart').addEventListener('click', resetGame)
  
// Game logic for opening and matching cards
const cardDeck = document.querySelectorAll('.card');
let displayCard = [];

cardDeck.forEach(function(card) {
  card.addEventListener('click', function(e) {
    gameCounter(); // initiating the game counter
    score(); // initiating the star rating
    
    if (!card.classList.contains('open') && !card.classList.contains('show')) {
      displayCard.push(card);
      card.classList.add('open', 'show');
      console.log(displayCard);
      
      //if two cards don't match they go away.
      if(displayCard.length === 2) {
        //if cards do match then show them here
        if(displayCard[0].dataset.card === displayCard[1].dataset.card) {
          displayCard[0].classList.add('match');
          displayCard[0].classList.add('open');
          displayCard[0].classList.add('show');
          
          displayCard[1].classList.add('match');
          displayCard[1].classList.add('open');
          displayCard[1].classList.add('show');
          
          displayCard = [];
          congrats(); // end of game Congratulation message and player performance.
        }else {
          //if cards don't match hide cards
          setTimeout (function() {
            displayCard.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            
            displayCard = [];
          }, 700);
        }
      }
    }
  });
});