'use strict'


var gBoard

const BOMB = '💣'

const FLAG = '🚩'



gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

cell = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

gLevel = {
    SIZE: 4,
    MINES: 2
}



// This is called when page loads 
function initGame() {
    const gBoard = createBoard()
    renderBoard()

}

// Builds the board 
// Set mines at random locations
// Call setMinesNegsCount()
// Return the created board
function createBoard() {
    const board = []
    for(var i = 0; i < gLevel.SIZE; i++){
        board[i] = []
        for(var j = 0; j < gLevel.SIZE; j++){
            board[i][j] = createCell()
        }
    }
    return board
}


function createCell() {
    const cell = {
        minesAroundCount: 4,
        isShown: false,
        isMine: false,
        isMarked: true
    }
    return cell
}



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            strHTML += `<td data-i="${i}" data-j="${j}" onclick="onCellClicked(this, ${i}, ${j})" class="${className} ">${cell}</td>`
        }
        strHTML += '</tr>'

    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}




// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {

}

// Called on right click to mark a 
// cell (suspected to be a mine)
// Search the web (and implement) how to 
// hide the context menu on right click
function cellMarked(elCell) {

}


// Count mines around each cell 
// and set the cell's minesAroundCount
function setMinesNegsCount(board) {

}

// Game ends when all mines are 
// marked, and all the other cells are shown
function checkGameOver() {

}

// When user clicks a cell with no 
// mines around, we need to open 
// not only that cell, but also its 
// neighbors. 
// NOTE: start with a basic 
// implementation that only opens 
// the non-mine 1st degree 
// neighbors
// BONUS: if you have the time 
// later, try to work more like the 
// real algorithm (see description 
// at the Bonuses section below)

function expandShown(board, elCell, i, j)
