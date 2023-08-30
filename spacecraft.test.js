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

describe('Edge Cases for Spacecraft Control Tests', () => {
    describe('Turn Right from Up or Down direction', () => {
        const testCases = [
            { initialDirection: 'N', expectedDirection: 'E' },
            { initialDirection: 'E', expectedDirection: 'S' },
            { initialDirection: 'S', expectedDirection: 'W' },
            { initialDirection: 'W', expectedDirection: 'N' },
        ];

        testCases.forEach(({ initialDirection, expectedDirection }) => {
            test(`with previous XY plane direction ${initialDirection}`, () => {
                const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, initialDirection);

                // Turn Up or Down
                // spacecraft.turnUp();
                // expect(spacecraft.direction).toBe('Up');
                spacecraft.turnDown();
                expect(spacecraft.direction).toBe('Down');

                // Turn Right from Up
                spacecraft.turnRight();
                expect(spacecraft.direction).toBe(expectedDirection);
            });
        });
    });

    describe('Turn Left from Up or Down direction', () => {
        const testCases = [
            { initialDirection: 'N', expectedDirection: 'W' },
            { initialDirection: 'E', expectedDirection: 'N' },
            { initialDirection: 'S', expectedDirection: 'E' },
            { initialDirection: 'W', expectedDirection: 'S' },
        ];

        testCases.forEach(({ initialDirection, expectedDirection }) => {
            test(`with previous XY plane direction ${initialDirection}`, () => {
                const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, initialDirection);

                // Turn Up or Down
                spacecraft.turnUp();
                expect(spacecraft.direction).toBe('Up');
                // spacecraft.turnDown();
                // expect(spacecraft.direction).toBe('Down');

                // Turn Left from Up
                spacecraft.turnLeft();
                expect(spacecraft.direction).toBe(expectedDirection);
            });
        });
    });
});

describe('Spacecraft Commands Execution Tests', () => {
    test('Example Test Case', () => {
        const initialPosition = { x: 0, y: 0, z: 0 };
        const initialDirection = 'N';
        const commands = ['f', 'r', 'u', 'b', 'l'];

        const expectedPosition = { x: 0, y: 1, z: -1 };
        const expectedDirection = 'N';

        // Execute the commands on chandrayaan3
        let chandrayaan3 = new Spacecraft(initialPosition, initialDirection);
        chandrayaan3.executeCommands(commands);

        // Compare expected results with the actual ones
        expect(chandrayaan3.position).toEqual(expectedPosition);
        expect(chandrayaan3.direction).toBe(expectedDirection);
    });

    test('Test Case 1', () => {
        const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, 'N');
        spacecraft.executeCommands(['f', 'f', 'r', 'f', 'f']);

        expect(spacecraft.position).toEqual({ x: 2, y: 2, z: 0 });
        expect(spacecraft.direction).toBe('E');
    });

    test('Test Case 2', () => {
        const spacecraft = new Spacecraft({ x: 0, y: 0, z: 0 }, 'S');
        spacecraft.executeCommands(['u', 'f', 'd', 'f']);

        expect(spacecraft.position).toEqual({ x: 0, y: 0, z: 0 });
        expect(spacecraft.direction).toBe('Down');
    });

    test('Test Case 3', () => {
        const spacecraft = new Spacecraft({ x: 1, y: -2, z: 0 }, 'W');
        spacecraft.executeCommands(['l', 'u', 'b', 'r', 'f', 'r', 'u', 'l']);

        expect(spacecraft.position).toEqual({ x: 0, y: -2, z: -1 });
        expect(spacecraft.direction).toBe('W');
    });

    test('Invalid Test Case', () => {
        const spacecraft = new Spacecraft({ x: 1, y: 1, z: 1 }, 'N');
        spacecraft.executeCommands(['l', 'a', 'b', 'r']);

        // Spacecraft should not execute commands, if it contains one or more invalid commands
        expect(spacecraft.position).toEqual({ x: 1, y: 1, z: 1 });
        expect(spacecraft.direction).toBe('N');
    });
})
