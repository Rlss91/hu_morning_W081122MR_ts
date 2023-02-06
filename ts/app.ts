let literally = 10;
let number: number;
let str: string;
let bool: boolean;
let anyVal: any;

const calc = (a: number, b: number, c: string): number => {
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

let unionTyp: number | string | boolean;
unionTyp = 5;
unionTyp = "hello world from ts";

// let obj: object;
// obj = { name: "kenny", age: 8 };
// obj.name;

let user: { name: string; age: number };
user = {
  name: "kenny",
  age: 8,
};

let user2: { name: string; age: number; gender?: boolean };

user2 = {
  name: "kenny",
  age: 8,
};

interface User {
  name: string;
  age: number;
  gender?: boolean;
}

let user3: User;
let user4: User;
user4 = {
  name: "ke",
};
