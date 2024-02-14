import { expect, test } from "@jest/globals";
import Day9 from "../solutions/lib/day9";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day9();

	let lines: string[] = [];

	lines.push("{}");
	expect(lib.solveForFirstStar(lines)).toBe(1);

    lines.length = 0;
    lines.push("{{{}}}");
	expect(lib.solveForFirstStar(lines)).toBe(6);

    lines.length = 0;
    lines.push("{{},{}}");
	expect(lib.solveForFirstStar(lines)).toBe(5);

    lines.length = 0;
    lines.push("{{{},{},{{}}}}");
	expect(lib.solveForFirstStar(lines)).toBe(16);

    lines.length = 0;
    lines.push("{<a>,<a>,<a>,<a>}");
	expect(lib.solveForFirstStar(lines)).toBe(1);

    lines.length = 0;
    lines.push("{{<ab>},{<ab>},{<ab>},{<ab>}}");
	expect(lib.solveForFirstStar(lines)).toBe(9);

    lines.length = 0;
    lines.push("{{<!!>},{<!!>},{<!!>},{<!!>}}");
	expect(lib.solveForFirstStar(lines)).toBe(9);

    lines.length = 0;
    lines.push("{{<a!>},{<a!>},{<a!>},{<ab>}}");
	expect(lib.solveForFirstStar(lines)).toBe(3);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day9();

	let lines: string[] = [];

	lines.push("{<>}");
	expect(lib.solveForSecondStar(lines)).toBe(0);

    lines.length = 0;
	lines.push("{<random characters>}");
	expect(lib.solveForSecondStar(lines)).toBe(17);

    lines.length = 0;
	lines.push("{<<<<>}");
	expect(lib.solveForSecondStar(lines)).toBe(3);

    lines.length = 0;
	lines.push("{<{!>}>}");
	expect(lib.solveForSecondStar(lines)).toBe(2);

    lines.length = 0;
	lines.push("{<!!>}");
	expect(lib.solveForSecondStar(lines)).toBe(0);

    lines.length = 0;
	lines.push("{<!!!>>}");
	expect(lib.solveForSecondStar(lines)).toBe(0);

    lines.length = 0;
	lines.push("{<{o\"i!a,<{i<a>}");
	expect(lib.solveForSecondStar(lines)).toBe(10);
});