class Grid {
	public content: string[][] = [];

	constructor(input?: string|undefined) {
		if (input) this.content = this.buildInitialGrid(input);
	}

	public get size(): number {
		return this.content.length;
	}

	public get(x: number, y: number): string {
		return this.content[y][x];
	}

	public set(x: number, y: number, value: string): void {
		if (this.content[y] === undefined) {
			this.content[y] = [];
		}
		this.content[y][x] = value;
	}

	public toString(): string {
		return this.content.map((line) => line.join("")).join("/");
	}

	public divide(x: number, y: number, size: number): Grid {
		let grid = new Grid();

		grid.content = this.content
			.slice(y * size, y * size + size)
			.map((line) => line.slice(x * size, x * size + size));

		return grid;
	}

	public push(coordX: number, coordY: number, subGrid: Grid) {
		for (let y = 0; y < subGrid.size; y++) {
			for (let x = 0; x < subGrid.size; x++) {
				this.set(
					subGrid.size * coordX + x,
					subGrid.size * coordY + y,
					subGrid.get(x, y)
				);
			}
		}
	}

	private buildInitialGrid(input: string): string[][] {
		return input.split("/").map((line) => line.split(""));
	}
}

class Rule {
	private static regex = /(.*) => (.*)/;

	public from!: string[];
	public to!: Grid;

	constructor(input: string) {
		let matches = Rule.regex.exec(input); /* .../.# => ##./#../... */
        
        if (matches){
            this.from = this.rotateAndFlip(new Grid(matches[1]));
            this.to = new Grid(matches[2]);
        }
	}

	private rotateAndFlip(grid: Grid): string[] {
		let size = grid.size;

        //rotate clockwise
		let rotations = [grid, ...Array.from({ length: 3 }, () => new Grid())];
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				rotations[1].set(x, y, grid.get(y, size - 1 - x));
				rotations[2].set(x, y, grid.get(size - 1 - x, size - 1 - y));
				rotations[3].set(x, y, grid.get(size - 1 - y, x));
			}
		}

        //for each rotation, flip horizontally and vertically
        let flips = Array.from({ length: 8 }, () => new Grid());
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				flips[0].set(x, y, rotations[0].get(size - 1 - x, y));
				flips[1].set(x, y, rotations[1].get(size - 1 - x, y));
				flips[2].set(x, y, rotations[2].get(size - 1 - x, y));
				flips[3].set(x, y, rotations[3].get(size - 1 - x, y));
				flips[4].set(x, y, rotations[0].get(x, size - 1 - y));
				flips[5].set(x, y, rotations[1].get(x, size - 1 - y));
				flips[6].set(x, y, rotations[2].get(x, size - 1 - y));
				flips[7].set(x, y, rotations[3].get(x, size - 1 - y));
			}
		}

		return [...rotations, ...flips].map((grid) => grid.toString());
	}
}

class Day21 {
	public helpers = require("./helpers");

	public parse(lines: string[]): Rule[] {
		return lines.map((line) => new Rule(line));
	}

    public enhance(lines: string[], steps: number){
        let state = ".#./..#/###"; //from the puzzle
		
        let rules = this.parse(lines);

		for (let step = 0; step < steps; step++) {
			let grid = new Grid(state);
			let size = grid.size % 2 === 0 ? 2 : 3;
			let newGrid = new Grid();

			for (let y = 0; y < grid.size / size; y++) {
				for (let x = 0; x < grid.size / size; x++) {
					let subGrid = grid.divide(x, y, size);

					let rule = rules.find((rule) => rule.from.includes(subGrid.toString())); 
					
                    newGrid.push(x, y, (rule as Rule).to);
				}
			}
            
			state = newGrid.toString();
		}

		return state.split("").filter((char) => char === "#").length;    
    }

	public solveForFirstStar(lines: string[]) {
        return this.enhance(lines, 5);
	}

	public solveForSecondStar(lines: string[]) {
		return this.enhance(lines, 18);
	}
}

export default Day21;
