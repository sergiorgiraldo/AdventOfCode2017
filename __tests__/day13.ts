import { expect, test } from "@jest/globals";
import Day13 from "../solutions/lib/day13";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day13();

	let lines: string[] = [];
	lines.push("0: 3");
	lines.push("1: 2");
	lines.push("4: 4");
	lines.push("6: 4");

	expect(lib.solveForFirstStar(lines)).toBe(24);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day13();

	let lines: string[] = [];
	lines.push("0: 3");
	lines.push("1: 2");
	lines.push("4: 4");
	lines.push("6: 4");

	expect(lib.solveForSecondStar(lines)).toBe(10);
});
