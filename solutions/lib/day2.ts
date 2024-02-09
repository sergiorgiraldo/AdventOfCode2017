
class Day2 {
	public helpers = require("./helpers");

    public checksumLine_Divisors(line: string): number{
        const digits = line.split(/\s+/).map(Number);

        for (let digit of digits) {
            const secondDigit = digits.find((other) => other !== digit && (other % digit === 0 || digit % other === 0));

            if (secondDigit) {
                return Math.max(secondDigit, digit) / Math.min(secondDigit, digit);
            }
        }
        
        throw new Error("No solution found");
    }

    public checksumLine_MaxMin(line: string): number {
        const digits = line.split(/\s+/).map(Number);

        return Math.max.apply(Math.max, digits) - Math.min.apply(Math.min, digits);
    }

	public solveForFirstStar(lines: string[]) {
		return lines.map((line) => this.checksumLine_MaxMin(line)).reduce((acc, curr) => acc + curr, 0);	
	}

	public solveForSecondStar(lines:string[]) {
		return lines.map((line) => this.checksumLine_Divisors(line)).reduce((acc, curr) => acc + curr, 0);	
	}
}

export default Day2;
