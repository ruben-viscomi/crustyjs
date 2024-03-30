import { describe, it, expect } from "vitest";
import { none, ok, some, option } from "../../lib";

describe("Ok creation", () => {
    const testingValues = [
        some("jaja"), none(), option(5), option(null),
        undefined, null,
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
        it(`should be possible to create an Ok with ${value}`, () => {
            expect(ok(value).isOk()).toBe(true);
        })

        it(`an Ok must not be an Err`, () => {
            expect(ok(value).isErr()).toBe(false);
        })

        it(`an Ok can be unwrapped`, () => {
            expect(ok(value).unwrap()).toBe(value);
        })

        it(`an Ok cannot unwrap an error`, () => {
            expect(() => ok(value).unwrapErr()).toThrow(TypeError);
        })

        it(`an Ok won't unwrap using the fallback`, () => {
            expect(ok(value).unwrapOr("unexpected value")).toBe(value);
        })
    })
})