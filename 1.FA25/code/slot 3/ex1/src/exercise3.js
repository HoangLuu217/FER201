const person = {
    name: "Costas",
    address: {
        street: "Lalaland 12",
        city: "New York"     // Added city property
    }
};

const { address: { street, city = "Unknown City" } } = person;
console.log("Street:", street);        // Output: Lalaland 12
console.log("City:", city);            // Output: New York
// IF the city property is missing
const person2 = {
    name2: "Costas",
    address2: {
        street2: "Lalaland 12"
    }
};

const { address2: { street2, city2 = "Unknown City" } } = person2;
console.log("Street:", street2);        // Output: Lalaland 12
console.log("City:", city2);            // Output: Unknown City