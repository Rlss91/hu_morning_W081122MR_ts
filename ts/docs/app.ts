import "./htmlInputElm.js";

// let literally = 10;
// let number: number;
// let str: string;
// let bool: boolean;
// let anyVal: any;

// const calc = (a: number, b: number, c: string): number => {
//   switch (c) {
//     case "-":
//       return a - b;
//     case "*":
//       return a * b;
//     case "/":
//       return a / b;
//     case "+":
//     default:
//       return a + b;
//   }
// };

// console.log(calc(50, 50, "aaaaaaaaaaaaaaaaaa"));

// anyVal = 5;
// anyVal = "str";
// anyVal = {};

// let unionTyp: number | string | boolean;
// unionTyp = 5;
// unionTyp = "hello world from ts";

// // let obj: object;
// // obj = { name: "kenny", age: 8 };
// // obj.name;

// let user: { name: string; age: number };
// user = {
//   name: "kenny",
//   age: 8,
// };

// let user2: { name: string; age: number; gender?: boolean };

// user2 = {
//   name: "kenny",
//   age: 8,
// };

// interface User {
//   name: string;
//   age: number;
//   gender?: boolean;
// }

// let user3: User;
// let user4: User;
// user4 = {
//   name: "ke",
// };

// let arr: Array<User | string> = [{ name: "kenny", age: 8 }];
// console.log(arr);

// let arr2: string[];
// let arr3: User[];
// let arr4: (User | string)[];

enum UserType {
  NORMAL = 1,
  BUSINESS,
  VIP,
  ADMIN,
}

interface User {
  name: string;
  age: number;
  type: UserType;
}

// let user: User = {
//   name: "kenny",
//   age: 8,
//   type: UserType.NORMAL,
// };

// const genericFunction = <T>(a: T): T => {
//   console.log(a);
//   return a;
// };

// genericFunction<number>(5);
// genericFunction<User>();

const f1 = () => {};
const f2 = () => {};
const callF1 = (functionAsParam: Function) => {
  functionAsParam(); // f1()
};

callF1(f1);
callF1(f2);

export {};
