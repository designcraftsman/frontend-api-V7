import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ student, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstname: student ? student.firstname : '',
    lastname: student ? student.lastname : '',
    email: student ? student.email : '',
    password: student ? student.password : '',
    dateOfBirth: student ? student.dateOfBirth : '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student) {
      axios.put(`/api/students/${student.id}`, formData)
        .then(response => onSubmit(response.data))
        .catch(error => console.error('Error updating student:', error));
    } else {
      axios.post('/api/students', formData)
        .then(response => onSubmit(response.data))
        .catch(error => console.error('Error creating student:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{maxWidth:"800px"}}>
      <h2 className='mb-4'>Edit Student</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Firstname</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Lastname</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          className="form-control"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="custom-button2 w-100">
        {student ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default StudentForm;
