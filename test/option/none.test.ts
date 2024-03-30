import { describe, it, expect } from "vitest";
import { none, option } from "../../lib";

describe("None creation", () => {
    it("should create an Option wrapping a None", () => {
        expect(none()).toStrictEqual(option(undefined));
    })

    it("should be a None", () => {
        expect(none().isNone()).toBe(true);
    })

    it("should not be a Some", () => {
        expect(none().isSome()).toBe(false);
    })

    it(`can't be unwrapped`, () => {            
        expect(() => none().unwrap()).toThrow(Error);
    })

    it(`can be unwrapped with fallback`, () => {            
        expect(none().unwrapOr("expected string")).toBe("expected string");
    })
});