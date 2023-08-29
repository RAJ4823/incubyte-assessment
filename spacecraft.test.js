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

});



