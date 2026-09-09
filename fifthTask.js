{
//Shallow Copy Issue
const original = { name: "Alice", score: 10 };
const copy = original;
copy.score = 20;
console.log(original.score);
/*
Why? 
Objects are reference types. 
"copy" and "original" point to the exact same location in memory.
*/

//FIX
const originalCopy = { ...original };
originalCopy.score = 30;
console.log(original.score);
console.log(originalCopy.score);

//Deep Copy Issue
const user = { name: "Alice", address: { city: "Almaty" } };
const userCopy = { ...user };
userCopy.address.city = "Astana";
console.log(user.address.city);
/*
Why? 
The spread operator creates a shallow copy. 
The outer object is duplicated, but nested objects (address) are still copied by reference.
*/

const deepCopy = {
  ...user,
  address: { ...user.address, city: "Astana" }
};

}