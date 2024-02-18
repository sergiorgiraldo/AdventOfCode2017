
class Day13 {
	public helpers = require("./helpers");

    public parse(lines: string[]): Map<number, number> {
        const regex: RegExp = /(\d+): (\d+)/;

        let layers = new Map<number, number>();
        
        lines.forEach((line) => {
            let matches = regex.exec(line) as RegExpExecArray;

            layers.set(+matches[1], +matches[2]);
        });

        return layers;
    }

    public getCaughtPositions(layers: Map<number, number>, startTime: number, breakOnCaught = false): number[] {
        const maxLayer = Math.max(...layers.keys());
        
        let caughtPositions = [];

        for (let time = startTime; time < startTime + maxLayer + 1; time++) {
            let layerDepth = layers.get(time - startTime);
            
            if (layerDepth) {
                const position = this.getScannerPosition(layerDepth, time);
                if (position === 0) {
                    caughtPositions.push(time - startTime);

                    if (breakOnCaught) return caughtPositions;
                }
            }
        }

        return caughtPositions;
    }

    //scanner go back and forth
    //e.g  with 3 layers: 0, 1, 2, 1, 0, 1, 2, .. ..
    //e.g  with 4 layers: 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, .. ..
    public getScannerPosition(layerDepth: number, time: number): number {
        if (time < layerDepth) {
            return time;
        }
        
        let roundSize = (2 * layerDepth) - 2; 

        let idx = (time - layerDepth) % roundSize;
        
        if (idx < roundSize / 2) {
            return layerDepth - 2 - idx;
        }

        return roundSize - idx;
    }

	public solveForFirstStar(lines: string[]) {
        const layers = this.parse(lines);
        
        let caughtPositions = this.getCaughtPositions(layers, 0);
        
        return caughtPositions.reduce((acc, position) => {
            const lPosition = layers.get(position);
            
            if (lPosition === undefined) throw new Error("Position not found");

            return acc + position * lPosition;
        }, 0);
	}

	public solveForSecondStar(lines:string[]) {
        const layers = this.parse(lines);
        
        let time = 0;
        let caughtPositions;
        
        do {
            time += 1;
            caughtPositions = this.getCaughtPositions(layers, time, true);
        } 
        while (caughtPositions.length > 0);
        
        return time;
	}
}

export default Day13;
