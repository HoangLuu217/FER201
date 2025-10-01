import React from 'react';
import StudentCard from './StudentCard';

const MainContent = () => {
  const students = [
    {
      id: "DE160182",
      name: "Nguyễn Hữu Quốc Khánh",
      location: "DaNang"
    },
    {
      id: "DE160377",
      name: "Chay Viình Thiện",
      location: "QuangNam"
    },
    {
      id: "DE160547",
      name: "Đỗ Nguyên Phúc",
      location: "QuangNam"
    },
    {
      id: "DE170049",
      name: "Lê Hoàng Minh",
      location: "DaNang"
    }
  ];

  return (
    <main className="bg-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-5">Students Detail</h2>
          </div>
        </div>
        
        <div className="row">
          {students.map((student, index) => (
            <div key={student.id} className="col-md-6 col-lg-3 mb-4">
              <StudentCard student={student} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
