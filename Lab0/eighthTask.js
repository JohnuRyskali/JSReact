{
const message = "global";

function testScope() {
  const message = "function";
  console.log(message);

  if (true) {
    const message = "block";
    console.log(message);
  }
}

testScope();
console.log(message);

if (true) {
  var varVariable = "I am var";
  let letVariable = "I am let";
  const constVariable = "I am const";
}

console.log(varVariable); // "I am var" (Function-scoped / global)
// console.log(letVariable);   // ReferenceError: letVariable is not defined
// console.log(constVariable); // ReferenceError: constVariable is not defined
}