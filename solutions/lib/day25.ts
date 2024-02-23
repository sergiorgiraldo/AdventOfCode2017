class TuringMachine {
	public state!: string;
	public steps!: number;
	public instructions = new Map<string, State>();
}

class State {
	public state!: string;
	public instructions = new Map<number, Instruction>();

	constructor(lines: string[]) {
        const matches = /In state (.*):/.exec(lines[0]);
        if (matches) this.state = matches[1];

		this.instructions.set(0, new Instruction(lines.slice(2, 5)));
		
        this.instructions.set(1, new Instruction(lines.slice(6, 9)));
	}
}

class Instruction {
	public write!: number;
	public move!: number;
	public next!: string;

	constructor(lines: string[]) {
        let matches = /\s*- Write the value (.*)\./.exec(lines[0])
		if (matches) this.write = parseInt(matches[1],10);

        matches = /\s*- Move one slot to the (left|right)\./.exec(lines[1]);
		if (matches) this.move = matches[1] === "left" ? -1 : 1;

        matches = /\s*- Continue with state (.*)\./.exec(lines[2]);
		if (matches) this.next = matches[1];
	}
}

class Day25 {
	public helpers = require("./helpers");

	public parse(lines: string[]): TuringMachine {
		let result = new TuringMachine();

        let matches = /Begin in state (.*)./.exec(lines.shift() as string);
		if (matches) result.state = matches[1];

        matches = /Perform a diagnostic checksum after (.*) steps./.exec(lines.shift() as string);
		if (matches) result.steps = parseInt(matches[1],10);

		for (let idx = 0; idx < lines.length / 10; idx++) {
			let instruction = new State(lines.slice(idx * 10 + 1, (idx + 1) * 10));

			result.instructions.set(instruction.state, instruction);
		}
		return result;
	}

	public solveForFirstStar(lines: string[]) {
		let machine = this.parse(lines);
		let values = new Map<number, number>();
		let cursor = 0;

		for (let idx = 0; idx < machine.steps; idx++) {
			let state = machine.instructions.get(machine.state);

            if (!state) throw new Error(`Invalid state ${machine.state}`);

			let instruction = state.instructions.get(values.get(cursor) === undefined ? 0 : values.get(cursor) as number);

            if (!instruction) throw new Error(`Invalid instruction ${cursor}`); 

			values.set(cursor, instruction.write);
			cursor += instruction.move;
			machine.state = instruction.next;
		}
		return Array.from(values.values()).reduce((acc, curr) => acc + curr);
	}

	public solveForSecondStar(lines: string[]) {
		return 0;
	}
}

export default Day25;
