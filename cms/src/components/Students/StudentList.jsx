import React from 'react';
import Table from '../Table/Table.jsx';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentList() {
  const navigate = useNavigate();
  const [token , setToken] = useState(localStorage.getItem('token'));
  const [role , setRole] = useState(localStorage.getItem('role'));
  const [id , setId] = useState(localStorage.getItem('id'));
  const [students , setStudents] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        navigate('/sign-in');
    } else {
        setToken(storedToken);
    }
}, [navigate]);

  const getStudents = async () => {
      try {
          const response = await fetch(`http://localhost:4200/students`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
          });

          if (!response.ok) {
              throw new Error('Failed to fetch courses');
          }

          const jsonData = await response.json();
          setStudents(jsonData.students);

      } catch (error) {
          console.error('Error:', error);
          setStudents([]); // Set courses to an empty array on error
      }
  };

  useEffect(() => {
      if (token) {
          getStudents();
      }
  }, [token]);

  console.log(students);

  students.forEach(item => {
    item.fullName = `${item.firstName} ${item.lastName}`;
    });
  const columns = [
    { header: "ID", accessor: "idStudent" },
    { header: "Name", accessor: "fullName" },
    { header: "Age", accessor: "birthDate" },
    { header: "Gender", accessor: "gender" },
    { header: "Country", accessor: "country" }
  ];


  return (
    <div className="student-list">
      <h1 className='letter-spacing-5 mb-4'>Students</h1>
      <Table columns={columns} data={students} />
    </div>
  );
}

export default StudentList;
