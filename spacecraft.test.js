const Spacecraft = require('./spacecraft');

describe('Spacecraft Control Tests', () => {

    describe('Move Forward', () => {
        const testCases = [
            { initialDirection: 'N', expectedPosition: { x: 0, y: 1, z: 0 } },
            { initialDirection: 'S', expectedPosition: { x: 0, y: -1, z: 0 } },
            { initialDirection: 'E', expectedPosition: { x: 1, y: 0, z: 0 } },
            { initialDirection: 'W', expectedPosition: { x: -1, y: 0, z: 0 } },
            { initialDirection: 'Up', expectedPosition: { x: 0, y: 0, z: 1 } },
            { initialDirection: 'Down', expectedPosition: { x: 0, y: 0, z: -1 } },
        ];

        testCases.forEach(({ initialDirection, expectedPosition }) => {
            test(`From facing ${initialDirection}`, () => {
                const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, initialDirection);
                spacecraft.moveForward();

                expect(spacecraft.position).toEqual(expectedPosition);
                expect(spacecraft.direction).toBe(initialDirection);
            });
        });
    });

    describe('Move Backward', () => {
        const testCases = [
            { initialDirection: 'N', expectedPosition: { x: 0, y: -1, z: 0 } },
            { initialDirection: 'S', expectedPosition: { x: 0, y: 1, z: 0 } },
            { initialDirection: 'E', expectedPosition: { x: -1, y: 0, z: 0 } },
            { initialDirection: 'W', expectedPosition: { x: 1, y: 0, z: 0 } },
            { initialDirection: 'Up', expectedPosition: { x: 0, y: 0, z: -1 } },
            { initialDirection: 'Down', expectedPosition: { x: 0, y: 0, z: 1 } },
        ];

        testCases.forEach(({ initialDirection, expectedPosition }) => {
            test(`From facing ${initialDirection}`, () => {
                const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, initialDirection);
                spacecraft.moveBackward();

                expect(spacecraft.position).toEqual(expectedPosition);
                expect(spacecraft.direction).toBe(initialDirection);
            });
        });
    });

    describe('Turn Left (in XY Plane)', () => {
        const testCases = [
            { initialDirection: 'N', expectedDirection: 'W' },
            { initialDirection: 'W', expectedDirection: 'S' },
            { initialDirection: 'S', expectedDirection: 'E' },
            { initialDirection: 'E', expectedDirection: 'N' },
        ];

        testCases.forEach(({ initialDirection, expectedDirection }) => {
            test(`From facing ${initialDirection}`, () => {
                const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, initialDirection);
                spacecraft.turnLeft();

                expect(spacecraft.direction).toBe(expectedDirection);
            });
        });
    });

    describe('Turn Right (in XY Plane)', () => {
        const testCases = [
            { initialDirection: 'N', expectedDirection: 'E' },
            { initialDirection: 'E', expectedDirection: 'S' },
            { initialDirection: 'S', expectedDirection: 'W' },
            { initialDirection: 'W', expectedDirection: 'N' },
        ];
    
        testCases.forEach(({ initialDirection, expectedDirection }) => {
            test(`From facing ${initialDirection}`, () => {
                const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, initialDirection);
                spacecraft.turnRight();
    
                expect(spacecraft.direction).toBe(expectedDirection);
            });
        });
    });
    
    describe('Turn Up', () => {
        test('From XY plane', () => {
            // The initial direction doesn't matter; the final direction will be 'Up'.
            const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, 'N');
            spacecraft.turnUp();
    
            expect(spacecraft.direction).toBe('Up');
        });
    });
    
    describe('Turn Down', () => {
        test('From XY plane', () => {
            // The initial direction doesn't matter; the final direction will be 'Down'.
            const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, 'N');
            spacecraft.turnDown();
    
            expect(spacecraft.direction).toBe('Down');
        });
    });
    
});



