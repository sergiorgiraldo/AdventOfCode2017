export class Program {
	private static regex = /(.*) <-> (.*)/;

	public id: number;
	public pipes: string;
	public next!: Program[];

	constructor(line: string) {
		const matches = Program.regex.exec(line) as RegExpExecArray;
		
        this.id = parseInt(matches[1], 10);
		this.pipes = matches[2];
	}
}

class Day12 {
	public helpers = require("./helpers");

	public getGroup(programs: Program[], firstProgram: number): number[] {
		let queue = [firstProgram];
		let visited: Array<number> = [];

		while (queue.length > 0) {
			let programId:number|undefined = queue.shift();
            
			if (programId === undefined) throw new Error("Queue not found");
            
            let program = programs[this.indexOf(programs, programId)]; 

			let nextPrograms = program.next
				.map((next) => next.id)
				.filter((next) => visited.indexOf(next) === -1);

			queue = [...queue, ...nextPrograms];

			visited = [...visited, ...nextPrograms];
		}

		return visited;
	}

	public parse(lines: string[]): Program[] {
        let programs = lines.map((line) => new Program(line));

		programs.forEach((program) => {
				program.next = program.pipes.split(", ").map(
                    (id) => programs[this.indexOf(programs, +id)]) as Program[];
		});

		return programs;
	}

    public indexOf(programs: Program[], id:number): number {
        return programs.findIndex((p) => p.id === id);
    }

	public solveForFirstStar(lines: string[]) {
		let programs = this.parse(lines);

		return this.getGroup(programs, 0).length;
	}

	public solveForSecondStar(lines: string[]) {
		let programs = this.parse(lines);
        let groups = 0;

        while (programs.length > 0) {
            groups += 1;
            const group = this.getGroup(programs, programs[0].id);
            group.forEach((id) => programs.splice(this.indexOf(programs, id), 1));
        }

        return groups;	
    }
}

export default Day12;
