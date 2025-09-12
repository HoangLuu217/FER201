// Tạo mảng 26 số nguyên
const numbers = Array.from({length: 26}, (_, index) => index + 1);

// Duyệt mảng bằng for loop
console.log("Using for loop:");
for(let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// Duyệt mảng bằng forEach
console.log("\nUsing forEach:");
numbers.forEach(number => {
    console.log(number);
});

// Duyệt mảng bằng map
console.log("\nUsing map:");
const mappedArray = numbers.map(number => {
    console.log(number);
    return number;
});

// Lọc số chẵn bằng filter
console.log("\nEven numbers using filter:");
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers);

//tao mang people la list cac person , id ,name ,age . loc qua danh sach va in age > 20
// Create array of people
const people = [
    {id: 1, name: "Alice", age: 22},
    {id: 2, name: "Bob", age: 19},
    {id: 3, name: "Charlie", age: 25},
    {id: 4, name: "David", age: 18},
    {id: 5, name: "Eve", age: 21}
];

// Filter people over 20 and print
console.log("\nPeople over 20:");
const adultsOver20 = people.filter(person => person.age > 20);
adultsOver20.forEach(person => {
    console.log(`${person.name} is ${person.age} years old`);
});

