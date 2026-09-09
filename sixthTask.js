function isEven(number) {
  return number % 2 === 0;
}

const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;
const calculatePrice = (price, quantity) => price * quantity;
const calculateDiscount = (price, percent) => price - (price * percent) / 100;
const getMax = (a, b) => (a > b ? a : b);

const isEvenArrow = number => number % 2 === 0;
