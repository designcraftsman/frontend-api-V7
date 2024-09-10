import Table from '../Table/Table.jsx';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseList() {
  const navigate = useNavigate();
  const [token , setToken] = useState(localStorage.getItem('token'));
  const [role , setRole] = useState(localStorage.getItem('role'));
  const [id , setId] = useState(localStorage.getItem('id'));
  const [courses , setCourses] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        navigate('/sign-in');
    } else {
        setToken(storedToken);
    }
}, [navigate]);

  const getCourses = async () => {
      try {
          const response = await fetch(`http://localhost:4200/courses`, {
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
          setCourses(jsonData.courses);

      } catch (error) {
          console.error('Error:', error);
          setCourses([]); // Set courses to an empty array on error
      }
  };

  useEffect(() => {
      if (token) {
          getCourses();
      }
  }, [token]);

  courses.forEach(item => {
    item.fullName = `${item.firstName} ${item.lastName}`;
    });
  const columns = [
    { header: "ID", accessor: "idCourse" },
    { header: "Course Name", accessor: "name" },
    { header: "Instructor", accessor: "fullName" },
    { header: "Category", accessor: "category" },
    { header: "Visibility", accessor: "privacy" }
  ];

  

  return (
    <div className="course-list">
      <h1 className='letter-spacing-5 mb-4'>Courses</h1>
      <Table columns={columns} data={courses} />
    </div>
  );
}

export default CourseList;
