import { expect, test } from "@jest/globals";
import Day24 from "../solutions/lib/day24";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day24();

	let lines: string[] = [];
	lines.push("0/2");
	lines.push("2/2");
	lines.push("2/3");
	lines.push("3/4");
	lines.push("3/5");
	lines.push("0/1");
	lines.push("10/1");
	lines.push("9/10");

	expect(lib.solveForFirstStar(lines)).toBe(31);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day24();

	let lines: string[] = [];
	lines.push("0/2");
	lines.push("2/2");
	lines.push("2/3");
	lines.push("3/4");
	lines.push("3/5");
	lines.push("0/1");
	lines.push("10/1");
	lines.push("9/10");

	expect(lib.solveForSecondStar(lines)).toBe(19);
});
