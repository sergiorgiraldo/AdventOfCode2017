
class Day1 {
	public helpers = require("./helpers");

	public compareNextDigit(digits: number[], index: number): number {
        if (index === digits.length - 1) {
            return 0;
        }
        return index + 1;
    }

	public compareHalfwayDigit(digits: number[], index: number): number {
        const otherIndex = index + digits.length / 2;
        
        if (otherIndex >= digits.length) {
            return otherIndex - digits.length;
        }
        
        return otherIndex;
    }

	public solveCaptcha(captcha: string, compare: Function): number {
		const digits = captcha.split("").map(Number);

        let sum = 0;
        
        digits.forEach((digit, index) => {
            const otherIndex = compare(digits, index);

            if (digit === digits[otherIndex]) {
                sum += digit;
            }
        });
        
        return sum;	
	}

	public solveForFirstStar(lines: string[]) {
        return this.solveCaptcha(lines[0], this.compareNextDigit);	
	}

	public solveForSecondStar(lines:string[]) {
        return this.solveCaptcha(lines[0], this.compareHalfwayDigit);	
	}
}

export default Day1;
