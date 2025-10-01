import React, { useState } from 'react';

const StudentCard = ({ student }) => {
  const [attendance, setAttendance] = useState('absent');

  const handleSubmit = () => {
    console.log(`Student ${student.id} attendance: ${attendance}`);
  };

  return (
    <div className="card mb-4">
      <div className="card-body text-center">
        <div className="mb-3">
          <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '100px', height: '100px'}}>
            <i className="fas fa-user fa-3x text-muted"></i>
          </div>
        </div>
        
        <div className="mb-3">
          <h6 className="card-title mb-1">ID: {student.id}</h6>
          <h5 className="card-title">{student.name}</h5>
        </div>

        <div className="mb-3">
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name={`attendance-${student.id}`}
              id={`absent-${student.id}`}
              value="absent"
              checked={attendance === 'absent'}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`absent-${student.id}`}>
              Absent
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name={`attendance-${student.id}`}
              id={`present-${student.id}`}
              value="present"
              checked={attendance === 'present'}
              onChange={(e) => setAttendance(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`present-${student.id}`}>
              Present
            </label>
          </div>
        </div>

        <div className="mb-3">
          <small className="text-muted">Location: {student.location}</small>
        </div>

        <button 
          className="btn btn-sm btn-orange"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
