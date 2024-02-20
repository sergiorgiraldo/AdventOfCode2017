
class Duet {
	private registers: { [letter: string]: number };

	constructor() {
		this.registers = {};

        //initialize all registers a-z
        for (let i = 97; i <= 122; i++) {
            this.registers[String.fromCharCode(i)] = 0;
        }
	}

	public GetValue(identifier: string): number {
        if (/^[a-z]$/.test(identifier)){
		    return this.registers[identifier];
        }
        else{
			return +identifier;
        }
	}

    // set X Y sets register X to the value of Y
	public Set(x: string, y: string) {
		this.registers[x] = this.GetValue(y);
	}

    // add X Y increases register X by the value of Y.
	public Add(x: string, y: string) {
		this.registers[x] = this.registers[x] + this.GetValue(y);
	}

    // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
	public Mul(x: string, y: string) {
		this.registers[x] = this.registers[x] * this.GetValue(y);
	}

    //mod X Y sets register X to the result of X modulo Y).
	public Mod(x: string, y: string) {
		this.registers[x] = this.registers[x] % this.GetValue(y);
	}
}

class DuetInterpreter {
	private buffers: Duet;
	private playedFrequencies: number[];
    private instructions: string[];
    private nextInstruction: number;
    
	constructor(instructions: string[]) {
        this.buffers = new Duet();
		this.playedFrequencies = new Array<number>();
        this.instructions = instructions;
        this.nextInstruction = 0;
	}

	public interpret(): number {
		while (true) {
			let instruction = this.instructions[this.nextInstruction];

			this.nextInstruction++;

			let instructionParts = instruction.split(" ");

			if (instructionParts[0]      == "snd") this.playedFrequencies.push(this.buffers.GetValue(instructionParts[1]));
			else if (instructionParts[0] == "set") this.buffers.Set(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "add") this.buffers.Add(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "mul") this.buffers.Mul(instructionParts[1], instructionParts[2]);
            else if (instructionParts[0] == "mod") this.buffers.Mod(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "rcv") {
				if (this.buffers.GetValue(instructionParts[1]) != 0) {
					return this.playedFrequencies[this.playedFrequencies.length - 1];
				}
			} 
            else if (instructionParts[0] == "jgz") {
				if (this.buffers.GetValue(instructionParts[1]) != 0) {
					this.nextInstruction--;

					this.nextInstruction += this.buffers.GetValue(instructionParts[2]);
				}
			} 
            else {
				throw new Error("unknown instruction: " + instruction);
			}
		}
	}
}

type ExitStatus = {
    Terminated: boolean;
    Deadlocked: boolean;
}

class DuetDblInterpreter {
    private buffers: Duet;
    private sentFrequencies: number[];
    private instructions: string[];
    private nextInstruction: number;
    private otherInterpreter!: DuetDblInterpreter;
    public sendCount: number;

    constructor(instructions: string[], pRegister: number, other: DuetDblInterpreter|undefined) {
        this.buffers = new Duet();
        this.buffers.Set("p", pRegister.toString());
        this.sentFrequencies = new Array<number>();
        this.instructions = instructions;
        this.nextInstruction = 0;
        this.sendCount = 0;
        if (other) this.setOtherInterpreter(other);
    }

    private setOtherInterpreter(interpreter: DuetDblInterpreter) {
        this.otherInterpreter = interpreter;
        interpreter.otherInterpreter = this;
    }

    public interpret(): ExitStatus {
        let result: ExitStatus = {Deadlocked: false, Terminated: false};

        let instruction = this.instructions[this.nextInstruction];
        
        this.nextInstruction++;

        let instructionParts = instruction.split(" ");
        
        if (instructionParts[0]      == "snd") {
            this.sentFrequencies.push(this.buffers.GetValue(instructionParts[1]));
            this.sendCount++;
        } 
        else if (instructionParts[0] == "set") this.buffers.Set(instructionParts[1], instructionParts[2]);
        else if (instructionParts[0] == "add") this.buffers.Add(instructionParts[1], instructionParts[2]);
        else if (instructionParts[0] == "mul") this.buffers.Mul(instructionParts[1], instructionParts[2]);
        else if (instructionParts[0] == "mod") this.buffers.Mod(instructionParts[1], instructionParts[2]);
        else if (instructionParts[0] == "rcv") {
            if (this.otherInterpreter.sentFrequencies.length > 0) {
                let received = this.otherInterpreter.sentFrequencies.shift();
                
                if (received === undefined) throw new Error("didn't receive anything");

                this.buffers.Set(instructionParts[1], received.toString());
            } 
            else {                
                this.nextInstruction--;
                result.Deadlocked = true;
            }
        }
        else if (instructionParts[0] == "jgz") {
            if (this.buffers.GetValue(instructionParts[1]) > 0) {
                this.nextInstruction--;
                this.nextInstruction += this.buffers.GetValue(instructionParts[2]);
            }
        } 
        else {
            throw new Error("unknown instruction: " + instruction);
        }
        
        result.Terminated = this.nextInstruction < 0 || this.nextInstruction >= this.instructions.length;

        return result;
    }
}


class Day18 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		let interpreter = new DuetInterpreter(lines);

		return interpreter.interpret();
	}

	public solveForSecondStar(lines: string[]) {        
        let interpreterA = new DuetDblInterpreter(lines, 0, undefined);
        let interpreterB = new DuetDblInterpreter(lines, 1, interpreterA);

        while(true)
        {
            const statusA = interpreterA.interpret();
            const statusB = interpreterB.interpret();

            if (statusA.Terminated && statusB.Terminated) break;
            if (statusA.Deadlocked && statusB.Deadlocked) break;
            if (statusA.Terminated && statusB.Deadlocked) break;
            if (statusA.Deadlocked && statusB.Terminated) break;
        }

        return interpreterB.sendCount;
	}
}

export default Day18;
