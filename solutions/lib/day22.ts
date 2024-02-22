enum STATE {
	WEAKENED,
	INFECTED,
	FLAGGED
}

interface Position {
	x: number;
	y: number;
	direction: string;
}

class Day22 {
	public helpers = require("./helpers");

	public static directions: {[key: string]: {x: number; y: number; left: string; right: string; reverse: string;}; } = {
		"d": { x: 0,  y: 1,   left: "r", right: "l", reverse: "u" },
		"l": { x: -1, y: 0,   left: "d", right: "u", reverse: "r" },
		"r": { x: 1,  y: 0,   left: "u", right: "d", reverse: "l" },
		"u": { x: 0,  y: -1,  left: "l", right: "r", reverse: "d" }
	};

	public static encode(x: number, y: number): string {
		return `${x};${y}`;
	}

	public parse(lines: string[]): Map<string, STATE> {
		let result = new Map<string, STATE>();

		lines.forEach((line, y) => {
			let middle = Math.floor(line.length / 2);
			line.split("").forEach((cell, x) => {
				if (cell === "#") {
					result.set(Day22.encode(x - middle, y - middle), STATE.INFECTED);
				}
			});
		});
		return result;
	}

	public originalStrain(nodes: Map<string, STATE>, position: Position): boolean {
		let isInfected = false;
		let coord = Day22.encode(position.x, position.y);
		let direction = Day22.directions[position.direction];

		if (nodes.has(coord)) {
			position.direction = direction.right;
			nodes.delete(coord);
		} 
        else {
			position.direction = direction.left;
			nodes.set(coord, STATE.INFECTED);
			isInfected = true;
		}
		
        position.x += Day22.directions[position.direction].x;
		position.y += Day22.directions[position.direction].y;

		return isInfected;
	}

    public evolvedStrain(nodes: Map<string, STATE>, position: Position): boolean {
        let isInfected = false;
        let coord = Day22.encode(position.x, position.y);
        let direction = Day22.directions[position.direction];

        switch (nodes.get(coord)) {
            case undefined:
                position.direction = direction.left;
                nodes.set(coord, STATE.WEAKENED);
                break;
            case STATE.WEAKENED:
                nodes.set(coord, STATE.INFECTED);
                isInfected = true;
                break;
            case STATE.INFECTED:
                position.direction = direction.right;
                nodes.set(coord, STATE.FLAGGED);
                break;
            case STATE.FLAGGED:
                position.direction = direction.reverse;
                nodes.delete(coord);
                break;
        }
        
        position.x += Day22.directions[position.direction].x;
        position.y += Day22.directions[position.direction].y;

        return isInfected;
    }

	public simulate(lines: string[], bursts: number, infect: (nodes: Map<string, STATE>, position: Position) => boolean): number {
		let infectedNodes = this.parse(lines);

		let position: Position = { x: 0, y: 0, direction: "u" };
		
        let infections = 0;
		
        for (let burst = 0; burst < bursts; burst++) {
			if (infect(infectedNodes, position)) {
				infections++;
			}
		}
		return infections;
	}


	public solveForFirstStar(lines: string[]) {
		return this.simulate(lines, 10_000, this.originalStrain);
	}

	public solveForSecondStar(lines: string[]) {
		return this.simulate(lines, 10_000_000, this.evolvedStrain);
	}
}

export default Day22;
