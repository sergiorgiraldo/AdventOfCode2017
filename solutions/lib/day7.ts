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
	public prev: Node|undefined = undefined;

	constructor(input: string) {
		const matches: RegExpExecArray | null = Node.regex.exec(input);

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
            if (node.connections){
                node.next = node.connections.split(", ").map((next) => tree.nodesMap.get(next));

                node.next.forEach((next) => {
                    let nextNode = tree.nodesMap.get((next as Node).id) as Node;
                    nextNode.prev = node;
                });
            }
		});
		
        const root = tree.nodes.find((node) => node.prev === undefined);

        if (root){
            tree.root = root;
        }
        else{
            throw Error("No root found");
        }

        return tree;
	}

    public getStackWeight(node: Node): number {
        return node.next.reduce((acc, child) => acc + this.getStackWeight(child as Node), node.weight);
    }

    public getNewWeightForBalance(node: Node): number {
        let currentStackWeight: number = 0;
        let prev: Node = node as Node;

        for (let child_ of node.next) {
            const child = child_ as Node;

            let newWeight = this.getNewWeightForBalance(child);
            if (newWeight) {
                return newWeight;
            }

            let stackWeight = this.getStackWeight(child);
            if (currentStackWeight && currentStackWeight !== stackWeight) {
                if (currentStackWeight > stackWeight) {
                    return prev.weight - currentStackWeight + stackWeight;
                }
                return child.weight - stackWeight + currentStackWeight;
            }
            currentStackWeight = stackWeight;
            prev = child;
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
