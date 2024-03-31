# crustyjs
A simple library to provide error as a value and a rust-like optionality type.\
This library has been inspired by Rust's enums `Result` and `Option`.

The main motivation is to bring an "interface" to allow both TypeScript and JavaScript developers to benefit from the concept of "Errors as values" (aka `Result`).\
The second motivation is to make an attempt to avoid the confusion deriving from `undefined` and `null` by using "struct-like" type (aka `Option`).\
For this last one, the idea is to simply avoid `undefined` and `null`.

## `Result`
```typescript
import { Result, err, ok } from "crustyjs";

// Example function returning a Result
function oddOrErr(num: number): Result<number, string> {
    if (num % 2 == 0)
        return err(`${num} is not odd`);
    return ok(num);
}

// ===================== Result is Ok ===================== //
const anOk = oddOrErr(3);

// The (num) => `${num} is odd` branch is executed, thus returning "3 is odd"
anOk.match(
    (num) => `${num} is odd`,
    (error) => error,
);
// false
anOk.isErr();

// true
anOk.isOk();

// returns 3
anOk.unwrap();

// returns 3
anOk.unwrapOr(5);

// throws a TypeError, because the instance is Ok. (Consider it as a panic, if it happens your code is not properly handling the Result.)
anOk.unwrapErr();

// ===================== Result is Err ===================== //
const anErr = oddOrErr(2);

// The (error) => error branch is executed, thus returning "2 is not odd"
anErr.match(
    (num) => `${num} is odd`,
    (error) => error,
);

// true
anErr.isErr();

// false
anErr.isOk();

// throws a TypeError, because the instance is Err. (Consider it as a panic, if it happens your code is not properly handling the Result.)
anErr.unwrap();

// returns 5
anErr.unwrapOr(5);

// returns "2 is not odd"
anErr.unwrapErr();
```
