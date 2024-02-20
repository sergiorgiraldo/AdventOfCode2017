import { expect, test } from "@jest/globals";
import Day18 from "../solutions/lib/day18";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day18();

	let lines: string[] = [];
	lines.push("set a 1");
	lines.push("add a 2");
	lines.push("mul a a");
	lines.push("mod a 5");
	lines.push("snd a");
	lines.push("set a 0");
	lines.push("rcv a");
	lines.push("jgz a -1");
	lines.push("set a 1");
	lines.push("jgz a -2");

	expect(lib.solveForFirstStar(lines)).toBe(4);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day18();

	let lines: string[] = [];
	lines.push("snd 1");
	lines.push("snd 2");
	lines.push("snd p");
	lines.push("rcv a");
	lines.push("rcv b");
	lines.push("rcv c");
	lines.push("rcv d");

	expect(lib.solveForSecondStar(lines)).toBe(3);
});
