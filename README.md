# crustyjs

A simple library to provide error as a value and a rust-like optionality type.\
This library has been inspired by Rust's enums `Result` and `Option`.

## Why?

The main motivation is to provide TypeScript developers with a sort of interface allowing to have errors as values (aka `Result`).\
The second motivation is to avoid the confusion deriving from `undefined` and `null` by using "struct-like" type (aka `Option`).\
For this last one, the idea is to simply avoid using `undefined` and `null` alltogether.

## Should my project use it?

This small library aims at providing a different developer experience.
If you don't like try-catch or the fact that JS provides two null "types", probably this library can help you.
Another positive point is that this tiny library has zero dependencies, so your dependency tree won't suffer from it.

## How to install?

Run the following shell command inside your project.

```shell
npm install crustyjs
```

## Errors as values, the `Result` type.

### How to instantiate a `Result`?

1. **Quick 'n dirty** - By derivation, passing a function that throws:

   ```typescript
   import { Result, toResult } from "crustyjs";

   function evenOrThrow(n: number): number {
     if (n % 2 === 0) return n;
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

2. **Slow 'n clean** - By manually rewriting the functions:

   ```typescript
   import { Result, err, ok } from "crustyjs";

   function evenOrErr(n: number): Result<number, string> {
     if (n % 2 === 0) return ok(n);
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
     (err) => `Err(${err})`
   );

   // returns the string "Err(err branch gets executed)"
   err("err branch gets executed").match(
     (val) => `Ok(${val})`,
     (err) => `Err(${err})`
   );
   ```

   A `string` is returned beacuse the provided handlers are returning a `string`.

2. **Risky-er** - using `unwrap` and `unwrapOr` (latter is safe):

   ```typescript
   import { err, ok, Result } from "crustyjs";

   const testOk: Result<number, string> = ok(5);
   const testErr: Result<number, string> = err("some error");

   // returns 5
   testOk.unwrapOr(3);

   // returns 3
   testErr.unwrapOr(3);

   // since testOk is Ok, returns 5
   if (testOk.isOk()) testOk.unwrap();

   // since testErr is Err, it never executes the unwrap.
   if (testErr.isOk()) testErr.unwrap();

   // since testErr is Err, returns the string "some error"
   if (testErr.isErr()) testErr.unwrapErr();

   // BAD UNWRAPS - the line below throws a type error because testErr is of type Err.
   testErr.unwrap();
   ```

   Please note that no method like "unwrapErrOr" exists.\
   When using `unwrap` or `unwrapErr`, please always remember to check the type.

## Optional values, the `Option` type (a replacement to `null` and `undefined`).

### How to instantiate an `Option`?

1. **Quick 'n dirty** - Just wrap whatever "optional" value by using `option`:

   ```typescript
   import { Option, option } from "crustyjs";

   function evenOrNullable(n: number): number | undefined {
     if (n % 2 === 0) return n;
   }

   function evenOption(n: number): Option<number> {
     return option(evenOrNullable(n));
   }

   // Some<number>
   evenOption(0);

   // None
   evenOption(1);

   // Some<number>
   evenOption(2);
   ```

2. **Clean 'n expressful** - use `some` and `none`:

   ```typescript
   import { Option, some, none } from "crustyjs";

   function evenOption(n: number): Option<number> {
     if (n % 2 === 0) return some(n);
     return none();
   }

   // Some<number>
   evenOption(0);

   // None
   evenOption(1);

   // Some<number>
   evenOption(2);
   ```

### How to consume an `Option`?

1. **Recommended** - use the buil-in pattern matching:

   ```typescript
   import { none, some } from "crustyjs";

   // returns the string "Some(2)"
   some(2).match(
     (val) => `Some(${val})`,
     () => `None`
   );

   // returns the string "None"
   none().match(
     (val) => `Some(${val})`,
     () => `None`
   );
   ```

2. **Risky-er** - using `unwrap` and `unwrapOr` (latter is safe):

   ```typescript
   import { none, some, Option } from "crustyjs";

   const testSome: Option<number> = some(5);
   const testNone: Option<number> = none();

   // returns 5
   testSome.unwrapOr(3);

   // returns 3
   testNone.unwrapOr(3);

   // since testSome is Some, returns 5
   if (testSome.isSome()) testSome.unwrap();

   // since testNone is None, it never executes the unwrap.
   if (testNone.isSome()) testNone.unwrap();

   // since testNone is None, it prints to the console the string "None".
   if (testNone.isNone()) console.log("None");

   // BAD UNWRAPS - the line below throws a type error because testNone is of type None.
   testNone.unwrap();
   ```
