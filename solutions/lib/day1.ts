
class Day1 {
	public helpers = require("./helpers");

	public compareNextDigit(len: number, index: number): number {
        if (index === len - 1) {
            return 0;
        }
        else{
            return index + 1;
        }
    }

	public compareHalfwayDigit(len: number, index: number): number {
        const otherIndex = index + len / 2;
        
        if (otherIndex >= len) {
            return otherIndex - len;
        }
        else{
            return otherIndex;
        }
    }

	public solveCaptcha(captcha: string, compare: Function): number {
		const digits = captcha.split("").map(Number);
        
        const solution = digits.filter((digit, i) => digit === digits[compare(digits.length, i)]);

        return solution.reduce((acc, curr) => acc + curr, 0);
	}

	public solveForFirstStar(lines: string[]) {
        return this.solveCaptcha(lines[0], this.compareNextDigit);	
	}

	public solveForSecondStar(lines:string[]) {
        return this.solveCaptcha(lines[0], this.compareHalfwayDigit);	
	}
}

export default Day1;
