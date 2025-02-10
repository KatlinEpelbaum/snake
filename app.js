import { Food } from "./src/Food.js";
import { GameBoard } from "./src/GameBoard.js";
import { Snake } from "./src/Snake.js";
import { Game } from "./src/Game.js";
import { initOptions } from "./src/Options.js"

const height = 25;
const width = 70;
const acceleration = 1;
const foodEmojis = ['🥩', '🍗', '🍖', '🐀', '🐁'];

const gameBoard = new GameBoard(width, height);
const snake = new Snake(gameBoard);
const food = new Food(foodEmojis);
const initOptions = new initOptions();

const game = new Game(gameBoard, snake, food, throughWalls, acceleration);
