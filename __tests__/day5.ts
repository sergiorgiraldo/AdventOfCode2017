import { expect, test } from "@jest/globals";
import Day5 from "../solutions/lib/day5";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day5();

	let lines: string[] = [];
	lines.push("0");
	lines.push("3");
	lines.push("0");
	lines.push("1");
	lines.push("-3");

	expect(lib.solveForFirstStar(lines)).toBe(5);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day5();

	let lines: string[] = [];
	lines.push("0");
	lines.push("3");
	lines.push("0");
	lines.push("1");
	lines.push("-3");

	expect(lib.solveForSecondStar(lines)).toBe(10);
});
