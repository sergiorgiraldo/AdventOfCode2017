import { expect, test } from "@jest/globals";
import Day25 from "../solutions/lib/day25";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day25();

	let lines: string[] = [];
	lines.push("Begin in state A.");
	lines.push("Perform a diagnostic checksum after 6 steps.");
	lines.push("");
	lines.push("In state A:");
	lines.push("  If the current value is 0:");
	lines.push("    - Write the value 1.");
	lines.push("    - Move one slot to the right.");
	lines.push("    - Continue with state B.");
	lines.push("  If the current value is 1:");
	lines.push("    - Write the value 0.");
	lines.push("    - Move one slot to the left.");
	lines.push("    - Continue with state B.");
	lines.push("");
	lines.push("In state B:");
	lines.push("  If the current value is 0:");
	lines.push("    - Write the value 1.");
	lines.push("    - Move one slot to the left.");
	lines.push("    - Continue with state A.");
	lines.push("  If the current value is 1:");
	lines.push("    - Write the value 1.");
	lines.push("    - Move one slot to the right.");
	lines.push("    - Continue with state A.");

	expect(lib.solveForFirstStar(lines)).toBe(3);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day25();

	let lines: string[] = [];

	expect(lib.solveForSecondStar(lines)).toBe(0);
});
