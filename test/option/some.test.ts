import { describe, it, expect } from "vitest";
import { option, some } from "../../lib";

describe("Some creation from null values", () => {
    [null, undefined].forEach((value) => {
        it("should not be possible to instantiate Some", () => {
            expect(() => some(value)).toThrow(TypeError)
        })
    })
});

describe("Some creation from nullish values", () => {
    ["", 0, NaN, {}, []].forEach(value => {
        it("should create an Option wrapping a Some", () => {
            expect(some(value)).toStrictEqual(option(value));
        })
    })
});