import { expect, test } from "@jest/globals";
import Day17 from "../solutions/lib/day17";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day17();

	let lines: string[] = [];
	lines.push("3");

	expect(lib.solveForFirstStar(lines)).toBe(638);
});
