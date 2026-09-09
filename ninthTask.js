{
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = createCounter();
console.log(counter2()); // 1 (Has its own independent state)

function createAdder(value) {
  return function(number) {
    return value + number;
  };
}

const addFive = createAdder(5);
console.log(addFive(10)); // 15
console.log(addFive(20)); // 25
}