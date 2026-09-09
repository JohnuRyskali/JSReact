{
const user = {
  id: 101,
  name: "Alex",
  age: 24,
  address: {
    city: "Almaty",
    street: "Satpayev"
  }
};

console.log(user.name, user.address.city);

user.age = 25;
user.email = "alex@example.com";
delete user.address.street;

const { name: userName, age: userAge } = user;
console.log(userName, userAge);

const { address: { city } } = user;
console.log(city);
}