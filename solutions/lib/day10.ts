
class Day10 {
	public helpers = require("./helpers");

    public computeSparseHash(size: number, lengths: number[], steps: number): number[] {
        let marks = [...Array(size).keys()];
        let idx = 0;
        let skip = 0;
        for (let step = 0; step < steps; step++) {
            lengths.forEach((length) => {
                marks = this.sortMarks(marks, idx, length);
                idx += length + skip++;
            });
        }
        return marks;
    }

    public sortMarks(marks: number[], idx: number, length: number): number[] {
        let startIdx = idx;
        let endIdx = startIdx + length - 1;

        while (startIdx < endIdx) {
            let firstValue = marks[startIdx % marks.length];

            marks[startIdx % marks.length] = marks[endIdx % marks.length];
            marks[endIdx % marks.length] = firstValue;
            
            startIdx++;
            endIdx--;
        }

        return marks;
    }

    public computeDenseHash(sparseHash: number[]): number[] {
        let denseHash: number[] = new Array<number>();

        for(let i = 0; i < 16; i++)
        {
            let wordStart = i * 16;
            let wordBit = sparseHash[wordStart];
            for (let j = 1; j < 16; j++) {
                wordBit ^= sparseHash[wordStart + j];
            }
            denseHash.push(wordBit);
        }

        return denseHash;
    }

    public getHexRepresentation(denseHash: number[]): string {
        let result = "";
        for(let i = 0; i < 16; i++)
        {
            let digit = denseHash[i].toString(16);
            if (digit.length == 1)
                result += "0" + digit;
            else
                result += digit;
        }

        return result;    
    }

    public computeKnotHash(input: string): string {
        let lengths:Array<number> = [];

        for(let c of input) {
            lengths.push(c.charCodeAt(0));
        }

        lengths.push(17, 31, 73, 47, 23);

        let hash = this.computeSparseHash(256, lengths, 64);
        
        let denseHash = this.computeDenseHash(hash);
        
        let hexString = this.getHexRepresentation(denseHash);
        
        return hexString;	
    }

	public solveForFirstStar(lines: string[]) {
        const hash = this.computeSparseHash(256, lines[0].split(",").map(Number), 1);

        return hash[0] * hash[1];	
    }

	public solveForSecondStar(lines:string[]) {
        return this.computeKnotHash(lines[0]);	
    }
}

export default Day10;
