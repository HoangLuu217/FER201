// Define the array
const ages = [33, 12, 20, 16];

// Destructure array with skip and default
const [first, , third = 0, ...restAges] = ages;



// Print results
console.log("First:", first);      // Output: 33
console.log("Third:", third);      // Output: 20
console.log("Rest:", restAges);    // Output: [16]
// Test with longer array
const ages2 = [33, 12, 20, 16, 5, 54];
const [first2, , third2 = 0, ...restAges2] = ages2;
console.log("Rest with longer array:", restAges2); // [16, 5, 54]

// Test with shorter array
const isEven = restAges2.filter(age => age % 2 === 0);
console.log("Even ages from restAges2:", isEven);
const ages3 = [33, 12];
const [first3, , third3 = 0, ...restAges3] = ages3;
console.log("Third with default:", third3); // 0