 type DanceMove = Spin | Exchange | Partner;

 class DanceMoveFactory {
    public static create(instruction: string): DanceMove {
        if (instruction.startsWith("s")){
            return Spin.parse(instruction)
        } 
        else if (instruction.startsWith("x")){
            return Exchange.parse(instruction);
        } 
        else if (instruction.startsWith("p")){
            return Partner.parse(instruction);
        } 
        else{
            throw new Error("unknown instruction: " + instruction);
        }
    }
}

 class Spin {
    private static regex = /s(\d+)/;

    public static parse(instruction: string): Spin {
        let matches = Spin.regex.exec(instruction);
        if (!matches) throw new Error("failed to parse: " + instruction);

        return new Spin(+matches[1]);
    }

    constructor(public factor: number) { }

    public execute(lineup: string): string {
        return lineup.substring(lineup.length - this.factor) + lineup.substring(0, lineup.length - this.factor);
    }
}

 class Exchange {
    private static regex = /x(\d+)\/(\d+)/;

    public static parse(instruction: string): Exchange {
        let matches = Exchange.regex.exec(instruction);
        if (!matches) throw new Error("failed to parse: " + instruction);

        return new Exchange(+matches[1], +matches[2]);
    }    
    
    constructor(public idA: number, public idB: number) {
        if (idA > idB) {
            this.idA = idB;
            this.idB = idA;
        }
    }

    public execute(lineup: string): string {
        return lineup.substring(0, this.idA)
            + lineup.charAt(this.idB)
            + ((this.idA === this.idB - 1) ? "" : lineup.substring(this.idA + 1, this.idB))
            + lineup.charAt(this.idA)
            + lineup.substring(this.idB + 1);
    }
}

 class Partner {
    private static regex = /p(\w)\/(\w)/;
     
    public static parse(instruction: string): Partner {
        let matches = Partner.regex.exec(instruction);
        if (!matches) throw new Error("failed to parse: " + instruction);

        return new Partner(matches[1], matches[2]);
    }

    constructor(public progA: string, public progB: string) { }

    public execute(lineup: string): string {
        return new Exchange(lineup.indexOf(this.progA), lineup.indexOf(this.progB)).execute(lineup);
    }
}

class Day16 {
	public helpers = require("./helpers");

    public moveAround(lineup: string, moves: DanceMove[]): string {
        return moves.reduce((lineup, move) => move.execute(lineup), lineup);
    }

    public generateLineup(size: number) {
        return [...new Array(size - 1)]
            .reduce((expr, _) => expr + String.fromCharCode(1 + expr.charCodeAt(expr.length - 1)), "a");
    }

    public dance(input: string, size = 16): string {
        const moves =  input.split(",").map((line) => DanceMoveFactory.create(line))  
        const lineup = this.generateLineup(size);

        return this.moveAround(lineup, moves);
    }

    public danceALot(input: string): string {
        const moves =  input.split(",").map((line) => DanceMoveFactory.create(line))  
        const steps = 1_000_000_000; //magic number from puzzle
        
        let lineups = new Array<string>();
        let lineup = this.generateLineup(16);
        
        for (let i = 0; i < steps; i++) {
            lineups.push(lineup);

            lineup = this.moveAround(lineup, moves);

            if (lineups.indexOf(lineup) !== -1) {
                let cycleSize = i + 1 - lineups.indexOf(lineup);
                let offset = 1 + (i + (steps % cycleSize)) % lineups.length;
                return lineups[offset];
            }
        }
        throw new Error("No solution found");
    }

	public solveForFirstStar(lines: string[]) {
        return this.dance(lines[0]);
    }	

	public solveForSecondStar(lines:string[]) {
		return this.danceALot(lines[0]);
	}
}

export default Day16;
