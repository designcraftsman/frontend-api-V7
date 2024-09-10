import React from 'react';
import Table from '../Table/Table.jsx';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherList() {
  const navigate = useNavigate();
  const [token , setToken] = useState(localStorage.getItem('token'));
  const [role , setRole] = useState(localStorage.getItem('role'));
  const [id , setId] = useState(localStorage.getItem('id'));
  const [teachers , setTeachers] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        navigate('/sign-in');
    } else {
        setToken(storedToken);
    }
}, [navigate]);

  const getTeachers = async () => {
      try {
          const response = await fetch(`http://localhost:4200/teachers`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });

          if (!response.ok) {
              throw new Error('Failed to fetch teachers');
          }

          const jsonData = await response.json();
          setTeachers(jsonData.teachers);

      } catch (error) {
          console.error('Error:', error);
          setTeachers([]); // Set courses to an empty array on error
      }
  };

  useEffect(() => {
      if (token) {
          getTeachers();
      }
  }, [token]);

  const columns = [
    { header: "ID", accessor: "idTeacher" },
    { header: "Name", accessor: "firstName" },
    { header: "Username", accessor: "username" },
    { header: "Speacialization", accessor: "specialization" },
    { header: "Age", accessor: "birthDate" },
    { header: "Gender", accessor: "gender" }
  ];


  return (
    <div className="teacher-list">
      <h1 className='letter-spacing-5 mb-4'>Teachers</h1>
      <Table columns={columns} data={teachers} />
    </div>
  );
}

export default TeacherList;
