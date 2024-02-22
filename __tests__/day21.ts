import { expect, test } from "@jest/globals";
import Day21 from "../solutions/lib/day21";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day21();

	let lines: string[] = [];
	lines.push("../.# => ##./#../...");
	lines.push(".#./..#/### => #..#/..../..../#..#");

	expect(lib.enhance(lines, 2)).toBe(12);
});
