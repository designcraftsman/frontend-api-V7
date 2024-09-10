// src/routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import StudentList from './components/Students/StudentList';
import StudentForm from './components/Students/StudentForm';
import TeacherList from './components/Teachers/TeacherList';
import TeacherForm from './components/Teachers/TeacherForm';
import AssetList from './components/Assets/AssetList';
import AssetForm from './components/Assets/AssetForm';
import CourseList from './components/Courses/CourseList';
import CourseForm from './components/Courses/CourseForm';

const RoutesConfig = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/students/:id" element={<StudentForm />} />
      <Route path="/teachers" element={<TeacherList />} />
      <Route path="/teachers/:id" element={<TeacherForm />} />
      <Route path="/assets" element={<AssetList />} />
      <Route path="/assets/:id" element={<AssetForm />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseForm />} />
    </Routes>
  </Router>
);

export default RoutesConfig;

