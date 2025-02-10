class Food {

    y;
    x;
    emojis;
    emoji

    constructor( emojis ) {

        this.emojis = emojis;
        
    }
    generate ( gameBoard, snake ) {
        do {
            this.y = Math.floor(Math.random() * gameBoard.height);
            this.x = Math.floor(Math.random() * gameBoard.width);
        } while (snake.includes(`${this.y}_${this.x}`));
        
        const index = Math.floor(Math.random() * this.emojis.length);
        this.emoji = this.emojis[index];
    }
}

export {Food}