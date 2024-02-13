class Register {
	constructor(name: string) {
		this.name = name;
		this.value = 0;
		this.highestValue = 0;
	}

	public name: string;
	public value: number;
	public highestValue: number;

	SetValue(newVal: number) {
		this.value = newVal;
        this.highestValue = Math.max(this.highestValue, newVal);
	}
}

class RegisterLog {
	[letter: string]: Register;
}

class Instruction {
	constructor(line: string) {
		let words = line.split(/\s/); // b inc 5 if a > 1
		this.name = words[0];
		this.instruction = words[1];
		this.value = +words[2];
		this.conditionName = words[4];
		this.instructionCondition = words[5];
		this.conditionValue = +words[6];
	}

	public name: string;
	public instruction: string;
	public value: number;
	public conditionName: string;
	public instructionCondition: string;
	public conditionValue: number;
}

class Day8 {
	public helpers = require("./helpers");

    public run(lines: string[], pt: number) : number {
        const instructions = this.parse(lines);

        const instructionNames = instructions.map((i) => i.name);
        const conditionNames = instructions.map((i) => i.conditionName);

        let uniqueNames = [...new Set([...instructionNames, ...conditionNames])];

        let allRegisters = uniqueNames.map((nm) => new Register(nm));

        let registers: RegisterLog = {};

        allRegisters.forEach((register) => registers[register.name] = register);

        for (let instruction of instructions) {
            let registerToUpdate = registers[instruction.name];
            let registerToCheck = registers[instruction.conditionName];

            let applyInstruction = false;
            switch(instruction.instructionCondition) {
                case "<"    : applyInstruction = registerToCheck.value <  instruction.conditionValue; break;
                case ">"    : applyInstruction = registerToCheck.value >  instruction.conditionValue; break;
                case ">="   : applyInstruction = registerToCheck.value >= instruction.conditionValue; break;
                case "<="   : applyInstruction = registerToCheck.value <= instruction.conditionValue; break;
                case "!="   : applyInstruction = registerToCheck.value != instruction.conditionValue; break;
                case "=="   : applyInstruction = registerToCheck.value == instruction.conditionValue; break;
                default: throw "NOT IMPLEMENTED";
            }
            if (applyInstruction) {
                if (instruction.instruction == "inc")
                    registerToUpdate.SetValue(registerToUpdate.value + instruction.value);
                if (instruction.instruction == "dec")
                    registerToUpdate.SetValue(registerToUpdate.value - instruction.value);
            }
        }

        let result!: number;

        if (pt === 1){
            result = allRegisters.reduce((prev, curr) => Math.max(curr.value, prev),0);
        }
        else{
            result = allRegisters.reduce((prev, curr) => Math.max(curr.highestValue, prev),0);
        };

        return result;
    }

    public parse(lines: string[]): Instruction[]
    {
        let result = lines.map((val) => new Instruction(val));
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
