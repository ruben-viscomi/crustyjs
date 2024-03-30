import { describe, it, expect } from "vitest";
import { none, option, some } from "../../lib";

describe("Match a None", () => {
    const testingValues = [none(), option(undefined), option(null)];

    testingValues.forEach((value) => {
        it(`should execute the None branch: input ${value}`, () => {
            expect(
                value.match(
                    () => "unexpected branch",
                    () => "expected branch"
                )
            ).toBe("expected branch");
        })
    })
});

describe("Match a Some", () => {
    const testingValues = [
        "", "blah",
        0, NaN, Number.MAX_VALUE, -1,
        {}, { a: "a" }, Object.freeze({ a: 0 }),
        [], [1, 2, 3], ["a", "b", "c"] as const,
        false, true,
        new Promise((resolve) => resolve(undefined)),
        () => {}, () => { throw TypeError("error") },
        JSON
    ];

    testingValues.forEach((value) => {
        it(`should execute the Some branch: input ${value}`, () => {
            expect(
                some(value).match(
                    (val) =>  JSON.stringify(val),
                    () => "unexpected branch"
                )
            ).toBe(JSON.stringify(option(value).unwrap()));
        })
    })
});