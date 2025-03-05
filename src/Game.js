class Game {
    
    currentScoreSpan = document.getElementById('current-score');
    resetGameBtn = document.getElementById('reset-game');

    score;
    highScore;
    speed;
    direction;
    intervalId;
    gameBoard;
    snake;
    food;
    options;

    constructor ( gameBoard, snake, food, options ) {
        
        this.gameBoard = gameBoard;
        this.snake = snake;
        this.food = food;
        this.options = options;

        this.init();

        document.addEventListener('keydown', e => {
            switch ( e.key.toLowerCase() ) {
                case 'arrowup':
                case 'w':
                    this.direction = 'up';
                    break;
                case 'arrowdown':
                case 's':
                    this.direction = 'down';
                    break;
                case 'arrowleft':
                case 'a':
                    this.direction = 'left';
                    break;
                case 'arrowright':
                case 'd':
                    this.direction = 'right';
                    break;
            }
        });

        this.resetGameBtn.addEventListener('click', () => this.init());

    }

    init () {

        this.snake.init(this.gameBoard);

        this.direction = 'up';
        this.speed = 200;
        
        const highScoreSpan = document.getElementById('high-score');
        this.highScore = localStorage.getItem('snakeHighScore') ?? 0;
        highScoreSpan.innerText = this.highScore;
        
        this.score = 0;
        this.currentScoreSpan.innerText = this.score;
    
        this.food.generate(this.gameBoard, this.snake.coordinates);
    
        this.updateMessage('');
        this.resetGameBtn.classList.add('hidden');
    
        this.intervalId = setInterval(this.run.bind(this), this.speed);

    }

    run () {
        clearInterval(this.intervalId);
        this.snake.update(this, this.gameBoard, this.food, this.options);
        this.gameBoard.draw(this.snake, this.food);
    
        if ( this.isGameOver() ) {
            this.stop();
        } else {
            this.intervalId = setInterval(this.run.bind(this), this.speed);
        }
    }

    updateScore () {

        this.score++;
        this.currentScoreSpan.innerText = this.score;

        if ( this.score % this.options.acceleration == 0 ) {
            this.speed -= 5;
        }

    }

    updateMessage ( message ) {

        const messageDiv = document.getElementById('message');
        messageDiv.innerText = message;

    }

    isGameOver () {

        if ( this.snake.coordinates.slice(1).includes(this.snake.coordinates[0]) ) {
            return true;
        }
    
        return false;
    
    }

    stop () {

        clearInterval(this.intervalId);
        this.updateMessage('Game over!');
        this.resetGameBtn.classList.remove('hidden');
    
        if ( this.score > this.highScore ) {
            localStorage.setItem('snakeHighScore', this.score);
        }
    
    }

}

export { Game }