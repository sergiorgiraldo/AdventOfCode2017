
class Day5 {
	public helpers = require("./helpers");

	public escapeFromMaze(lines: string[], fn: (instruction: number) => number): number{
		const instructions = [...lines]; //clone the  array, otherwise the original array will be modified

        let currentPosition = 0;
        let steps = 0;

        while (currentPosition < instructions.length)
        {
            steps++;
            let instruction = instructions[currentPosition];
            let actualInstruction: number = +instruction;
            instructions[currentPosition] = (actualInstruction + fn(actualInstruction)).toString();
            currentPosition += actualInstruction;
        }

        return steps;
	}

	public solveForFirstStar(lines: string[]) {
        return this.escapeFromMaze(lines, (_) => 1);
	}

	public solveForSecondStar(lines:string[]) {
        return this.escapeFromMaze(lines, (instruction) => instruction >= 3 ? -1 : 1);
	}
}

export default Day5;
