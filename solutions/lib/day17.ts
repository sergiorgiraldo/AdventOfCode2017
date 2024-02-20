class Day17 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
        const step = +lines[0];

		let buffer = [0];
		let position = 0;
		
        for (let i = 1; i <= 2017; i++) {
			position = ((position + step) % buffer.length) + 1;

			buffer = [...buffer.slice(0, position), i, ...buffer.slice(position)];
		}

        return buffer[position + 1];
	}

	public solveForSecondStar(lines: string[]) {
        const step = +lines[0];

        let result = 0;
        let position = 0;

        // dont care about building the buffer, only care about the position being the position 1
        //also, the number is inserted verbatim into the buffer, just store it in result
        for (let i = 1; i <= 50_000_000; i++) {
            position = ((position + step) % i) + 1;

            if (position === 1) {
                result = i;
            }
        }
        
        return result;
	}
}

export default Day17;
