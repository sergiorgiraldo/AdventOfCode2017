import { expect, test } from "@jest/globals";
import Day12 from "../solutions/lib/day12";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day12();

	let lines: string[] = [];
	lines.push("0 <-> 2");
	lines.push("1 <-> 1");
	lines.push("2 <-> 0, 3, 4");
	lines.push("3 <-> 2, 4");
	lines.push("4 <-> 2, 3, 6");
	lines.push("5 <-> 6");
	lines.push("6 <-> 4, 5");

	expect(lib.solveForFirstStar(lines)).toBe(6);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day12();

	let lines: string[] = [];
	lines.push("0 <-> 2");
	lines.push("1 <-> 1");
	lines.push("2 <-> 0, 3, 4");
	lines.push("3 <-> 2, 4");
	lines.push("4 <-> 2, 3, 6");
	lines.push("5 <-> 6");
	lines.push("6 <-> 4, 5");

	expect(lib.solveForSecondStar(lines)).toBe(2);
});
