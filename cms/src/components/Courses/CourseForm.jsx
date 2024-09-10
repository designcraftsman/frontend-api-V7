import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ course, onSubmit }) => {
  const [title, setTitle] = useState(course ? course.title : '');
  const [description, setDescription] = useState(course ? course.description : '');
  const [category, setCategory] = useState(course ? course.category : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { title, description, category };
    if (course) {
      axios.put(`/api/courses/${course.id}`, courseData)
        .then(response => onSubmit(response.data))
        .catch(error => console.error('Error updating course:', error));
    } else {
      axios.post('/api/courses', courseData)
        .then(response => onSubmit(response.data))
        .catch(error => console.error('Error creating course:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{maxWidth:"800px"}}>
      <h2 className='mb-4'>Edit Course</h2>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
          required
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <button type="submit" className="custom-button2 w-100">
         Update
      </button>
    </form>
  );
};

export default CourseForm;



