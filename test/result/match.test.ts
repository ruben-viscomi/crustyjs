import { describe, it, expect } from "vitest";
import { none, err, some, option, ok } from "../../lib";

describe("Match an Ok", () => {
    const testingValues = [
        some("jaja"), none(), option(5), option(null),
        undefined, null,
        "", "blah",
        0, NaN, Number.MAX_VALUE, -1,
        {}, { a: "a" }, Object.freeze({ a: 0 }),
        [], [1, 2, 3], ["a", "b", "c"] as const,
        false, true,
        new Promise((resolve) => resolve(undefined)),
        () => {}, () => { throw Error("error") },
        JSON
    ];

    testingValues.forEach((value) => {
        it(`should match Ok: input ${value}`, () => {
            expect(
                ok(value).match(
                    (value) => JSON.stringify(value),
                    (error) => JSON.stringify(error)
                )
            ).toBe(JSON.stringify(value))
        })
    })
})

describe("Match an Err", () => {
    const testingValues = [
        some("jaja"), none(), option(5), option(null),
        undefined, null,
        "", "blah",
        0, NaN, Number.MAX_VALUE, -1,
        {}, { a: "a" }, Object.freeze({ a: 0 }),
        [], [1, 2, 3], ["a", "b", "c"] as const,
        false, true,
        new Promise((resolve) => resolve(undefined)),
        () => {}, () => { throw Error("error") },
        JSON
    ];

    testingValues.forEach((value) => {
        it(`should match Ok: input ${value}`, () => {
            expect(
                err(value).match(
                    (value) => JSON.stringify(value),
                    (error) => JSON.stringify(error)
                )
            ).toBe(JSON.stringify(value))
        })
    })
})