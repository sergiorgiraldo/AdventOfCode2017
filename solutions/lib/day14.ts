import Day10 from "./day10";

class Day14 {
	public helpers = require("./helpers");

    private day10 = new Day10(); //knot hasher

    public getDisk(input: string): string[] {
        let disk:Array<string> = [];
        
        for (let step = 0; step < 128; step++) {

            let hash = this.day10.computeKnotHash(input + "-" + step);

            disk.push(this.hexToBinary(hash));
        }

        return disk;
    }

    public hexToBinary(hash: string):string{
        const result = hash.split("").reduce((acc, char) => 
            acc + ("000" + (parseInt(char, 16)).toString(2)).slice(-4), 
            "");
        
        return result;
    }

    public getGroups(input:string): number{
        let nodes = new Map<string, number>();
        let groups = new Map<number, string[]>();
        let idGroup = 0;

        let disk = this.getDisk(input);

        for (let y = 0; y < disk.length; y++) {
            for (let x = 0; x < disk[y].length; x++) {
                let bit = disk[y][x];

                if (bit === "1") {
                    let adjGroups = this.findAdjacentGroups(nodes, x, y);

                    if (adjGroups.size === 0) {
                        groups.set(idGroup, [this.encode(x, y)]);
                        nodes.set(this.encode(x, y), idGroup++);
                    } 
                    else {
                        let currGroupId: number | undefined = undefined;

                        for (let groupId of adjGroups) {
                            if (currGroupId === undefined) {
                                currGroupId = groupId;
                                continue;
                            }

                            for (let node of (groups.get(groupId) as string[])) {
                                nodes.set(node, currGroupId);
                            }
                            
                            //merge the groups
                            ([] as Array<string>).push.apply(groups.get(currGroupId), (groups.get(groupId) as string[]));
                            
                            groups.delete(groupId);
                        }

                        if (currGroupId === undefined) throw new Error("No group found");

                        nodes.set(this.encode(x, y), currGroupId);

                        (groups.get(currGroupId) as string[]).push(this.encode(x, y));
                    }
                }
            }
        }
        return groups.size;
    }

    public findAdjacentGroups(nodes: Map<string, number>, x: number, y: number): Set<number> {
        return (new Set(this.getNeighbours(x, y)
                .filter((neighbour) => nodes.has(neighbour))
                .map((neighbour) => nodes.get(neighbour)))) as Set<number>;
    }

    public getNeighbours(x: number, y: number): string[] {
        let neighbours = [];
        
        neighbours.push(this.encode(x - 1, y));
        neighbours.push(this.encode(x + 1, y));
        neighbours.push(this.encode(x    , y - 1));
        neighbours.push(this.encode(x    , y + 1));

        return neighbours;
    }

    public encode(x: number, y: number): string {
        return `${x}|${y}`;
    }

	public solveForFirstStar(lines: string[]) {
        return this.getDisk(lines[0]).reduce((acc, hash) => 
            acc + hash.split("").filter((bit) => bit === "1").length, 
            0);
	}

	public solveForSecondStar(lines:string[]) {
		return this.getGroups(lines[0]);
	}
}

export default Day14;
