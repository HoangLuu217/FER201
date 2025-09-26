import React from 'react'
export default function exercise5() {
    const people = [
        { name: "Ann", age: 19 },
        { name: "Bob", age: 12 },
        { name: "Charlie", age: 15 },
        { name: "David", age: 20 },
        { name: "Eve", age: 13 },
        { name: "Frank", age: 18 },
        { name: "Grace", age: 14 },
        { name: "Hank", age: 17 },
        { name: "Ivy", age: 16 },
        { name: "Jack", age: 19 },
        { name: "Kyle", age: 13 },
        { name: "Liam", age: 15 },
        { name: "Mason", age: 18 },
        { name: "Nathan", age: 14 },
        { name: "Oliver", age: 17 },
        { name: "Paul", age: 16 }
    ];
    //filter people age >= 13 and <= 19 and sort by name
    const teens = people.filter(person => person.age >= 13 && person.age <= 19)
    .sort((a, b) => a.name.localeCompare(b.name));

    const second = people[1];
    return (
        <div>
            <h1>Exercise 5</h1>
            <h2>second: {second.name} - {second.age} : teens ? {teens.includes(second) ? 'Yes' : 'No'}</h2>
            <p>Teens:</p>
            <table width={100} height={100} center border={1} cellPadding={5} cellSpacing={0}>
            <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {teens.map(teen => (
                        <tr key={teen.name}>
                            <td>{teen.name}</td>
                            <td>{teen.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

// Define array of people
