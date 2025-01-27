const gameBoardDiv = document.getElementById('game-board');

const height = 40;
const width = 40;

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 8px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${height}, 8px)`;

let snake = [Math.floor(width / 2)+ '_' + Math.floor(height / 2)];

drawGameBoard();

function drawGameBoard(){

    for (let y = 0; y < width; y++) { 
        for (let x = 0; x < height; x++) {
            let cellDiv = document.createElement('div');

            if( snake.includes(`${y}_${x}`)){
                cellDiv.style.backgroundColor = 'red';
            }

            gameBoardDiv.appendChild(cellDiv);
        }
    }
}

