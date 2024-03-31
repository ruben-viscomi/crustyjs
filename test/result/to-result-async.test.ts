import { describe, it, expect } from "vitest";
import { err, toResultAsync, ok } from "../../lib";

function promiseFunction<T>(value: T) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value === "reject")
                reject(new TypeError("the promise has been rejected."));
            else
                resolve(value);
        }, 10)
    return value;
    });
}

async function awaitableFunction<T>(value: T) {
    await promiseFunction(value);
    if (value === "throw")
        throw TypeError("an error has been thrown");
    return value;
}


describe("conversion from a promise function to Result", () => {
    it.concurrent("should instantiate an Ok if the function doesn't throw errors", async () => {
        expect(await toResultAsync(() => promiseFunction(123)))
            .toStrictEqual(ok(123));
    })

    it.concurrent("should instantiate an Err if the function throws an error", async () => {
        expect(await toResultAsync(() => promiseFunction("reject")))
            .toStrictEqual(err(new TypeError("the promise has been rejected.")));
    })

    it.concurrent("should instantiate an Err if the async function rejects", async () => {
        const converter = (e: unknown) => {
            if (e instanceof TypeError)
                return e.message;
            return "";
        }

        expect(await toResultAsync(() => promiseFunction("reject"), converter))
            .toStrictEqual(err("the promise has been rejected."));
    })
})

describe("conversion from an async function to Result", () => {
    it.concurrent("should instantiate an Ok if the function doesn't throw errors", async () => {
        expect(await toResultAsync(() => awaitableFunction(123)))
            .toStrictEqual(ok(123));
    })

    it.concurrent("should instantiate an Err if the function throws an error", async () => {
        expect(await toResultAsync(() => awaitableFunction("throw")))
            .toStrictEqual(err(TypeError("an error has been thrown")));
    })

    it.concurrent("should instantiate an Err if the function throws an error", async () => {
        expect(await toResultAsync(() => awaitableFunction("reject")))
            .toStrictEqual(err(TypeError("the promise has been rejected.")));
    })

    it.concurrent("should instantiate an Err if the async function rejects", async () => {
        const converter = (e: unknown) => {
            if (e instanceof TypeError)
                return e.message;
            return "";
        }

        expect(await toResultAsync(() => awaitableFunction("throw"), converter))
            .toStrictEqual(err("an error has been thrown"));
    })

    it.concurrent("should instantiate an Err if the async function rejects", async () => {
        const converter = (e: unknown) => {
            if (e instanceof TypeError)
                return e.message;
            return "";
        }

        expect(await toResultAsync(() => awaitableFunction("reject"), converter))
            .toStrictEqual(err("the promise has been rejected."));
    })
})