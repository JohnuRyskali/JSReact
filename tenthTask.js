{
const numbers = [10, 20, 30, 40];
const [first, second] = numbers;

const user = { id: 1, name: "Anna", age: 21 };
const { name, age } = user;

const newNumbers = [...numbers, 50]; // [10, 20, 30, 40, 50]
const updatedUser = { ...user, age: 22 };
const userWithEmail = { ...user, email: "anna@example.com" };

const combinedArray = [...numbers, ...newNumbers];

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2));       // 3
console.log(sum(1, 2, 3, 4)); // 10

/*
Spread (...): Expands an array or object into individual elements/properties 
(used in assignments or function calls).

Rest (...): Collects multiple individual values into a single array parameter 
(used in function arguments or destructuring patterns).
*/
}