class Generator {
    private nextValue: number;
    private factor: number;
    private divisor: number;

    constructor(start: number, generatorA: boolean, divisor: number = 1) {
        this.nextValue = start;
        this.factor = generatorA ? 16_807 : 48_271; //magic numbers from puzzle input
        this.divisor = divisor;
    }

    public generate(): number|undefined {        
        this.nextValue = (this.nextValue * this.factor) % 2_147_483_647; //magic number from puzzle input
        
        if (this.divisor !== 1){
            if (this.nextValue % this.divisor === 0) { 
                return this.nextValue;
            }
            else{
                return undefined;
            }
        }
        else{
            return this.nextValue;
        }
    }
}

class Day15 {
	public helpers = require("./helpers");

    public parse(lines: string[]): number[] {
        const regex = /\d+/g;

        let starts:Array<number> = [];

        const startA = lines[0].match(regex);
        if (startA) starts.push(+startA[0]);
        
        const startB = lines[1].match(regex);
        if (startB) starts.push(+startB[0]);

        return starts;
    }

    public lower16BitsAreTheSame(A_Value: number, B_Value: number): boolean {
        return (A_Value & 0xFFFF) === (B_Value & 0xFFFF)
    }

	public solveForFirstStar(lines: string[]) {
        const starts = this.parse(lines);
        let generatorAStart:number = starts[0];
        let generatorBStart:number = starts[1];

        let generatorA = new Generator(generatorAStart, true);
        let generatorB = new Generator(generatorBStart, false);

        let matches = 0;
        let start = 0;
        
        for(let i = start; i <= 40_000_000; i++) { //magic number from puzzle input
            const A_Value = generatorA.generate();
            const B_Value = generatorB.generate();

            if (!A_Value || !B_Value) throw new Error("No value generated");

            if (this.lower16BitsAreTheSame(A_Value, B_Value)) matches += 1;
        }

        return matches;	
    }

	public solveForSecondStar(lines:string[]) {
        const starts = this.parse(lines);
        let generatorAStart:number = starts[0];
        let generatorBStart:number = starts[1];

        let generatorA = new Generator(generatorAStart, true, 4);
        let generatorB = new Generator(generatorBStart, false, 8);
        
        let matches = 0;

        for(let i = 0; i <= 5_000_000; i++) { //magic number from puzzle input
            let A_Value = generatorA.generate();
            while(!A_Value) A_Value = generatorA.generate();
            
            let B_Value = generatorB.generate();
            while(!B_Value) B_Value = generatorB.generate();

            if (this.lower16BitsAreTheSame(A_Value, B_Value)) matches += 1;
        }

        return matches;
	}
}

export default Day15;
