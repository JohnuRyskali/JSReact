{
const numbers = [3, 7, 2, 10, 5];

const doubled = numbers.map(num => num * 2);

const greaterThanFive = numbers.filter(num => num > 5);

const firstGreaterThanFive = numbers.find(num => num > 5);

const sum = numbers.reduce((acc, num) => acc + num, 0);

const hasTen = numbers.includes(10);

console.log(doubled);
console.log(greaterThanFive);
console.log(firstGreaterThanFive);
console.log(sum);
console.log(hasTen);
}