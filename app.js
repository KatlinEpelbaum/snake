const gameBoardDiv = document.getElementById('game-board');

const height = 40;
const width = 40;

gameBoardDiv.style.gridTemplateColumns = `repeat(${width}, 8px)`;
gameBoardDiv.style.gridTemplateRows = `repeat(${height}, 8px)`;

for (let y = 0; y < height; y++) { 
    for (let x = 0; x < width; x++) {
        const cellDiv = document.createElement('div');
        gameBoardDiv.appendChild(cellDiv);
    }
}
