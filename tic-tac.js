"use strict";

// get the DOM elements for grid, message and radio buttons
const grid = document.getElementById('grid');
const message = document.querySelector('.message');
const chooser = document.querySelector('form');
// declare mark as player's chosen mark X or O
let mark;
// declare cells as cells of grid block
let cells;

/*
* setPlayer() to get mark value on radio button click
* set the text content for player to click on cell to start game
* calls buildGrid() function to create the grid and dissmiss the radio button selections
*/
function setPlayer() {
  mark = this.value;
  message.textContent = `You are ${mark}, click on a cell to make your move!`;
  chooser.classList.add('game-start');
  this.checked = false;
  buildGrid();
}

/*
* buildGrid() build the grid
*/
function buildGrid() {
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement('li');
    cell.id = 'c' + i;
    cell.addEventListener('click', playerMove, false);
    grid.appendChild(cell);
  }
  //Returns a NodeList
  cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
}


/*
* playerMove() to track player's move
* set the text content for player to click on cell to start game
* calls buildGrid() function to create the grid and dissmiss the radio button selections
*/

// add click listener to each cell
function playerMove() {
  if (this.textContent == '') {
    this.textContent = mark;
    checkRow();
    switchMark();
    computerMove();
  }
}

/*
* computerMove() tracks computer marks on a random empty cell
* lets computer make the next move
*/

function computerMove() {
  let emptyCells = [];
  let random;

  cells.forEach(function(cell){
    if (cell.textContent == '') {
      emptyCells.push(cell);
    }
  });

  random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = mark;
    checkRow();
    switchMark();
}

/*
* switchMark() switch player mark
*/
function switchMark() {
  if (mark == 'X') {
    mark = 'O';
  } else {
    mark = 'X';
  }
}

/**
* winner() determine the winner - compare the mark
* @param {number} a cell1 number
* @param {number} b cell1 number
* @param {number} c cell1 number
* removes the event listener after the winner is declared
*/

function winner(a, b, c) {
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    message.textContent = `${mark} is the winner!`;
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    preventCellClick();
    return true;
  } else {
    return false;
  }
}

/*
* checkRow() cell cell combinations to declare the winner
*/
function checkRow() {
  winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3'));
  winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'));
  winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'));
  winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'));
  winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'));
  winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'));
  winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'));
  winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

/*
prevents user to click on grid cells after the winner is declared
*/

function preventCellClick(){
  cells.forEach(function(cell){
    cell.removeEventListener('click', playerMove, false);
  });
}
/*
* resetGrid() clear the grid
*/
function resetGrid() {
  mark = 'X';
  cells.forEach(function(cell){
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  message.textContent = 'Choose your player';
  chooser.classList.remove('game-start');
  grid.innerHTML = '';
}

//stores player choice and add event listener on each cell based on player's mark
const players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice){
  choice.addEventListener('click', setPlayer, false);
});

// add event listener to reset button and call clear grid to start the game over again
const resetButton = chooser.querySelector('button');
resetButton.addEventListener('click', function(e) {
  e.preventDefault();
  resetGrid();
});
