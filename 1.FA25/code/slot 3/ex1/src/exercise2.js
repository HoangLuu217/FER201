// Rest parameter functions
const sum = (...nums) => {
    return nums.reduce((total, num) => {
        return total + (isNaN(Number(num)) ? 0 : Number(num));
    }, 0);
};

const avg = (...nums) => {
    const validNums = nums.filter(num => !isNaN(Number(num)));
    if (validNums.length === 0) return 0;
    const total = validNums.reduce((sum, num) => sum + Number(num), 0);
    return Number((total / validNums.length).toFixed(2));
};

// Test rest parameter functions
console.log("Rest Parameter Tests:");
console.log("sum(1,2,3):", sum(1,2,3));           // Output: 6
console.log("sum(1,'x',4):", sum(1,'x',4));       // Output: 5
console.log("avg(1,2,3,4):", avg(1,2,3,4));       // Output: 2.50
console.log("avg():", avg());                      // Output: 0
