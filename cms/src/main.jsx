import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure this is imported correctly
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import these for routing
import App from './App'; // Import the App component
import './index.css'; // Import global styles

// src/routes.jsx
import Dashboard from './components/Dashboard/Dashboard';
import StudentList from './components/Students/StudentList';
import StudentForm from './components/Students/StudentForm';
import TeacherList from './components/Teachers/TeacherList';
import TeacherForm from './components/Teachers/TeacherForm';
import AssetList from './components/Assets/AssetList';
import CourseList from './components/Courses/CourseList';
import CourseForm from './components/Courses/CourseForm';
import SignIn from './components/SignIn/SignIn';
import { useLocation } from 'react-router-dom'; 

const AppWrapper = (props) => {
  const location = useLocation();
  return <App currentLink={location.pathname} {...props} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper />, // Wrap App with AppWrapper
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'students',
        element: <StudentList students = {[]}/>,
      },
      {
        path: 'students/:id',
        element: <StudentForm />,
      },
      {
        path: 'teachers',
        element: <TeacherList />,
      },
      {
        path: 'teachers/:id',
        element: <TeacherForm />,
      },
      {
        path: 'assets',
        element: <AssetList />,
      },
      {
        path: 'courses',
        element: <CourseList />,
      },
      {
        path: 'courses/:id',
        element: <CourseForm />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
