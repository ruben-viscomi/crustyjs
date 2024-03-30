import { describe, it, expect } from "vitest";
import { err, throwableToResult, ok } from "../../lib";

function throwableFunction<T>(value: T) {
    if (value === "throw")
        throw TypeError("an error has been thrown");
    return value;
}


describe("conversion from throwable to Result", () => {
    it("should instantiate an Ok if the function doesn't throw errors", () => {
        expect(throwableToResult(() => throwableFunction(123)))
            .toStrictEqual(ok(123));
    })

    it("should instantiate an Err if the function throws an error", () => {
        expect(throwableToResult(() => throwableFunction("throw")))
            .toStrictEqual(err(new TypeError("an error has been thrown")));
    })

    it("should instantiate an Err of type string if the function throws an error and a converter to string is provided", () => {
        const converter = (e: unknown) => {
            if (e instanceof TypeError)
                return e.message;
            return "";
        }

        expect(throwableToResult(() => throwableFunction("throw"), converter))
            .toStrictEqual(err("an error has been thrown"));
    })
})