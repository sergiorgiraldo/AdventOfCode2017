interface Component {
    id: number;
    port1: number;
    port2: number;
}

class Day24 {
	public helpers = require("./helpers");

	public parse(lines: string[]): Component[] {
		return lines.map((line) => line.split("/").map((port) => +port))
			    .map(([port1, port2], id) => ({ id, port1, port2 }) as Component);
	}

	public *next(comps: Component[], bridge: Component[], end: number): IterableIterator<Component[]> {
		const contenders: Component[] = 
            comps.filter((p) => !bridge.some((bp) => bp.id === p.id) && (p.port1 === end || p.port2 === end));
		
        if (contenders.length === 0) { //nothing else to connect
			yield bridge;
		}
		
        for (const contender of contenders) {
			const nextEnd = contender.port1 === end ? contender.port2 : contender.port1;
			yield *this.next(comps, [...bridge, contender], nextEnd);
		}
	}

	public buildBridge(lines: string[]): number[] {
		const components: Component[] = this.parse(lines);
		const zeroes:Component[] = components.filter((p) => p.port1 === 0 || p.port2 === 0);

		let maxStrength:number = 0;
		let strengthFromLongest:number = 0;
		let maxLength:number = 0;

        zeroes.map((z) => {
			for (const bridge of this.next(components, [z], z.port1 === 0 ? z.port2 : z.port1)) {
				const strength:number = bridge.reduce((s, comp) => s + comp.port1 + comp.port2, 0);

				const length = bridge.length;
				
                maxStrength = Math.max(maxStrength, strength);
				
                if (maxLength < length) {
					maxLength = length;
					strengthFromLongest = strength;
				} 
                else if (maxLength === length && strengthFromLongest < strength) {
					strengthFromLongest = strength;
				}
			}        
        });

		return [maxStrength, strengthFromLongest];
	}

	public solveForFirstStar(lines: string[]) {
		return this.buildBridge(lines)[0];
	}

	public solveForSecondStar(lines: string[]) {
        return this.buildBridge(lines)[1];	
    }
}

export default Day24;
