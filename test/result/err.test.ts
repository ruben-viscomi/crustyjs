import { describe, it, expect } from "vitest";
import { none, err, some, option } from "../../lib";

describe("Err creation", () => {
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
        it(`should be possible to create an Err with ${value}`, () => {
            expect(err(value).isErr()).toBe(true);
        })

        it(`an Err must not be an Ok`, () => {
            expect(err(value).isOk()).toBe(false);
        })

        it(`an Err can't be unwrapped`, () => {
            expect(() => err(value).unwrap()).toThrow(Error);
        })

        it(`an Err can unwrap an error`, () => {
            expect(err(value).unwrapErr()).toBe(value);
        })

        it(`an Err can unwrap with a fallback`, () => {
            expect(err(value).unwrapOr("expected value")).toBe("expected value");
        })
    })
})