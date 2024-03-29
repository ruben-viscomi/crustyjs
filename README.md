# crustyjs
A simple library to provide error as a value and a rust-like optionality type.\
This library has been inspired by Rust's enums `Result` and `Option`.

The main motivation is to bring an "interface" to allow both TypeScript and JavaScript developers to benefit from the concept of "Errors as values" (aka `Result`).\
The second motivation is to make an attempt to avoid the confusion deriving from `undefined` and `null` by using "struct-like" type (aka `Option`).\
For this last one, the idea is to simply avoid `undefined` and `null`.
