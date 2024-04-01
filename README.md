# crustyjs
A simple library to provide error as a value and a rust-like optionality type.\
This library has been inspired by Rust's enums `Result` and `Option`.

The main motivation is to bring an "interface" to allow both TypeScript and JavaScript developers to benefit from the concept of "Errors as values" (aka `Result`).\
The second motivation is to make an attempt to avoid the confusion deriving from `undefined` and `null` by using "struct-like" type (aka `Option`).\
For this last one, the idea is to simply avoid `undefined` and `null`.

## Errors as values, the `Result` type.
### How to instantiate a `Result`?
1. **Quick 'n dirty** - By derivation, passing a function that throws:
    ```typescript
    import { Result, toResult } from "crustyjs";
    
    function evenOrThrow(n: number): number {
        if (n % 2 === 0)
            return n;
        throw Error(`${n} is not even.`);
    }
    
    function evenOrErr(n: number): Result<number, Error> {
        return toResult(() => evenOrThrow(n));
    }
    
    // returns Ok<number>
    evenOrErr(0);
    
    // returns Err<Error>
    evenOrErr(1);
    
    // returns Ok<number>
    evenOrErr(2);
    ```
    The same can be done for `async` functions by using `toResultAsync`.
   
   Please note that it is also possible to provide as second parameter a type converter for the `Err`.\
   If provided, the converter must accept the error as an `unknown` parameter and transform it into the desired type `E`.

3. **Slow 'n clean** - By manually rewriting the functions:
    ```typescript
    import { Result, err, ok } from "crustyjs";
    
    function evenOrErr(n: number): Result<number, string> {
        if (n % 2 === 0)
            return ok(n);
        return err(`${n} is not even.`);
    }
    
    // returns Ok<number>
    evenOrErr(0);
    
    // returns Err<string>
    evenOrErr(1);
    
    // returns Ok<number>
    evenOrErr(2);
    ```

### How to consume a `Result`?
1. **Recommended** - Using the built-in pattern matching:
    ```typescript
    import { err, ok } from "crustyjs";
    
    // returns the string "Ok(ok branch gets executed)"
    ok("ok branch gets executed").match(
        (val) => `Ok(${val})`,
        (err) => `Err(${err})`,
    );
    
    // returns the string "Err(err branch gets executed)"
    err("err branch gets executed").match(
        (val) => `Ok(${val})`,
        (err) => `Err(${err})`,
    );
    ```
    A `string` is returned beacuse the provided handlers are returning a `string`.

2. The `unwrapOr` and `unwrap`:
    ```typescript
    import { err, ok, Result } from "crustyjs";

    const testOk: Result<number, string> = ok(5);
    const testErr: Result<number, string> = err("some error");

    // returns 5
    testOk.unwrapOr(3);
    
    // returns 3
    testErr.unwrapOr(3);

    // since testOk is Ok, returns 5
    if (testOk.isOk())
        testOk.unwrap();

    // since testErr is Err, it never executes the unwrap.
    if (testErr.isOk())
        testErr.unwrap();

    // BAD UNWRAPS - the line below throws a type error because testErr is of type Err.
    testErr.unwrap()
    ```
    Similar to `unwrap` it is possible to just unwrap the `Err` by using `unwrapErr` (no method like "unwrapErrOr" exists).\
   When using `unwrap` or `unwrapErr`, please always remember to check the type.
