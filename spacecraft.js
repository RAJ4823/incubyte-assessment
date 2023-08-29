class Spacecraft {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
    }

    moveForward() {
        switch (this.direction) {
            case 'N':
                this.position.y += 1;
                break;
            case 'S':
                this.position.y -= 1;
                break;
            case 'E':
                this.position.x += 1;
                break;
            case 'W':
                this.position.x -= 1;
                break;
            case 'Up':
                this.position.z += 1;
                break;
            case 'Down':
                this.position.z -= 1;
                break;
        }
    }

    moveBackward() {
        switch (this.direction) {
            case 'N':
                this.position.y -= 1;
                break;
            case 'S':
                this.position.y += 1;
                break;
            case 'E':
                this.position.x -= 1;
                break;
            case 'W':
                this.position.x += 1;
                break;
            case 'Up':
                this.position.z -= 1;
                break;
            case 'Down':
                this.position.z += 1;
                break;
        }
    }

    turnLeft() {
        switch (this.direction) {
            case 'N':
                this.direction = 'W';
                break;
            case 'S':
                this.direction = 'E';
                break;
            case 'E':
                this.direction = 'N';
                break;
            case 'W':
                this.direction = 'S';
                break;
        }
    }

    turnRight() {
        switch (this.direction) {
            case 'N':
                this.direction = 'E';
                break;
            case 'S':
                this.direction = 'W';
                break;
            case 'E':
                this.direction = 'S';
                break;
            case 'W':
                this.direction = 'N';
                break;
        }
    }

    turnUp() {
        this.direction = 'Up';
    }
    
    turnDown() {
        this.direction = 'Down';
    }
};

module.exports = Spacecraft;