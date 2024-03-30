import { describe, expect, it } from 'vitest';
import { option, none, some } from "../../lib";

describe("Option creation from null values", () => {
    const testingValues = [null, undefined];
    
    testingValues.forEach((value) => {
        it(`should create an Option wrapping a None, if <${value}> is provided`, () => {
            expect(option(value)).toStrictEqual(none());
        })

        it("should be a None", () => {
            expect(option(value).isNone()).toBe(true);
        })

        it("should not be a Some", () => {
            expect(option(value).isSome()).toBe(false);
        })

        it("cannot be unwrapped", () => {            
            expect(() => option(value).unwrap()).toThrow(Error);
        })

        it("can unwrap with a fallback", () => {            
            expect(option<string>(value).unwrapOr("expected string")).toBe("expected string");
        })
    });

    it(`should create an Option wrapping a None when no value is provided`, () => {
        expect(option()).toStrictEqual(none());
    })

});

describe("Option creation from defined values", () => {
    const testingValues = [
        "", "blah",
        0, NaN, Number.MAX_VALUE, -1,
        {}, { a: "a" }, Object.freeze({ a: 0 }),
        [], [1, 2, 3], ["a", "b", "c"] as const,
        false, true,
        new Promise((resolve) => resolve(undefined)),
        () => {}, () => { throw Error("error") },
        JSON
    ];
    
    testingValues.forEach(value => {
        it("should create an Option wrapping a Some", () => {
            expect(option(value)).toStrictEqual(some(value));
        })

        it("should not be a None", () => {
            expect(option(value).isNone()).toBe(false);
        })

        it("should be a Some", () => {
            expect(option(value).isSome()).toBe(true);
        })

        it("can be unwrapped", () => {            
            expect(option(value).unwrap()).toBe(value);
        })

        it("can unwrap with fallback, but only the value is taken into account", () => {            
            expect(option(value).unwrapOr("expected string")).toBe(value);
        })
    })
});