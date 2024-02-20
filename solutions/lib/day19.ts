interface Packet {
    x: number;
    y: number;
}

class Day19 {
	public helpers = require("./helpers");

	public followPath(lines: string[]) {
		let path = lines.map((line) => line.split(""));
		let position = { x: path[0].indexOf("|"), y: 0 };
		let direction = { x: 0, y: 1 };
		let letters = "";
		let steps = 0;

        // follow all | and -. 
        // when find + in the path, invert direction
        // collect all letters
		while (!this.isFinished(path, position)) {
			let current = path[position.y][position.x];

			if (current === "+") {
				// invert direction axis (vert/horiz): test first neighbour and set direction
				let neighbour = this.getValue(path, { 
					x: position.x + direction.y,
					y: position.y + direction.x
				});

                if (neighbour && neighbour !== " " && neighbour !== "+") {
					direction = { x: direction.y, y: direction.x }; //
				} 
                else {
					direction = { x: -direction.y, y: -direction.x }; 
				}
			} 
            else if (current !== "|" && current !== "-") {
				// it is a letter
				letters += this.getValue(path, position);
			}
			// update position
			position.x += direction.x;
			position.y += direction.y;
			steps++;
		}
		return { steps, letters };
	}

	public getValue(path: string[][], packet: Packet): string|undefined {
		const inbound = packet.x >= 0 && packet.y >= 0 && packet.y < path.length && packet.x < path[packet.y].length;
        const value = inbound ? path[packet.y][packet.x] : undefined;
        
        return value;
	}

	public isFinished(path: string[][], position: Packet) {
		let value = this.getValue(path, position);
		return !value || this.getValue(path, position) === " ";
	}

	public solveForFirstStar(lines: string[]) {
        return this.followPath(lines).letters;
	}

	public solveForSecondStar(lines: string[]) {
        return this.followPath(lines).steps;
	}
}

export default Day19;
