// Define array of people
const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Charlie", age: 15 },
    { name: "David", age: 20 },
    { name: "Eve", age: 13 },
    { name: "Frank", age: 18 }
];

// Filter teens and map to formatted strings
const teens = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

// Print results line by line
console.log("Teens (13-19):");
teens.forEach(teen => console.log(teen));