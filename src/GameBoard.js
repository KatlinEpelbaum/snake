class GameBoard {
    
    gameBoardDiv = document.getElementById('game-board');
    width = 20;
    height = 20;

    constructor () {

        this.gameBoardDiv.style.gridTemplateColumns = `repeat(${this.width}, 24px)`;
        this.gameBoardDiv.style.gridTemplateRows = `repeat(${this.height}, 24px)`;
    
    }

    draw ( snake, food ) {

        this.gameBoardDiv.innerHTML = '';
        
        for ( let y = 0; y < this.height; y++ ) {
        
            for ( let x = 0; x < this.width; x++ ) {
        
                const cellDiv = document.createElement('div');
        
                if ( snake.coordinates.includes(`${y}_${x}`) ) {
                    cellDiv.innerText = '😼';
                }
    
                if ( y == food.y && x == food.x ) {
                    cellDiv.innerText = food.emoji;
                }
                
                this.gameBoardDiv.appendChild(cellDiv);
        
            }
        
        }
        
    }

}

export { GameBoard }