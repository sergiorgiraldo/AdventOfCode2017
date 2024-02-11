
	import { expect, test } from "@jest/globals";
	import Day4 from "../solutions/lib/day4";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day4();
	
		let lines:string[] = [];
		lines.push("aa bb cc dd ee");
		lines.push("aa bb cc dd aa");
		lines.push("aa bb cc dd aaa");

		expect(lib.solveForFirstStar(lines)).toBe(2);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day4();
	
		let lines:string[] = [];
		lines.push("abcde fghij");
		lines.push("abcde xyz ecdab");
		lines.push("a ab abc abd abf abj");
		lines.push("iiii oiii ooii oooi oooo");
		lines.push("oiii ioii iioi iiio");

		expect(lib.solveForSecondStar(lines)).toBe(3);
	});
	