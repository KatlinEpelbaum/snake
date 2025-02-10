import { Food } from "./src/Food.js";
import { GameBoard } from "./src/GameBoard.js";
import { Snake } from "./src/Snake.js";
import { Game } from "./src/Game.js";

const throughWallsInput = document.getElementById('through-walls');
const speedUpInput = document.getElementById('speed-up');

const height = 25;
const width = 70;
const acceleration = 1;
const foodEmojis = ['🥩', '🍗', '🍖', '🐀', '🐁'];

let throughWalls = Number(localStorage.getItem('snakeThroughWalls') ?? 0);
throughWallsInput.checked = !!throughWalls;

let speedUp = Number(localStorage.getItem('snakeSpeedUp') ?? 0);
speedUpInput.checked = !!speedUp;

const gameBoard = new GameBoard(width, height);
const snake = new Snake(gameBoard);
const food = new Food(foodEmojis);

const game = new Game(gameBoard, snake, food, throughWalls, acceleration);

throughWallsInput.addEventListener('change', () => {
    throughWalls = !throughWalls ? 1 : 0;
    localStorage.setItem('snakeThroughWalls', throughWalls);
    game.throughWalls = throughWalls;
});

speedUpInput.addEventListener('change', () => {
    speedUp = !speedUp ? 1 : 0;
    localStorage.setItem('snakeSpeedUp', speedUp);
});