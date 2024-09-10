import React, { useState } from 'react';
import axios from 'axios';

const TeacherForm = ({ teacher, onSubmit }) => {
  const [firstname, setFirstname] = useState(teacher ? teacher.firstname : '');
  const [lastname, setLastname] = useState(teacher ? teacher.lastname : '');
  const [email, setEmail] = useState(teacher ? teacher.email : '');
  const [password, setPassword] = useState(teacher ? teacher.password : '');
  const [dateOfBirth, setDateOfBirth] = useState(teacher ? teacher.dateOfBirth : '');
  const [category, setCategory] = useState(teacher ? teacher.category : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherData = {
      firstname,
      lastname,
      email,
      password,
      dateOfBirth,
      category
    };
    if (teacher) {
      axios.put(`/api/teachers/${teacher.id}`, teacherData)
        .then(response => onSubmit(response.data))
        .catch(error => console.error('Error updating teacher:', error));
    } else {
      axios.post('/api/teachers', teacherData)
        .then(response => onSubmit(response.data))
        .catch(error => console.error('Error creating teacher:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{maxWidth:"800px"}}>
      <h2 className='mb-4'> Edit Teacher</h2>
      <div className="mb-3">
        <label className="form-label">Firstname</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Lastname</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          type="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
          required
        >
          <option value="maths">Maths</option>
          <option value="biochemistry">Biochemistry</option>
          <option value="software">Software</option>
          <option value="mechanics">Mechanics</option>
        </select>
      </div>
      <button type="submit" className="custom-button2 w-100">
        {teacher ? 'Update' : 'Save'} Teacher
      </button>
    </form>
  );
};

export default TeacherForm;
