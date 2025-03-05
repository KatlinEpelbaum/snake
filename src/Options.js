class Options {

    throughWalls;
    acceleration;

    constructor () {

        const throughWallsInput = document.getElementById('through-walls');
        const accelerationInput = document.getElementById('acceleration');
    
        this.throughWalls = Number(localStorage.getItem('snakeThroughWalls') ?? 0);
        throughWallsInput.checked = !!this.throughWalls;
        
        this.acceleration = Number(localStorage.getItem('snakeAcceleration') ?? 0);
        accelerationInput.checked = !!this.acceleration;
        
        throughWallsInput.addEventListener('change', () => {
            this.throughWalls = !this.throughWalls ? 1 : 0;
            localStorage.setItem('snakeThroughWalls', this.throughWalls);
        });
        
        accelerationInput.addEventListener('change', () => {
            this.acceleration = !this.acceleration ? 1 : 0;
            localStorage.setItem('snakeAcceleration', this.acceleration);
        });

    }

}

export { Options }