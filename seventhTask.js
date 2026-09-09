{
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const calculate = (a, b, operation) => operation(a, b);

console.log(calculate(5, 3, add));
console.log(calculate(5, 3, multiply));
}