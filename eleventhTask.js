{
const user1 = { name: "Alice", address: { city: "Almaty" } };
const user2 = { name: "Bob" };

console.log(user1.address?.city); // "Almaty"
console.log(user2.address?.city); // undefined (No runtime error)

// Fallback with Nullish Coalescing (??)
const city1 = user1.address?.city ?? "City not specified"; // "Almaty"
const city2 = user2.address?.city ?? "City not specified"; // "City not specified"

// Comparison: || vs ??
console.log(0 || "Fallback");          // "Fallback" (0 is falsy)
console.log(0 ?? "Fallback");          // 0 (0 is nullish? No, so it returns 0)

console.log("" || "Fallback");         // "Fallback" ("" is falsy)
console.log("" ?? "Fallback");         // ""

console.log(false || "Fallback");      // "Fallback"
console.log(false ?? "Fallback");     // false

console.log(null || "Fallback");       // "Fallback"
console.log(null ?? "Fallback");      // "Fallback"

console.log(undefined || "Fallback");  // "Fallback"
console.log(undefined ?? "Fallback"); // "Fallback"
}