import IPuzzleCalculator from "./IPuzzleCalculator";

interface Link {
    ApplyTo: number;
    ToAdd: number[];
    Exhausted: boolean;
}

export default class Puzzle12Calculator implements IPuzzleCalculator
{

    CalcPart1(input: string): string {
        if (input.length == 0)
            return "";     
        
        let inputs: Link[] = new Array<Link>();

        for(let line of input.split(/\n/)){
            let linehalves = line.split("<->");
            inputs.push({ ApplyTo: +linehalves[0].trim(), ToAdd: linehalves[1].split(",").map((val, index, arr) => { return +val.trim();}), Exhausted: false})
        }

        this.CollapseInputs(inputs);
        return inputs[0].ToAdd.length.toString();
    }

    CalcPart2(input: string): string {
        if (input.length == 0)
            return "";     
            
        let inputs: Link[] = new Array<Link>();
        
        for(let line of input.split(/\n/)){
            let linehalves = line.split("<->");
            inputs.push({ ApplyTo: +linehalves[0].trim(), ToAdd: linehalves[1].split(",").map((val, index, arr) => { return +val.trim();}), Exhausted: false})
        }

        this.CollapseInputs(inputs);

        return inputs.length.toString();
    }

    public CollapseInputs(inputs: Link[]) {
        
        while (inputs.filter((curr, index, arr) => {return !curr.Exhausted;}).length > 0) {
            let toFind = inputs.filter((curr, index, arr) => {return !curr.Exhausted;})[0];
            let stack: number[] = [];
            stack.push(toFind.ApplyTo);
            stack.push(...toFind.ToAdd);

            while (stack.length > 0) {
                let lookingFor = stack.pop();

                for(let x = inputs.length - 1; x >= 0; x--) {
                    if (inputs[x] == toFind)
                        continue;

                    if (inputs[x].ApplyTo == lookingFor || inputs[x].ToAdd.indexOf(lookingFor) >= 0)
                    {
                        let numbersToPush = new Array<number>(...[inputs[x].ApplyTo, ...inputs[x].ToAdd]);
                        if (numbersToPush.length < inputs[x].ToAdd.length + 1)
                            throw "Logic error while constructing the thing";
                        
                        inputs.splice(x, 1);
                        
                        for (let push of numbersToPush) {
                            if (toFind.ApplyTo != push && (toFind.ToAdd.indexOf(push) < 0)) 
                            {
                                toFind.ToAdd.push(push);
                                stack.push(push);
                            }
                        }
                    }    
                }
            }

            toFind.Exhausted = true;
        }
    }

}