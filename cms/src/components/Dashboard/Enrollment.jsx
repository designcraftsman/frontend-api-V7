import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Enrollment = () => {

  const [token, setToken] = useState('');  
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const getStudentsByContinent = async () => {
    try {
      const response = await fetch(`http://localhost:4200/courses/enrolledCourses/overTime`, {
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
      console.log(jsonData);

      // Assuming jsonData is an array of objects with 'month' and 'enrollments' keys
      const newLabels = jsonData.response.map(item => item.month.trim());
      const newDataPoints = jsonData.response.map(item => item.enrolledcourses);

      setLabels(newLabels);
      setDataPoints(newDataPoints);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getStudentsByContinent();
    }
  }, [token]);

  console.log(labels,dataPoints);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cumulative Enrollment Over Time',
        data: dataPoints,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Enrollment Over Time',
      },
    },
  };

  return (
    <div className="card mb-4 shadow">
      <div className="card-body">
        <h5 className="card-title">Enrollment</h5>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Enrollment;
