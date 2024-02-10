
	import { expect, test } from "@jest/globals";
	import Day3 from "../solutions/lib/day3";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day3();
	
		let lines:string[] = [];

		lines.push("1");
		expect(lib.solveForFirstStar(lines)).toBe(0);

		lines.length = 0;
		lines.push("12");
		expect(lib.solveForFirstStar(lines)).toBe(3);
		
		lines.length = 0;
		lines.push("23");
		expect(lib.solveForFirstStar(lines)).toBe(2);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day3();
	
		let lines:string[] = [];

		lines.push("12");
		expect(lib.solveForSecondStar(lines)).toBe(23);

		lines.length = 0;
		lines.push("748");
		expect(lib.solveForSecondStar(lines)).toBe(806);
	});
	