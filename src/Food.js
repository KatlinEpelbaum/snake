class Food {
    constructor(emojis) {
        this.emojis = emojis;
        this.y = 0;
        this.x = 0;
        this.emoji = '';
    }

    generate(gameBoard, snakeCoordinates) {
        do {
            this.y = Math.floor(Math.random() * gameBoard.height);
            this.x = Math.floor(Math.random() * gameBoard.width);
        } while (snakeCoordinates.includes(`${this.y}_${this.x}`));
        
        this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
    }
}

export { Food };