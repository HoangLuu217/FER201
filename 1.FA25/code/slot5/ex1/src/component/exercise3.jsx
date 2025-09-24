import React from 'react'

export default function exercise3() {
    const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

//•	Cho person như dưới. Dùng destructuring để lấy street, city (mặc định "Unknown City" nếu không có).
//•	In: street, city. Ràng buộc: Không truy cập kiểu person.address.street trực tiếp.
 
const { address: { street, city = "Unknown City" } } = person;

  return (
    <div>
      <h1> Person</h1>
        <p> Street: {street}</p>
        <p> City: {city}</p>
    </div>
  )
}
