import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CountryInsights = ({ data }) => {
  const [token, setToken] = useState('');  
  const [transformedData, setTransformedData] = useState({});

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const getStudentsByCountries = async () => {
    try {
      const response = await fetch(`http://localhost:4200/students/getByCountries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students by countries');
      }
      const jsonData = await response.json();
      console.log(jsonData);

      // Calculate the total number of students across all countries
      const totalStudents = jsonData.countriesData.reduce((sum, item) => sum + parseInt(item.student_count, 10), 0);

      // Group countries with the same name and calculate the percentage
      const countryGroups = jsonData.countriesData.reduce((acc, item) => {
        const country = item.country.toLowerCase(); // Convert to lowercase to ensure case insensitivity
        const studentCount = parseInt(item.student_count, 10);
        
        if (!acc[country]) {
          acc[country] = 0;
        }
        
        acc[country] += studentCount; // Sum student counts for countries with the same name
        
        return acc;
      }, {});

      // Calculate percentage for each country group
      const transformedData = Object.keys(countryGroups).reduce((acc, country) => {
        const percentage = ((countryGroups[country] / totalStudents) * 100).toFixed(2); // Calculate percentage
        acc[country] = percentage;
        return acc;
      }, {});

      setTransformedData(transformedData);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getStudentsByCountries();
    }
  }, [token]);

  return (
    <div className="card mb-4 shadow">
      <div className="card-body">
        <h5 className="card-title">Country Insights</h5>
        <div>
          {Object.keys(transformedData).map((country, index) => (
            <div key={index} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>{country.charAt(0).toUpperCase() + country.slice(1)}</span> {/* Capitalize country name */}
                <span>{transformedData[country]}%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${transformedData[country]}%` }}
                  aria-valuenow={transformedData[country]}
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

export default CountryInsights;
