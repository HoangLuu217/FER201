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
// const countTeens = people.reduce((count, person) => {
//     return count + (person.age >= 13 && person.age <= 19 ? 1 : 0);
// },0);
// console.log('co  ${countTeens} tuoi teens.');

const sortByName = [...people].sort((a, b) => a.name.localeCompare(b.name))
.filter(person => person.age >= 13 && person.age <= 19).slice(0,2);
console.log("Sorted by name:");
sortByName.forEach(person => console.log(person.name + ' có ' + person.age + ' tuổi'));
// const teens = people
//     .filter(person => person.age >= 13 && person.age <= 19);
//    // .map(person => `${person.name} (${person.age})`);

// // Print results line by line
// console.log("Teens (13-19):");
// teens.forEach(teen => console.log(teen.name + ' có ' + teen.age + ' tuổi'));