class Snake {
    constructor(gameBoard) {
        this.coordinates = [
            `${Math.floor(gameBoard.height / 2)}_${Math.floor(gameBoard.width / 2)}`
        ];
    }

    update(game, gameBoard, direction, throughWalls) {
        let [y, x] = this.coordinates[0].split('_').map(Number);

        switch (direction) {
            case 'up':
                if (y === 0) {
                    if (throughWalls) {
                        y = gameBoard.height - 1;
                    } else {
                        return false;
                    }
                } else {
                    y--;
                }
                break;
            case 'down':
                if (y === gameBoard.height - 1) {
                    if (throughWalls) {
                        y = 0;
                    } else {
                        return false;
                    }
                } else {
                    y++;
                }
                break;
            case 'left':
                if (x === 0) {
                    if (throughWalls) {
                        x = gameBoard.width - 1;
                    } else {
                        return false;
                    }
                } else {
                    x--;
                }
                break;
            case 'right':
                if (x === gameBoard.width - 1) {
                    if (throughWalls) {
                        x = 0;
                    } else {
                        return false;
                    }
                } else {
                    x++;
                }
                break;
        }

        this.coordinates.unshift(`${y}_${x}`);

        if (y === game.food.y && x === game.food.x) {
            game.updateScore(game.acceleration);
            game.food.generate(gameBoard, this.coordinates);
        } else {
            this.coordinates.pop();
        }

        return true;
    }

    slice(start) {
        return this.coordinates.slice(start);
    }

    includes(value) {
        return this.coordinates.includes(value);
    }
}

export { Snake };