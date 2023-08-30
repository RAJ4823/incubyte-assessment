// Stores the possible directions in each plane
const planeDirections = {
    'XY': ['N', 'E', 'S', 'W'],  
    'YX': ['N', 'W', 'S', 'E'],     
    'YZ': ['Up', 'S', 'Down', 'N'],
    'ZY': ['Up', 'N', 'Down', 'S'],
    'XZ': ['Up', 'E', 'Down', 'W'],
    'ZX': ['Up', 'W', 'Down', 'E'],
}

// Stores the plane transitions for turning up and down from different directions
const planeTransitions = {
    'N': { 'turnUp': 'XZ', 'turnDown': 'ZX' },
    'S': { 'turnUp': 'ZX', 'turnDown': 'XZ' },
    'E': { 'turnUp': 'YZ', 'turnDown': 'ZY' },
    'W': { 'turnUp': 'ZY', 'turnDown': 'YZ' },
    'Up': { 'turnUp': 'YX', 'turnDown': 'XY' },
    'Down': { 'turnUp': 'XY', 'turnDown': 'YX' },
}

// Stores the direction transitions based on the axis of rotation
const directionTransitions = {
    // N or S
    'Y-Axis': {
        'XY': { 'turnUp': 'Up', 'turnDown': 'Down' },
        'YX': { 'turnUp': 'Down', 'turnDown': 'Up' },
        'YZ': { 'turnUp': 'W', 'turnDown': 'E' },
        'ZY': { 'turnUp': 'E', 'turnDown': 'W' },
    },
    // W or E
    'X-Axis': {
        'XY': { 'turnUp': 'Up', 'turnDown': 'Down' },
        'YX': { 'turnUp': 'Down', 'turnDown': 'Up' },
        'XZ': { 'turnUp': 'S', 'turnDown': 'N' },
        'ZX': { 'turnUp': 'N', 'turnDown': 'S' },
    },
    // Up or Down
    'Z-Axis': {
        'YZ': { 'turnUp': 'W', 'turnDown': 'E' },
        'ZY': { 'turnUp': 'E', 'turnDown': 'W' },
        'XZ': { 'turnUp': 'S', 'turnDown': 'N' },
        'ZX': { 'turnUp': 'N', 'turnDown': 'S' },
    }
};

class Spacecraft {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
        // Default Plane
        if(direction === 'Up' || direction === 'Down') {
            this.plane = 'XZ';
        } else {
            this.plane = 'XY';
        }
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
        const currentPlane = this.plane;
        const currentDirectionIndex = planeDirections[currentPlane].indexOf(this.direction);
        const newDirectionIndex = (currentDirectionIndex + 3) % 4;
        this.direction = planeDirections[currentPlane][newDirectionIndex];
    }

    turnRight() {
        const currentPlane = this.plane;
        const currentDirectionIndex = planeDirections[currentPlane].indexOf(this.direction);
        const newDirectionIndex = (currentDirectionIndex + 1) % 4;
        this.direction = planeDirections[currentPlane][newDirectionIndex];
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
        if(!this.isValidCommands(commands)) {
            console.log("Execution aborted due to invalid commands");
            return;
        }
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

    isValidCommands(commands) {
        let invalidCommands = [];
        for (const command of commands) {
            if (!['f', 'b', 'l', 'r', 'u', 'd'].includes(command)) {
                invalidCommands.push(command);
            }
        }

        if(invalidCommands.length > 0) {
            console.log('Invalid Commands:', invalidCommands);
            return false;
        }
        return true;
    }
};

module.exports = Spacecraft;