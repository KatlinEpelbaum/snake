import { Food } from "./src/Food.js";
import { GameBoard } from "./src/GameBoard.js";

const messageDiv = document.getElementById('message');
const resetGameBtn = document.getElementById('reset-game');
const currentScoreSpan = document.getElementById('current-score');
const highScoreSpan = document.getElementById('high-score');
const throughWallsInput = document.getElementById('through-walls');
const speedUpInput = document.getElementById('speed-up');

const height = 25;
const width = 70;
let speed = 200;
const acceleration = 1;
const foodEmojis = ['🥩', '🍗', '🍖', '🐀', '🐁'];


let snake, direction, score, highScore, intervalId, throughWalls, speedUp;

const gameBoard = new GameBoard(width, height);
const food = new Food(foodEmojis);

initOptions();
initGame();

function initGame () {
    snake = [Math.floor(height / 2) + '_' + Math.floor(width / 2)];
    direction = 'up';
    speed = 200;

    highScore = localStorage.getItem('snakeHighScore') ?? 0;
    highScoreSpan.innerText = highScore;

    score = 0;
    currentScoreSpan.innerText = score;

    food.generate(width,height, snake);

    messageDiv.innerText = '';
    resetGameBtn.classList.add('hidden');

    intervalId = setInterval(run, speed);
}

function initOptions () {
    throughWalls = Number(localStorage.getItem('snakeThroughWalls') ?? 0);
    throughWallsInput.checked = !!throughWalls;
    
    speedUp = Number(localStorage.getItem('snakeSpeedUp') ?? 0);
    speedUpInput.checked = !!speedUp;
    
    throughWallsInput.addEventListener('change', () => {
        throughWalls = !throughWalls ? 1 : 0;
        localStorage.setItem('snakeThroughWalls', throughWalls);
    });
    
    speedUpInput.addEventListener('change', () => {
        speedUp = !speedUp ? 1 : 0;
        localStorage.setItem('snakeSpeedUp', speedUp);
    });
}

function run () {
    clearInterval(intervalId);
    updateSnake();
    gameBoard.draw(snake, food);

    if (isGameOver()) {
        stopGame();
    } else {
        intervalId = setInterval(run, speed);
    }
}

document.addEventListener('keydown', e => {
    switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
            direction = 'up';
            break;
        case 'arrowdown':
        case 's':
            direction = 'down';
            break;
        case 'arrowleft':
        case 'a':
            direction = 'left';
            break;
        case 'arrowright':
        case 'd':
            direction = 'right';
            break;
    }
});

resetGameBtn.addEventListener('click', () => initGame());

function updateSnake () {
    let [y, x] = snake[0].split('_');

    switch (direction) {
        case 'up':
            if (y == 0) {
                if (throughWalls) {
                    y = height - 1;
                } else {
                    stopGame();
                }
            } else {
                y--;
            }
            break;
        case 'down':
            if (y == height - 1) {
                if (throughWalls) {
                    y = 0;
                } else {
                    stopGame();
                }
            } else {
                y++;
            }
            break;
        case 'left':
            if (x == 0) {
                if (throughWalls) {
                    x = width - 1;
                } else {
                    stopGame();
                }
            } else {
                x--;
            }
            break;
        case 'right':
            if (x == width - 1) {
                if (throughWalls) {
                    x = 0;
                } else {
                    stopGame();
                }
            } else {
                x++;
            }
            break;
    }

    snake.unshift(`${y}_${x}`);

    if (y == food.y && x == food.x) {
        score++;
        currentScoreSpan.innerText = score;

        if (score % acceleration == 0) {
            speed -= 5;
        }

        food.generate(width,height, snake);
    
    } else {
        snake.pop();
    }
}

function isGameOver () {
    if (snake.slice(1).includes(snake[0])) {
        return true;
    }

    return false;
}

function stopGame () {
    clearInterval(intervalId);
    messageDiv.innerText = 'The game is over!';
    resetGameBtn.classList.remove('hidden');

    if (score > highScore) {
        localStorage.setItem('snakeHighScore', score);
    }
}
