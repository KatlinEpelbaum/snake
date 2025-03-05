import { Game } from "./src/Game.js";
import { GameBoard } from "./src/GameBoard.js";
import { Snake } from "./src/Snake.js";
import { Food } from "./src/Food.js";
import { Options } from "./src/Options.js";

const options = new Options();
const gameBoard = new GameBoard();
const snake = new Snake(gameBoard);
const food = new Food();

new Game(gameBoard, snake, food, options);