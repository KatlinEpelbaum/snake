const gameBoardDiv = document.getElementById('game-board');

const height = 40;
const width = 40;
const speed = 100;
const food = ['🍖', '🍗', '🥩', '🐁', '🐀']

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 12px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${height}, 12px)`;

let snake = [`${Math.floor(height / 2)}_${Math.floor(width / 2)}`];
let direction = 'up';

let foodX, foodY, foodIndex

const intervalId = setInterval(run, speed);
run();

function run() {
    updateSnake();
    drawGameBoard();
    
}

document.addEventListener('keydown', e => {

    switch (e.key.toLocaleLowerCase()) {
        case 'arrowup':
        case 'w':
            direction = 'up'
            break;
        case 'arrowdown':
        case 's':
            direction = 'down'
            break;
        case 'arrowright':
        case 'd':
            direction = 'right'
            break;
        case 'arrowleft':
        case 'a':
            direction = 'left'
            break;
    }
})

function drawGameBoard() {
    gameBoardDiv.innerHTML = '';

    for (let y = 0; y < width; y++) { 
        for (let x = 0; x < height; x++) { 
            let cellDiv = document.createElement('div');

            if (snake.includes(`${x}_${y}`)) {
                cellDiv.innerHTML = '😼';
            }
            if (y == foodY && x == foodX) {
                cellDiv.innerText = food(random)
            }

            gameBoardDiv.appendChild(cellDiv);
        }
    }
}

function updateSnake() {
    let [x, y] = snake[0].split('_').map(Number);

    switch (direction) {
        case 'up':
            if ( y == 0){
                y = height -1
            }else{
                y--;
            }
            break;
        case 'down':
            if ( y == height -1){
                y = 0;
            } else {
                y++;
            }
            break;
        case 'left':
            if( x == 0){
                x = width -1
            } else{
            x--;
            }
            break;
        case 'right':
            if( x == width -1){
                x = 0
            } else {
            x++;
            }
            break;
    }

    snake.shift();
    snake.push(`${x}_${y}`);
}

function generateFood(){
    do{
        foodY = Math.floor(Math.random() * height)
        foodX = Math.floor(Math.random() * width)

    }while(snake.includes(`${foodY}_${foodX}`))
    foodIndex = Math.floor(Math.random() * food.length);
}
