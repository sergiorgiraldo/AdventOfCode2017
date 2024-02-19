import { expect, test } from "@jest/globals";
import Day16 from "../solutions/lib/day16";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day16();

	let lines: string[] = [];
	lines.push("s1,x3/4,pe/b");

	expect(lib.dance(lines[0], 5)).toBe("baedc");
});
