
class Day6 {
	public helpers = require("./helpers");

    public getStateValue(blocks: Array<number>): string {
        return blocks.reduce((acc, curr) => acc.toString() + " " + curr.toString(), "");       
    }

    public redistributeBlocks(configuration: string, getLoopSize: boolean): number {
        let blocks: Array<number> = configuration.split(/\s/).map(Number);
        let states: Array<string> = [];
        let redistributionCycles = 0;

        while (true){
            let currentState = this.getStateValue(blocks);
            const seenState = states.findIndex((config) => config === currentState);

            if (seenState >= 0){
                if (getLoopSize){
                    return states.length - seenState;
                }
                else{
                    break;
                }
            } 
            else {
                states.push(currentState);
                redistributionCycles += 1;

                let maxValue = Math.max(...blocks);
                
                let workIndex = blocks.indexOf(maxValue);
                blocks[workIndex] = 0;

                while (maxValue > 0){
                    workIndex += 1;
                    if (workIndex >= blocks.length) workIndex = 0;
                    blocks[workIndex] += 1;
                    maxValue -= 1;
                }
            }            
        }
        return redistributionCycles;
    }

	public solveForFirstStar(lines: string[]) {
        return this.redistributeBlocks(lines[0], false);
	}
    
	public solveForSecondStar(lines:string[]) {
        return this.redistributeBlocks(lines[0], true);
	}
}

export default Day6;
