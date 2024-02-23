import { expect, test } from "@jest/globals";
import Day22 from "../solutions/lib/day22";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day22();

	let lines: string[] = [];
	lines.push("..#");
	lines.push("#..");
	lines.push("...");

	expect(lib.solveForFirstStar(lines)).toBe(5_587);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day22();

	let lines: string[] = [];
	lines.push("..#");
	lines.push("#..");
	lines.push("...");

	expect(lib.solveForSecondStar(lines)).toBe(2_511_944);
});
