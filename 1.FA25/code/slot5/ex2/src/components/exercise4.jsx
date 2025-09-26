


import React from 'react'

export default function exercise4() {
    
// ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
//•	Dùng destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges cho phần còn lại.
//	In: first, third, restAges.	

const ages = [33, 12, 20, 16];
// destructuring array with skip and default
const [first, , third = 0, ...restAges] = ages;

// Test with longer array
const ages2 = [33, 12, 20, 16, 5, 54];
const [first2, , third2 = 0, ...restAges2] = ages2;

// Test with shorter array
const ages3 = [33, 12];
const [first3, , third3 = 0, ...restAges3] = ages3;
  return (
    <div>
        <h1>Exercise 4</h1>
        <h2>test with ages = [33, 12, 20, 16]</h2>
        <p>First: {first}</p>
        <p>Third: {third}</p>
        <p>RestAges: {restAges.toString()}</p>
        <h2>Test with Longer ages2 = [33, 12, 20, 16, 5, 54];</h2>
        <p>First2: {first2}</p>
        <p>Third2: {third2}</p>
        <p>RestAges2: {restAges2.toString()}</p>
        <h2>Test with Shorter ages3 = [33, 12];</h2>
        <p>First3: {first3}</p>
        <p>Third3 (with default): {third3}</p>
        <p>RestAges3: {restAges3.toString()}</p>

      
    </div>
  )
}
