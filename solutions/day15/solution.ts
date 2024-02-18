import Day15 from '../lib/day15';

const path = require("path");
const fs_ = require("fs");
const helpers_ = require("../lib/helpers");

fs_.unlinkSync(path.join(__dirname, "answer.txt"));
fs_.writeFileSync(path.join(__dirname, "answer.txt"), "");

function report(...args:string[]) {
	fs_.writeFileSync(path.join(__dirname, "answer.txt"), args.join(",") + "\n", {flag: "a"});
	console.log(args.join(" "));	
}

 function run():void {
	helpers_.which.env = "prod";

	const filePath:string = path.join(__dirname, "input.txt");
	const lines:string[] = fs_.readFileSync(filePath).toString().split("\n").slice(0, -1);

	 solveForFirstStar_(lines);
	 solveForSecondStar_(lines);
}

 function solveForFirstStar_(lines:string[]):void{
	const lib = new Day15();

	const start:number = Date.now();

	let result:number =  lib.solveForFirstStar(lines);

	const end:number = Date.now();

	report("Solution 1", result.toString(), ` Execution time: ${end - start} ms`);
}

 function solveForSecondStar_(lines:string[]):void{
	const lib = new Day15();

	const start = Date.now();

	let result:number =  lib.solveForSecondStar(lines);

	const end = Date.now();

	report("Solution 2", result.toString(), ` Execution time: ${end - start} ms`);
}

run();
