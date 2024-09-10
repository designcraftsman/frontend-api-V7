import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const ContinentInsights = () => {
  const [token, setToken] = useState('');  
  const [transformedData, setTransformedData] = useState({});

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const getStudentsByContinent = async () => {
    try {
      const response = await fetch(`http://localhost:4200/students/getByContinents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const jsonData = await response.json();
      console.log(jsonData);

      // Calculate the total number of students across all continents
      const totalStudents = jsonData.continentsData.reduce((sum, item) => sum + parseInt(item.student_count, 10), 0);

      // Transform the array into an object and calculate the percentage
      const transformedData = jsonData.continentsData.reduce((acc, item) => {
        const studentCount = parseInt(item.student_count, 10);
        const percentage = ((studentCount / totalStudents) * 100).toFixed(2); // Calculate percentage
        acc[item.continent] = percentage; // Store percentage instead of raw count
        return acc;
      }, {});
      
      setTransformedData(transformedData);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getStudentsByContinent();
    }
  }, [token]);

  return (
    <div className="card mb-4 shadow">
      <div className="card-body">
        <h5 className="card-title">Continent Insights</h5>
        <div>
          {Object.keys(transformedData).map((continent, index) => (
            <div key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>{continent}</span>
                <span>{transformedData[continent]}%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${transformedData[continent]}%` }}
                  aria-valuenow={transformedData[continent]}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinentInsights;
