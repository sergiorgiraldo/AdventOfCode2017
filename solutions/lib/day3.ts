class Day3 {
	public helpers = require("./helpers");

    private operations : { [key: number]: { x: number, y: number } } = {
            0: { x: 0, y: -1 },
            1: { x: -1, y: 0 },
            2: { x: 0, y: 1 },
            3: { x: 1, y: 0 },
    };

    public stressTest(input: number): number {
        let cellIdx = 1;
        let values = new Map<string, number>();
        values.set(this.getCellKey(0, 0), 1);

        let x = 0;
        let y = 0;

        for (let squareIdx = 1; ; squareIdx++) {
            x++;
            y++;
            for (let quarter = 0; quarter < 4; quarter++) {
                let operation = this.operations[quarter];
                for (let idx = 0; idx < squareIdx * 2; idx++) {
                    cellIdx++;
                    x += operation.x;
                    y += operation.y;
                    let value = this.getSumAround(values, x, y);
                    if (value > input) {
                        return value;
                    }
                    values.set(x + ';' + y, value);
                }
            }
        }
    }

    public getSumAround(values: Map<string, number>, x: number, y: number): number {
        return [-1, 0, 1].reduce((sum, xi) =>
            [-1, 0, 1].reduce((subsum, yi) => {
                let value = values.get(this.getCellKey(x + xi, y + yi));
                if (value) {
                    return subsum + value;
                }
                return subsum;
            }, sum)
            , 0);
    }

    public getCellKey(x: number, y: number): string {
        return x + ';' + y;
    }

/*
17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23   24 25
*/


    public getStepsUntilPort(input: number): number {
        let squareIdx = 0;
        
        let remain = input - 1;

        //here we are going in the far right border of the squares
        //first is 9, then 17, then 25, etc 
        while (remain > 0) {
            remain = remain - 8 * (1 + squareIdx++);
        }
        //if we passed, then go back
        while (remain < 0) {
            remain += 2 * squareIdx;
        }
        return Math.abs(remain - squareIdx) + squareIdx;
    }

	public solveForFirstStar(lines: string[]) {
		const input = +lines[0];

        var total = this.getStepsUntilPort(input);

        return total;
	}

	public solveForSecondStar(lines: string[]) {
		const input = +lines[0];
        
        var value = this.stressTest(input);

        return value;	
	}
}

export default Day3;
