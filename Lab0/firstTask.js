{
const name = "Alice";
let age = 20;
let isActive = true;
const courses = ["React", "JavaScript", "CSS"];
const address = { city: "Almaty", street: "Abay Ave" };

console.log(name, typeof name);
console.log(age, typeof age);
console.log(isActive, typeof isActive);
console.log(courses, typeof courses);
console.log(address, typeof address);

let nullVar = null;
let undefinedVar;
console.log(nullVar, typeof nullVar);
console.log(undefinedVar, typeof undefinedVar);

const bio = `Student ${name} (${age} y/o) lives in ${address.city} and studies ${courses.join(", ")}.`;
console.log(bio);
}