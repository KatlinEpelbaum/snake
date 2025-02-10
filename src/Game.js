class Game {
    constructor(gameBoard, snake, food, throughWalls, acceleration) {
        this.currentScoreSpan = document.getElementById('current-score');
        this.messageDiv = document.getElementById('message');
        this.resetGameBtn = document.getElementById('reset-game');
        this.highScoreSpan = document.getElementById('high-score');

        this.score = 0;
        this.highScore = 0;
        this.speed = 200;
        this.direction = 'up';
        this.intervalId = null;
        this.gameBoard = gameBoard;
        this.snake = snake;
        this.food = food;
        this.throughWalls = throughWalls;
        this.acceleration = acceleration;
        
        this.setupControls();
        this.resetGameBtn.addEventListener('click', () => {
            this.resetGame();
        });
        
        this.resetGame();
    }

    setupControls() {
        document.addEventListener('keydown', e => {
            switch (e.key.toLowerCase()) {
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
    }

    resetGame() {
        this.direction = 'up';
        this.speed = 200;
        this.score = 0;
        
        this.snake.coordinates = [
            `${Math.floor(this.gameBoard.height / 2)}_${Math.floor(this.gameBoard.width / 2)}`
        ];
    
        this.highScore = localStorage.getItem('snakeHighScore') ?? 0;
        this.highScoreSpan.innerText = this.highScore;
        this.currentScoreSpan.innerText = this.score;
    
        this.food.generate(this.gameBoard, this.snake.coordinates);
    
        this.messageDiv.innerText = '';
        this.resetGameBtn.classList.add('hidden');
    
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => this.run(), this.speed);
    }

    run() {
        clearInterval(this.intervalId);
        const alive = this.snake.update(
            this,
            this.gameBoard,
            this.direction,
            this.throughWalls
        );
        
        this.gameBoard.draw(this.snake, this.food);
    
        if (!alive || this.isGameOver()) {
            this.stop();
        } else {
            this.intervalId = setInterval(() => this.run(), this.speed);
        }
    }

    updateScore(acceleration) {
        this.score++;
        this.currentScoreSpan.innerText = this.score;

        if (this.score % acceleration === 0) {
            this.speed = Math.max(50, this.speed - 5);
        }
    }

    isGameOver() {
        return this.snake.slice(1).includes(this.snake.coordinates[0]);
    }

    stop() {
        clearInterval(this.intervalId);
        this.messageDiv.innerText = 'The game is over!';
        this.resetGameBtn.classList.remove('hidden');
    
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.score);
            this.highScoreSpan.innerText = this.score;
        }
    }
}

export { Game };