
	import { expect, test } from "@jest/globals";
	import Day6 from "../solutions/lib/day6";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day6();
	
		let lines:string[] = [];
		lines.push("0	2	7	0");

		expect(lib.solveForFirstStar(lines)).toBe(5);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day6();
	
		let lines:string[] = [];
		lines.push("0	2	7	0");

		expect(lib.solveForSecondStar(lines)).toBe(4);
	});
	