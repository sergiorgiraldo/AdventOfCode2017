import { expect, test } from "@jest/globals";
import Day11 from "../solutions/lib/day11";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day11();

	let lines: string[] = [];

	lines.push("ne,ne,ne");
	expect(lib.solveForFirstStar(lines)).toBe(3);

	lines.length = 0;
	lines.push("ne,ne,sw,sw");
	expect(lib.solveForFirstStar(lines)).toBe(0);

	lines.length = 0;
	lines.push("ne,ne,s,s");
	expect(lib.solveForFirstStar(lines)).toBe(2);

	lines.length = 0;
	lines.push("se,sw,se,sw,sw");
	expect(lib.solveForFirstStar(lines)).toBe(3);
});
