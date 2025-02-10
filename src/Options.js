class initOptions {

    throughWallsInput = document.getElementById('through-walls');
    accelerationInput = document.getElementById('acceleration');

    throughWalls;
    acceleration;

    constructor() {
    this.throughWalls = Number(localStorage.getItem('snakeThroughWalls') ?? 0);
    this.throughWallsInput.checked = !!throughWalls;

    this.acceleration = Number(localStorage.getItem('snakeSpeedUp') ?? 0);
    this.acceleration.checked = !!this.acceleration;

    this.throughWallsInput.addEventListener('change', () => {
        this.throughWalls = !this.throughWalls ? 1 : 0;
        localStorage.setItem('snakeThroughWalls', this.throughWalls);
    });
    
    this.acceleration.addEventListener('change', () => {
        this.acceleration = !this.acceleration ? 1 : 0;
        localStorage.setItem('snakeSpeedUp', this.acceleration);
    });
    }
}
export {initOptions}