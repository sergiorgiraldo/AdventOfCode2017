import { expect, test } from "@jest/globals";
import Day15 from "../solutions/lib/day15";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day15();

	let lines: string[] = [];
	lines.push("Generator A starts with 65");
	lines.push("Generator B starts with 8921");

	expect(lib.solveForFirstStar(lines)).toBe(588);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day15();

	let lines: string[] = [];
	lines.push("Generator A starts with 65");
	lines.push("Generator B starts with 8921");

	expect(lib.solveForSecondStar(lines)).toBe(309);
});
