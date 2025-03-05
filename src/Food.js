class Food {
    
    y;
    x;
    emoji;
    
    generate ( gameBoard, snakeCoordinates ) {
        
        const emojis =  ['🥩', '🍗', '🍖', '🐀', '🐁'];

        do {
            this.x = Math.floor(Math.random() * gameBoard.width);
            this.y = Math.floor(Math.random() * gameBoard.height);
        } while ( snakeCoordinates.includes(`${this.y}_${this.x}`) );
        
        const index = Math.floor(Math.random() * emojis.length);
        this.emoji = emojis[index];
    
    }

}

export { Food }