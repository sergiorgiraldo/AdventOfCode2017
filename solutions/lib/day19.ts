interface Packet {
    x: number;
    y: number;
}

class Day19 {
	public helpers = require("./helpers");

	public routeThePacket(lines: string[]):{steps: number; letters: string;} {
		const path = lines.map((line) => line.split(""));

		let packet = { x: path[0].indexOf("|"), y: 0 };
		let direction = { x: 0, y: 1 }; // start facing down, going vertically
		let letters = "";
		let steps = 0;

        // follow all | and -. 
        // when find + in the path, invert direction
        // collect all letters
		while (!this.atTheEnd(path, packet)) {
			let current = path[packet.y][packet.x];

			if (current === "+") {
				// invert direction axis (vert/horz): test neighbour and set direction
				let neighbour = this.getValue(path, {
					x: packet.x + direction.y,
					y: packet.y + direction.x
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
				letters += this.getValue(path, packet);
			}

			// update position
			packet.x += direction.x;
			packet.y += direction.y;
			
            steps += 1;
		}
		return { steps, letters };
	}

	public getValue(path: string[][], packet: Packet): string|undefined {
		const inbound = packet.x >= 0 && packet.y >= 0 && packet.y < path.length && packet.x < path[packet.y].length;
        const value = inbound ? path[packet.y][packet.x] : undefined;
        
        return value;
	}

	public atTheEnd(path: string[][], packet: Packet) {
		const value = this.getValue(path, packet);
		
        return !value || value === " ";
	}

	public solveForFirstStar(lines: string[]) {
        return this.routeThePacket(lines).letters;
	}

	public solveForSecondStar(lines: string[]) {
        return this.routeThePacket(lines).steps;
	}
}

export default Day19;
