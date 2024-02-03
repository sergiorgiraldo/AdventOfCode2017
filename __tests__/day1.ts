
	import { expect, test } from "@jest/globals";
	import Day1 from "../solutions/lib/day1";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day1();
	
		let lines:string[] = [];

		lines.length = 0;
		lines.push("1122");
		expect(lib.solveForFirstStar(lines)).toBe(3);

		lines.length = 0;
		lines.push("1111");
		expect(lib.solveForFirstStar(lines)).toBe(4);

		lines.length = 0;
		lines.push("91212129");
		expect(lib.solveForFirstStar(lines)).toBe(9);

		lines.length = 0;
		lines.push("1234");
		expect(lib.solveForFirstStar(lines)).toBe(0);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day1();
	
		let lines:string[] = [];

		lines.length = 0;
		lines.push("1212");
		expect(lib.solveForSecondStar(lines)).toBe(6);

		lines.length = 0;
		lines.push("1221");
		expect(lib.solveForSecondStar(lines)).toBe(0);

		lines.length = 0;
		lines.push("123425");
		expect(lib.solveForSecondStar(lines)).toBe(4);

		lines.length = 0;
		lines.push("12131415");
		expect(lib.solveForSecondStar(lines)).toBe(4);
	});
	