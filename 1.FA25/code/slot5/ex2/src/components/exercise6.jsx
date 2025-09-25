// 6.	Sort + slice – doanh nghiệp theo năm kết thúc
// Mục tiêu: Thao tác sort bất biến (không mutate), cắt mảng.
// Yêu cầu:
// •	Cho companies (name, category, start, end).
// •	Tạo bản sao đã sắp xếp theo end tăng dần.
// •	In 3 công ty đầu theo định dạng "Company - EndYear".

import React from 'react'
export default function exercise6() {
    // Define companies array
const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

// Create sorted copy and get first 3 companies
const firstThreeByEndYear = [...companies]
    .sort((a, b) => a.end - b.end)
    .slice(0, 5);
   // console.log(firstThreeByEndYear);
    return (
        <div>
            <h1>Exercise 6</h1>
            <p>First 5 companies by end year:</p>
            <table border={1} cellPadding={5} cellSpacing={0} width={100} height={100}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>End Year</th>
                    </tr>
                </thead>
                <tbody>
                {firstThreeByEndYear.map(company => (
                    <tr key={company.name}>
                        <td>{company.name}</td>
                        <td>{company.end}</td>
                    </tr>
                ))}
            </tbody>    
            </table>

        </div>
    )
}

