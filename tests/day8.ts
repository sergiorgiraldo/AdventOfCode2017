// import { expect, test } from "@jest/globals";
import { test } from "node:test";
import assert from "node:assert";
import Day8 from "../solutions/lib/day8";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day8();

	let lines: string[] = [];
	lines.push("b inc 5 if a > 1");
	lines.push("a inc 1 if b < 5");
	lines.push("c dec -10 if a >= 1");
	lines.push("c inc -20 if c == 10");

	assert.equal(lib.solveForFirstStar(lines), 1);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day8();

	let lines: string[] = [];
	lines.push("b inc 5 if a > 1");
	lines.push("a inc 1 if b < 5");
	lines.push("c dec -10 if a >= 1");
	lines.push("c inc -20 if c == 10");

	assert.equal(lib.solveForSecondStar(lines), 10);
});
