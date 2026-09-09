{
const user1 = { name: "Alice", address: { city: "Almaty" } };
const user2 = { name: "Bob" };

console.log(user1.address?.city); 
console.log(user2.address?.city);

const city1 = user1.address?.city ?? "City not specified"; 
const city2 = user2.address?.city ?? "City not specified"; 

// Comparison: || vs ??
console.log(0 || "Fallback");          
console.log(0 ?? "Fallback");         
console.log("" || "Fallback");         
console.log("" ?? "Fallback");       

console.log(false || "Fallback");      
console.log(false ?? "Fallback");    
console.log(null || "Fallback");      
console.log(null ?? "Fallback");     

console.log(undefined || "Fallback"); 
console.log(undefined ?? "Fallback");
}