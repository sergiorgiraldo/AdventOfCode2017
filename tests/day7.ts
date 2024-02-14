// import { expect, test } from "@jest/globals";
import { test } from "node:test";
import assert from "node:assert";
import Day7 from "../solutions/lib/day7";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day7();

	let lines: string[] = [];
	lines.push("pbga (66)");
	lines.push("xhth (57)");
	lines.push("ebii (61)");
	lines.push("havc (66)");
	lines.push("ktlj (57)");
	lines.push("fwft (72) -> ktlj, cntj, xhth");
	lines.push("qoyq (66)");
	lines.push("padx (45) -> pbga, havc, qoyq");
	lines.push("tknk (41) -> ugml, padx, fwft");
	lines.push("jptl (61)");
	lines.push("ugml (68) -> gyxo, ebii, jptl");
	lines.push("gyxo (61)");
	lines.push("cntj (57)");

	assert.equal(lib.solveForFirstStar(lines),"tknk");
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day7();

	let lines: string[] = [];
	lines.push("pbga (66)");
	lines.push("xhth (57)");
	lines.push("ebii (61)");
	lines.push("havc (66)");
	lines.push("ktlj (57)");
	lines.push("fwft (72) -> ktlj, cntj, xhth");
	lines.push("qoyq (66)");
	lines.push("padx (45) -> pbga, havc, qoyq");
	lines.push("tknk (41) -> ugml, padx, fwft");
	lines.push("jptl (61)");
	lines.push("ugml (68) -> gyxo, ebii, jptl");
	lines.push("gyxo (61)");
	lines.push("cntj (57)");

	assert.equal(lib.solveForSecondStar(lines),60);
});
