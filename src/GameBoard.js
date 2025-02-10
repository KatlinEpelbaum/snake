class GameBoard {
    constructor(width, height) {
        this.gameBoardDiv = document.getElementById('game-board');
        this.width = width;
        this.height = height;

        this.gameBoardDiv.style.gridTemplateColumns = `repeat(${this.width}, 12px)`;
        this.gameBoardDiv.style.gridTemplateRows = `repeat(${this.height}, 12px)`;
    }

    draw(snake, food) {
        this.gameBoardDiv.innerHTML = '';
    
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cellDiv = document.createElement('div');
    
                if (snake.includes(`${y}_${x}`)) {
                    cellDiv.innerText = '😼';
                }
    
                if (y === food.y && x === food.x) {
                    cellDiv.innerText = food.emoji;
                }
                
                this.gameBoardDiv.appendChild(cellDiv);
            }
        }
    }
}

export { GameBoard };