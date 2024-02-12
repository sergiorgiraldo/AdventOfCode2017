class Tree {
	public nodes!: Node[];
	public nodesMap = new Map<string, Node>();
	public root!: Node;
}

class Node {
	private static regex = /(\w+)\s+\((\d+)\)(?:\s->\s+(.+))?/;

	public id!: string;
	public weight!: number;
	public connections!: string;
	public next: (Node|undefined)[] = [];
	public prev: (Node|undefined)[] = [];

	constructor(input: string) {
		let matches: RegExpExecArray | null = Node.regex.exec(input);

        if (matches){
            this.id = matches[1];
            this.weight = parseInt(matches[2], 10);
            this.connections = matches[3];
        }
	}
}

class Day7 {
	public helpers = require("./helpers");

	public parseTree(input: string[]): Tree {
		let tree = new Tree();

		tree.nodes = input.map((line) => new Node(line));
		
        tree.nodes.forEach((node) => tree.nodesMap.set(node.id, node));
		
        tree.nodes.forEach((node) => {
			node.next = node.connections
				? node.connections.split(", ")?.map((next) => tree.nodesMap.get(next))
				: [];
			node.next.forEach((next) => {
				if (next) tree.nodesMap.get(next.id)?.prev.push(node);
            }
			);
		});
		
        const root = tree.nodes.find((node) => node.prev.length === 0);

        if (root){
            tree.root = root;
        }
        else{
            throw Error("No root found");
        }

        return tree;
	}

    public getStackWeight(node: Node): number {
        return node.next.reduce((weight, child) => weight + this.getStackWeight(child as Node), node.weight);
    }

    public getNewWeightForBalance(node: Node): number {
        let previousStackWeight: number = 0;
        let previous: Node = node as Node;

        for (let child of node.next) {
            let newWeight = this.getNewWeightForBalance(child as Node);
            if (newWeight) {
                return newWeight;
            }

            if (!child) throw Error("Which node???");

            let stackWeight = this.getStackWeight(child);
            if (previousStackWeight && previousStackWeight !== stackWeight) {
                if (previousStackWeight > stackWeight) {
                    return previous.weight - previousStackWeight + stackWeight;
                }
                return child.weight - stackWeight + previousStackWeight;
            }
            previousStackWeight = stackWeight;
            previous = child;
        }

        return 0;
    }

	public solveForFirstStar(lines: string[]) {
		return this.parseTree(lines).root.id;
	}

	public solveForSecondStar(lines: string[]) {
        let tree = this.parseTree(lines);

        return this.getNewWeightForBalance(tree.root as Node);
	}
}

export default Day7;
