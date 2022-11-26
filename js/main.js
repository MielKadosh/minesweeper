'use strict'

var gBoard

const BOMB = '💣'

const FLAG = '🚩'

const HEART = '<div>♥️</div>'

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var cell = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 5,
    MINES: 4
}


var bombAmount = gLevel.MINES
var count = 0
var flags = 0
var intervalRef = null;
var lifeLeft = 3
const flagsLeft = document.querySelector('#flags-left')


function renderLives() {
    var str = ''
    for (let i = 0; i < lifeLeft; i++) {
        str += HEART
    }
    document.querySelector('.lives').innerHTML = str
}


function setRandMines() {
    for (let i = 0; i < gLevel.MINES; i++) {
        const cell = gBoard[getRandomInt(0, gLevel.SIZE)][getRandomInt(0, gLevel.SIZE)]
        cell.isMine = true
        //TODO: handle rolling the same number twice
    }
}


function initGame() {
    document.querySelector('.emoji-btn').innerHTML = '🙂'
    lifeLeft = 3
    count = 0
    flags = gLevel.MINES
    renderLives()
    const timer = document.querySelector('#timer')
    timer.innerHTML = '0'
    flagsLeft.innerHTML = flags
    gBoard = createBoard()
    setRandMines()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}
window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault();
    startTime()
    const [, i, j] = ev.target.id.split('-')
    if (!i || !j) {
        return
    }
    debugger
    const cell = gBoard[i][j]
    if (!cell.isMarked && flags === 0) {
        return
    }
    if (cell.isMarked) {
        flags = flags + 1
    } else {
        flags = flags - 1
    }
    flagsLeft.innerHTML = flags
    cell.isMarked = !cell.isMarked
    renderBoard(gBoard)
    return false;
}, false);


function levelEasy() {
    gLevel.SIZE = 5,
        gLevel.MINES = 4
    gameOver()
    initGame()
}

function levelMedium() {
    gLevel.SIZE = 10,
        gLevel.MINES = 9
    gameOver()
    initGame()
}

function levelHard() {
    gLevel.SIZE = 15,
        gLevel.MINES = 14
    gameOver()
    initGame()
}

function createBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = createCell()
        }
        console.table('board:', board)
    }
    return board
}

function createCell() {
    const cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell
}


function renderBoard() {
    var strHTML = '<table class="table">'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gLevel.SIZE; j++) {
            const currCell = gBoard[i][j]
            var cellClass = getClassName({ i: i, j: j })
            if (currCell.type === cell) cellClass += ' cell'

            strHTML += `\t<td id="${cellClass}" class="cell ${cellClass}"  onclick="moveTo(${i},${j})" > ${renderCell(i, j)} </td>\n`
        }
        strHTML += '\t</tr>\n'

    }
    strHTML += '</ table>'
    const elBoard = document.querySelector('.grid')
    elBoard.innerHTML = strHTML
    checkWin()
}


function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            const currCell = board[i][j]
            currCell.minesAroundCount = countNeighbors(i, j, board)
        }
    }
}

function renderCell(i, j) {
    const cell = gBoard[i][j]
    var display = ''
    if (cell.isShown) {
        display = cell.minesAroundCount
    }
    if (cell.isShown && cell.isMine) {
        display = BOMB
    } if (cell.isMarked) {
        display = FLAG
    }
    return `<div class="inner-cell" id= "cell-${i}-${j}" onclick='cellClicked(${i},${j})'></button>${display}</div>`
}


function cellClicked(i, j) {
    document
    startTime()
    const cell = gBoard[i][j]

    cell.isShown = true
    if (cell.isMine) {
        lifeLeft--
        renderLives()
    }
    if (cell.isMine && lifeLeft === 0) {
        gameOver()
        return
    }
    if (cell.minesAroundCount === 0) {
        showNeighbors(i, j)
    }
    renderBoard(gBoard)
}


function cellMarked(elCell) {

}


function countNeighbors(cellI, cellJ, board) {
    var neighborsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue

            if (board[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}


function gameOver() {
    clearInterval(intervalRef)
    gameInProgress = false
    timer.innerHTML = 'END'
    document.querySelector('.emoji-btn').innerHTML = '😵'
    document.querySelector('.grid').innerHTML = `<div class="game-over">
    <h1>game over!</h1>
    <button onclick='initGame()'>restart</button>
    </div>`
    gGame.isOn = false
}


function checkWin() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = gBoard[i][j]
            debugger
            if (!cell.isShown && !cell.isMarked) {
                return
            }
            if (cell.isMarked && cell.isMine === false) {
                return
            }
        }

    }
    win()
}


function win() {
    clearInterval(intervalRef)
    timer.innerHTML = 'WIN'
    gameInProgress = false
    document.querySelector('.emoji-btn').innerHTML = '😎'
    document.querySelector('.grid').innerHTML = `<div class="game-over">
    <h1>YOU WIN!</h1>
    <button onclick='initGame()'>restart</button>
    </div>`
}


function showNeighbors(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue

            gBoard[i][j].isShown = true
        }
    }

}


let gameInProgress

let startTime = function () {
    if (gameInProgress) {
        return
    }
    if (intervalRef) {
        clearInterval(intervalRef)
    }
    intervalRef = setInterval(() => {
        count += 10;
        let s = Math.floor((count / 1000));
        timer.innerHTML = s
    }, 10);
    removeEventListener('click', startTime);
}


