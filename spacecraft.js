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
            case 'Up':
            case 'Down':
                this.direction = this.previousXYPlaneDirection;
                this.turnLeft();
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
            case 'Up':
            case 'Down':
                this.direction = this.previousXYPlaneDirection;
                this.turnRight();
                break;
        }
    }

    turnUp() {
        if (this.direction !== 'Up' && this.direction !== 'Down') {
            this.previousXYPlaneDirection = this.direction;
        }
        this.direction = 'Up';
    }

    turnDown() {
        if (this.direction !== 'Up' && this.direction !== 'Down') {
            this.previousXYPlaneDirection = this.direction;
        }
        this.direction = 'Down';
    }

    executeCommands(commands) {
        for (const command of commands) {
            switch (command) {
                case 'f':
                    this.moveForward();
                    break;
                case 'b':
                    this.moveBackward();
                    break;
                case 'l':
                    this.turnLeft();
                    break;
                case 'r':
                    this.turnRight();
                    break;
                case 'u':
                    this.turnUp();
                    break;
                case 'd':
                    this.turnDown();
                    break;
            }
        }
    }
};

module.exports = Spacecraft;