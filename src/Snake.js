class Snake {

    coordinates;

    constructor ( gameBoard ) {
        this.init(gameBoard);        
    }

    init ( gameBoard ) {
        this.coordinates = [Math.floor(gameBoard.height / 2) + '_' + Math.floor(gameBoard.width / 2)];
    }

    update ( game, gameBoard, food, options ) {
    
        let [y, x] = this.coordinates[0].split('_');
    
        switch ( game.direction ) {
            case 'up':
                if ( y == 0 ) {
                    if ( options.throughWalls ) {
                        y = gameBoard.height - 1;
                    } else {
                        game.stop();
                    }
                } else {
                    y--;
                }
                break;
            case 'down':
                if ( y == gameBoard.height - 1 ) {
                    if ( options.throughWalls ) {
                        y = 0;
                    } else {
                        game.stop();
                    }
                } else {
                    y++;
                }
                break;
            case 'left':
                if ( x == 0 ) {
                    if ( options.throughWalls ) {
                        x = gameBoard.width - 1;
                    } else {
                        game.stop();
                    }
                } else {
                    x--;
                }
                break;
            case 'right':
                if ( x == gameBoard.width - 1 ) {
                    if ( options.throughWalls ) {
                        x = 0;
                    } else {
                        game.stop();
                    }
                } else {
                    x++;
                }
                break;
        }
    
        this.coordinates.unshift(`${y}_${x}`);
        
        if ( y == food.y && x == food.x ) {
    
            game.updateScore(); 
            food.generate(gameBoard, this.coordinates);
    
        } else {
            this.coordinates.pop();
        }
    
    }
    
}

export { Snake }