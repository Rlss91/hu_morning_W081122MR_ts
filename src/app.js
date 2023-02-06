"use strict";
let literally = 10;
let number;
let str;
let bool;
let anyVal;
const calc = (a, b, c) => {
    switch (c) {
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        case "+":
        default:
            return a + b;
    }
};
console.log(calc(50, 50, "aaaaaaaaaaaaaaaaaa"));
anyVal = 5;
anyVal = "str";
anyVal = {};
let unionTyp;
unionTyp = 5;
unionTyp = "hello world from ts";
let user;
user = {
    name: "kenny",
    age: 8,
};
let user2;
user2 = {
    name: "kenny",
    age: 8,
};
let user3;
let user4;
user4 = {
    name: "ke",
};
