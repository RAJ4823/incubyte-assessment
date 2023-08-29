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
};

module.exports = Spacecraft;