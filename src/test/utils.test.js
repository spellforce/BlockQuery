import { toHumanValue, toBTC } from "../utils";

test("test toBTC", () => {
  expect(toBTC(50000000)).toBe("0.50000000");
  expect(toBTC("")).toBe("");
  expect(toBTC("xxs")).toBe("");
  expect(toBTC(null)).toBe("");
});

test("test toHumanValue", () => {
  expect(toHumanValue("99999999.89")).toBe("99,999,999.89");
  expect(toHumanValue("xxx")).toBe("");
  expect(toHumanValue(9999999.99)).toBe("9,999,999.99");
  expect(toHumanValue()).toBe("");
});
