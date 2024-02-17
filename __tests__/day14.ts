import { expect, test } from "@jest/globals";
import Day14 from "../solutions/lib/day14";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day14();

	let lines: string[] = [];
	lines.push("flqrgnkx");

	expect(lib.solveForFirstStar(lines)).toBe(8_108);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day14();

	let lines: string[] = [];
	lines.push("flqrgnkx");

	expect(lib.solveForSecondStar(lines)).toBe(1_242);
});
