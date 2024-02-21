import { expect, test } from "@jest/globals";
import Day20 from "../solutions/lib/day20";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day20();

	let lines: string[] = [];
	lines.push("p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>");
	lines.push("p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>");

	expect(lib.solveForFirstStar(lines)).toBe(0);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day20();

	let lines: string[] = [];

    lines.push("p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>");
    lines.push("p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>");
    lines.push("p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>");
    lines.push("p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>");

	expect(lib.solveForSecondStar(lines)).toBe(1);
});
