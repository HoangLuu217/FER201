// Define ages array
const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// Calculate statistics using reduce
// khai bao bien stats json chua cac thong tin total, min, max, buckets

const stats = ages.reduce((acc, age) => {
    // Update total
    acc.total += age;
    
    // Update min and max
    acc.min = Math.min(acc.min, age);
    acc.max = Math.max(acc.max, age);
    
    // Update buckets
    if (age >= 13 && age <= 19) {
        acc.buckets.teen++;
    } else if (age >= 20) {
        acc.buckets.adult++;
    }
    
    return acc;
}, {
    total: 0,
    min: Infinity,
    max: -Infinity,
    buckets: { teen: 0, adult: 0 }
});

let total = 0;
const sum = ages.forEach(age => total += age);
console.log('Total age: ' + total);


const avg = (stats.total / ages.length).toFixed(2);
console.log(`Average age: ${avg}`);
// Print results
const result = {
    total: stats.total,
    min: stats.min,
    max: stats.max,
    average: Number(avg),
    buckets: stats.buckets
};
console.log("Age Statistics:", result);
console.log('result = ' + JSON.stringify(result));
console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log('Buckets:', stats.buckets);