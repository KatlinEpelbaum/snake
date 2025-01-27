const gameBoardDiv = document.getElementById('game-board');

const height = 40;
const width = 40;
const speed = 200;

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 8px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${height}, 8px)`;

let snake = [`${Math.floor(width / 2)}_${Math.floor(height / 2)}`];
let direction = 'up';

const intervalId = setInterval(run, speed);
run();

function run() {
    updateSnake();
    drawGameBoard();
}

function drawGameBoard() {
    gameBoardDiv.innerHTML = '';

    for (let y = 0; y < width; y++) { 
        for (let x = 0; x < height; x++) { 
            let cellDiv = document.createElement('div');

            if (snake.includes(`${x}_${y}`)) {
                cellDiv.style.backgroundColor = 'red';
            }

            gameBoardDiv.appendChild(cellDiv);
        }
    }
}

function updateSnake() {
    let [x, y] = snake[0].split('_').map(Number);

    switch (direction) {
        case 'up':
            y--;
            break;
        case 'down':
            y++;
            break;
        case 'left':
            x--;
            break;
        case 'right':
            x++;
            break;
    }

    snake.shift();
    snake.push(`${x}_${y}`);
}
