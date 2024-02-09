import { expect, test } from "@jest/globals";
import Day2 from "../solutions/lib/day2";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day2();

	let lines: string[] = [];
	lines.push("5 1 9 5");
	lines.push("7 5 3");
	lines.push("2 4 6 8");

	expect(lib.solveForFirstStar(lines)).toBe(18);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day2();

	let lines: string[] = [];
	lines.push("5 9 2 8");
	lines.push("9 4 7 3");
	lines.push("3 8 6 5");

	expect(lib.solveForSecondStar(lines)).toBe(9);
});
