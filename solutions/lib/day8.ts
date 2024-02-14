class Register {
    public name: string;
    public value: number;
    public highestValue: number;

	constructor(name: string) {
		this.name = name;
		this.value = 0;
		this.highestValue = 0;
	}

	public SetValue(newValue: number) {
		this.value = newValue;
        this.highestValue = Math.max(this.highestValue, newValue);
	}
}
class Instruction {
    public name: string;
    public operation: string;
    public value: number;
    public conditionName: string;
    public conditionOperator: string;
    public conditionValue: number;

	constructor(line: string) {
		const tokens = line.split(/\s/); // b inc 5 if a > 1

		this.name = tokens[0];
		this.operation = tokens[1];
		this.value = +tokens[2];
		this.conditionName = tokens[4];
		this.conditionOperator = tokens[5];
		this.conditionValue = +tokens[6];
	}
}

class Day8 {
	public helpers = require("./helpers");

    public run(lines: string[], pt: number) : number {
        const instructions = this.parse(lines);

        const instructionNames = instructions.map((i) => i.name);
        const conditionNames = instructions.map((i) => i.conditionName);
        const uniqueNames = [...new Set([...instructionNames, ...conditionNames])];

        let registers = uniqueNames.map((nm) => new Register(nm));

        for (let instruction of instructions) {
            let registerToUpdate = registers.find((r) => r.name == instruction.name) as Register;
            let registerToCheck = registers.find((r) => r.name == instruction.conditionName) as Register;

            let applyInstruction = false;
            switch(instruction.conditionOperator) {
                case "<"    : applyInstruction = (registerToCheck.value <  instruction.conditionValue); break;
                case ">"    : applyInstruction = (registerToCheck.value >  instruction.conditionValue); break;
                case ">="   : applyInstruction = (registerToCheck.value >= instruction.conditionValue); break;
                case "<="   : applyInstruction = (registerToCheck.value <= instruction.conditionValue); break;
                case "!="   : applyInstruction = (registerToCheck.value != instruction.conditionValue); break;
                case "=="   : applyInstruction = (registerToCheck.value == instruction.conditionValue); break;
                default: throw "NOT IMPLEMENTED";
            }
            
            if (applyInstruction) {
                if (instruction.operation == "inc")
                    registerToUpdate.SetValue(registerToUpdate.value + instruction.value);
                if (instruction.operation == "dec")
                    registerToUpdate.SetValue(registerToUpdate.value - instruction.value);
            }
        }

        let result!: number;

        if (pt === 1){
            result = registers.reduce((prev, curr) => Math.max(curr.value, prev), 0);
        }
        else{ //pt === 2
            result = registers.reduce((prev, curr) => Math.max(curr.highestValue, prev), 0);
        };

        return result;
    }

    public parse(lines: string[]): Instruction[]
    {
        let result = lines.map((line) => new Instruction(line));
        return result;
    }

	public solveForFirstStar(lines: string[]) {
        return this.run(lines, 1);
	}

	public solveForSecondStar(lines: string[]) {
        return this.run(lines, 2);
	}
}

export default Day8;
