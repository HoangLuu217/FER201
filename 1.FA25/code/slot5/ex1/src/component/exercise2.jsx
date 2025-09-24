import React from 'react'

export default function exercise2() {
    //1.tạo mảng số nguyên in ra danh sách thẻ List 
    const numbers = [1, -12, 2, 15, -28, 0, 33, -9, 3, 4, 5];
    //2.tính tổng mảng số nguyên
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    //`3.tính trung bình mảng số nguyên
    const avg = sum / numbers.length;
    //4. khai báo mảng chuổi names .in ra danh sách các tên 
    // theo thứ tự tăng dần alphabet
    const names = ["An", "Bình", "Cường", "Trung", "Huy", "Minh", "Nam", "Trí", "Hoang", "Khoa"];
    names.sort();
    //5. khai bóa một mảng students chứa 10 đối tượng 
    // mỗi đối tượng student có các thuộc tính: id, name, age, grade
    // id là số nguyên =, name là chuổi, age là số nguyên, grade là số thực từ 0-10
    const students = [
        { id: 1, name: "An", age: 20, grade: 8.5 },
        { id: 2, name: "Bình", age: 21, grade: 7.0 },
        { id: 3, name: "Cường", age: 22, grade: 9.0 },
        { id: 4, name: "Trung", age: 23, grade: 6.5 },
        { id: 5, name: "Huy", age: 24, grade: 8.0 },
        { id: 6, name: "Minh", age: 25, grade: 7.5 },
        { id: 7, name: "Nam", age: 26, grade: 9.5 },
        { id: 8, name: "Trí", age: 27, grade: 6.0 },
        { id: 9, name: "Hoang", age: 28, grade: 8.0 },
        { id: 10, name: "Khoa", age: 29, grade: 7.0 },
    ];
    // in ra danh sách students có grade >= 7.5 sắp xếp theo grade giảm dần
    const topStudents = students.filter(student => student.grade >= 7.5)
        .sort((a, b) => b.grade - a.grade);
    // tính trung bình điểm của học sinh 
    const AvgGrade = topStudents.reduce((acc, curr) => acc + curr.grade, 0) / topStudents.length;   
    return (
        <div>
            <h1>Exercise2</h1>
            <p>
                In Mảng số Nguyên
            </p>
            <ul>
                {numbers.map((number, index) => (
                    <li key={index}> phần tử thứ {index} - {number}</li>
                ))}
            </ul>
            <p> Tổng Phần tử của mảng: {sum}</p>
            <p> Trung bình phần tử trong mảng: {avg.toFixed(2)}</p>
            <p> In Mảng Chuổi theo thứ tự alphabet</p>
            <ul>
                {names.map((name, index) => (
                    <li key={index}> phần tử thứ {index} - {name}</li>
                ))}
            </ul>
            <p> Điểm học sinh có điểm trên 7,5 dưới dạng bảng</p>
            <table border={1} cellPadding={5} cellSpacing={0}>
                <thead>            
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                </tr></thead>

                <tbody>
                    {topStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <p> Trung bình điểm của học sinh trên 7.5: {AvgGrade.toFixed(2)}</p>
        </div>
    )
}
