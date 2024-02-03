import { expect, test } from "@jest/globals";
const sum = require("../misc/sum");

test("SANITY CHECK", () => {
	expect(sum(1, 2)).toBe(3);
});
