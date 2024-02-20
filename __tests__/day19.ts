import { expect, test } from "@jest/globals";
import Day19 from "../solutions/lib/day19";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day19();

	let lines: string[] = [];
	lines.push("     |          ");
	lines.push("     |  +--+    ");
	lines.push("     A  |  C    ");
	lines.push(" F---|----E|--+ ");
	lines.push("     |  |  |  D ");
	lines.push("     +B-+  +--+ ");

	expect(lib.solveForFirstStar(lines)).toBe("ABCDEF");
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day19();

	let lines: string[] = [];
	lines.push("     |          ");
	lines.push("     |  +--+    ");
	lines.push("     A  |  C    ");
	lines.push(" F---|----E|--+ ");
	lines.push("     |  |  |  D ");
	lines.push("     +B-+  +--+ ");

	expect(lib.solveForSecondStar(lines)).toBe(38);
});
