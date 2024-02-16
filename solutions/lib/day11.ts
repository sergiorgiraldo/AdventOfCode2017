class Position {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
}

class Day11 {
	public helpers = require("./helpers");

    //by using x/y/z, we can use each directions as only one step
    //by using x/y it would need 2 steps for some directions
    //idea taken from here: https://www.redblobgames.com/grids/hexagons/#coordinates-cube
    public directions: { [key: string]: { x: number, y: number, z: number } } = {
        "n" : { x:  0,  y:  1,  z: -1 },
        "ne": { x:  1,  y:  0,  z: -1 },
        "nw": { x: -1,  y:  1,  z:  0 },
        "s" : { x:  0,  y: -1,  z:  1 },
        "se": { x:  1,  y: -1,  z:  0 },
        "sw": { x: -1,  y:  0,  z:  1 },
    };

    //the gotcha is that you already have the steps, so just walk using them and 
    //find the distance from (0,0,0)
    public walkTheGrid(steps: string, pt: number): number {
        let maxDistance = 0;

        const finalPosition = steps.split(",").reduce((position, step) => {
            position.x += this.directions[step].x;
            position.y += this.directions[step].y;
            position.z += this.directions[step].z;

            maxDistance = Math.max(maxDistance, this.getDistance(position));
            
            return position;
        }, new Position());

        if (pt === 1) {
            return this.getDistance(finalPosition);
        }
        else{ //pt === 2 
            return maxDistance;
        }
    }

    public getDistance(position: Position): number {
        // every edge requires 2 steps in a x/y/z direction
        // for example / (ne) requires 2 steps, one x and one z
        // so calculating the manhattan distance requires the value to be divided by 2
        return (Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z)) / 2;
    }

	public solveForFirstStar(lines: string[]) {
		return this.walkTheGrid(lines[0], 1);
	}

	public solveForSecondStar(lines:string[]) {
		return this.walkTheGrid(lines[0], 2);
	}
}

export default Day11;
