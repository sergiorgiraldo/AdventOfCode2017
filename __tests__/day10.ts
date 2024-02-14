import { expect, test } from "@jest/globals";
import Day10 from "../solutions/lib/day10";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day10();

	let lines: string[] = [];
	lines.push("3, 4, 1, 5");
	let hash = lib.computeSparseHash(5, lines[0].split(",").map(Number), 1);
	const result = hash[0] * hash[1];
	expect(result).toBe(12);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day10();

	let lines: string[] = [];

	lines.length = 0;
	lines.push("");
	expect(lib.solveForSecondStar(lines)).toBe("a2582a3a0e66e6e86e3812dcb672a272");

	lines.length = 0;
	lines.push("AoC 2017");
	expect(lib.solveForSecondStar(lines)).toBe("33efeb34ea91902bb2f59c9920caa6cd");

	lines.length = 0;
	lines.push("1,2,3");
	expect(lib.solveForSecondStar(lines)).toBe("3efbe78a8d82f29979031a4aa0b16a9d");

	lines.length = 0;
	lines.push("1,2,4");
	expect(lib.solveForSecondStar(lines)).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
});
