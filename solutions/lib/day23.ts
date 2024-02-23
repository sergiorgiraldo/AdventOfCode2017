class Duet {
	public registers: { [letter: string]: number };

	constructor() {
		this.registers = {};

        //initialize all registers a-h
        for (let i = 97; i <= 104; i++) {
            this.registers[String.fromCharCode(i)] = 0;
        }
	}

	public getValue(identifier: string): number {
        if (/^[a-z]$/.test(identifier)){
		    return this.registers[identifier];
        }
        else{
			return +identifier;
        }
	}

    // set X Y sets register X to the value of Y
	public set(x: string, y: string) {
		this.registers[x] = this.getValue(y);
	}

    // add X Y increases register X by the value of Y.
	public add(x: string, y: string) {
		this.registers[x] = this.registers[x] + this.getValue(y);
	}

    // mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
	public mul(x: string, y: string) {
		this.registers[x] = this.registers[x] * this.getValue(y);
	}

    //mod X Y sets register X to the result of X modulo Y).
	public mod(x: string, y: string) {
		this.registers[x] = this.registers[x] % this.getValue(y);
	}

    //sub X Y increases register X by the value of Y.
	public sub(x: string, y: string) {
		this.registers[x] = this.registers[x] - this.getValue(y);
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

	public interpret(pt: number): number {
        let mulSent = 0;
        // let runs = 0;
        if (pt === 2) this.buffers.registers["a"] = 1; 

		while (this.nextInstruction < this.instructions.length) {

            // if (pt === 2) {if (this.buffers.getValue("h") == 1) break; else {
            //     runs++; 
            //     console.log(runs, this.buffers.registers);
            //     console.log(this.nextInstruction,">>",this.instructions[this.nextInstruction]);
            // }
            // }

			let instruction = this.instructions[this.nextInstruction];

			this.nextInstruction++;

			let instructionParts = instruction.split(" ");

			if (instructionParts[0]      == "snd") this.playedFrequencies.push(this.buffers.getValue(instructionParts[1]));
			else if (instructionParts[0] == "set") this.buffers.set(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "add") this.buffers.add(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "sub") this.buffers.sub(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "mul") {
                mulSent++;
                this.buffers.mul(instructionParts[1], instructionParts[2]);
            }    
            else if (instructionParts[0] == "mod") this.buffers.mod(instructionParts[1], instructionParts[2]);
			else if (instructionParts[0] == "rcv") this.playedFrequencies[this.playedFrequencies.length - 1];
            else if (instructionParts[0] == "jnz") {
				if (this.buffers.getValue(instructionParts[1]) != 0) {
					this.nextInstruction--;

					this.nextInstruction += this.buffers.getValue(instructionParts[2]);
				}
			} 
            else {
				throw new Error("unknown instruction: " + instruction);
			}            
		}

        if (pt === 1){
            return mulSent;
        }    
        else{ //pt === 2
            return this.buffers.getValue("h");
        }
	}
}

class Day23 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		let interpreter = new DuetInterpreter(lines);

		return interpreter.interpret(1);	
    }

	public solveForSecondStar(lines:string[]) {
        //this is a huuuuuge loop if a = 1
        
		// let interpreter = new DuetInterpreter(lines);

		// return interpreter.interpret(2);		
        
/*
   Duet Code        |                          |   
00 set b 84		    |	b = 84                 |
01 set c b			|	c = b                  |    
02 jnz a 2			|	--a=1, jump to 4--	   |
03 jnz 1 5			|						   | 
04 mul b 100		|	b = b * 100            |    
05 sub b -100000	|	b = b + 100000		   |   let b = 108400
06 set c b			|	c = b				   |	  
07 sub c -17000	    |	c += 17000             |   let c = b + 17000
08 set f 1			|	f = 1                  |   DO let f = 1;
09 set d 2			|	d = 2                  |      let d = 2
10 set e 2			|	e = 2                  |      DO  let e = 2
11 set g d			|	g = d                  |      	 DO 
12 mul g e			|	g = g * e			   |		  	g = (d * e) - b
13 sub g b			|	g = g - b              |
14 jnz g 2			|	if (g <> 0) goto 16    |          	if (g == 0)
15 set f 0			|	f = 0                  |            	f = 0
16 sub e -1		    |	e = e + 1			   |			e++
17 set g e			|	g = e                  |          	
18 sub g b			|	g = g - b              |          	g = e - b
19 jnz g -8		    |	if (g <> 0) goto 11    |       	 UNTIL g == 0
20 sub d -1		    |	d = d + 1	           |         d++;
21 set g d			|	g = d				   | 
22 sub g b			|	g = g - b              |         g = d - b
23 jnz g -13		|	if (g <> 0) goto 10    |      UNTIL g == 0
24 jnz f 2			|	if (f <> 0) goto 26    |      if (f == 0)
25 sub h -1		    |	h = h + 1              |          h++
26 set g b			|	g = b                  |        
27 sub g c			|	g = g - c              |      g = b - c
28 jnz g 2			|	if (g <> 0) goto 30    |       
29 jnz 1 3			|	goto 32(END)           | 
30 sub b -17		|	b = b + 17			   |	  b = b + 17
31 jnz 1 -23		|	goto 11                |   UNTIL g == 0 			
END                 |                          |   return h
*/
        let h = 0;
        let b = 108_400;
        let c = b + 17_000;

        for (let idx = b; idx <= c; idx += 17) {
            for (let j = 2; j < idx; j++) {
                if (idx % j === 0) {
                    h++;
                    break;
                }
            }
        }
        return h;
    }
}

export default Day23;
