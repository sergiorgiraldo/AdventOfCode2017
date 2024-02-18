class Garbage {
    public Stream: string;

    constructor() {
        this.Stream = "<";
    }
}

class Group {
    public Stream: string;
    public Groups: Group[];
    public Garbages: Garbage[];

    constructor() {
        this.Stream = "{";
        this.Groups = new Array<Group>();
        this.Garbages = new Array<Garbage>();
    }
}

class Day9 {
	public helpers = require("./helpers");

    public getGroupScore(parentGroup: Group, parentScore: number = 0): number {
        return parentGroup.Groups.reduce(
            (acc, curr) => acc + this.getGroupScore(curr, parentScore + 1), parentScore + 1);
    }

    public countGarbage(group: Group) : number {
        let result = 0;
    
        result = group.Garbages.reduce(
            (acc, curr) => acc + curr.Stream.length - 2, result); //ignore open and close tokens, < and >

        result = group.Groups.reduce(
            (acc, curr) => acc + this.countGarbage(curr), result);

        return result;
    }

    public parse(input: string): Group {
        let groupStack = new Array<Group>();
        let ignoreNextChar = false;
        let inGarbage = false;
        let currentGroup: Group|undefined = undefined;
        let currentGarbage: Garbage|undefined = undefined;
        let result!: Group;

        for(let chr of input){
            if (chr === "!" || ignoreNextChar) 
            {
                ignoreNextChar = !ignoreNextChar;
                continue;
            } 

            if (inGarbage) {
                if (chr === ">") {
                    inGarbage = false;
                    currentGarbage = undefined;
                }
            } 
            else {
                if (chr === "{") {
                    let parent = currentGroup;

                    if (currentGroup !== undefined) groupStack.push(currentGroup);
                    
                    currentGroup = new Group();

                    if (groupStack.length == 0) result = currentGroup;
                    
                    if (parent !== undefined) parent.Groups.push(currentGroup);                       
                }
                else if (chr === "}") {                       
                    (currentGroup as Group).Stream += "}";     

                    currentGroup = groupStack.pop();
                }   
                else if (chr === "<") { 
                    inGarbage = true;
                    
                    currentGarbage = new Garbage();
                    
                    if (currentGroup !== undefined) currentGroup.Garbages.push(currentGarbage);
                }
            }
            
            if (currentGroup !== undefined) {
                if (chr != "{" && chr != "}") currentGroup.Stream += chr;
            }

            if (currentGarbage != undefined) currentGarbage.Stream += chr;
        }

        return result as Group;
    }

	public solveForFirstStar(lines: string[]) {
        const group = this.parse(lines[0]);
        
        return this.getGroupScore(group);	
    }
    
	public solveForSecondStar(lines:string[]) {
        const group = this.parse(lines[0]);

        return this.countGarbage(group);	
    }
}

export default Day9;
