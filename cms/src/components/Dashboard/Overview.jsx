import { useState, useEffect } from 'react';

const Overview = () => {
  const [token, setToken] = useState('');
  const [totalLearners, setTotalLearners] = useState(null);
  const [studentsByCountry, setStudentsByCountry] = useState({});
  const [countriesCount, setCountriesCount] = useState(null);
  const [highestPerformingCountry, setHighestPerformingCountry] = useState(null);

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
        throw new Error('Failed to fetch student data by countries');
      }
      const jsonData = await response.json();
      console.log(jsonData);

      const transformedData = jsonData.countriesData.reduce((acc, item) => {
        acc[item.country] = parseInt(item.student_count, 10);
        return acc;
      }, {});

      setStudentsByCountry(transformedData);
      setTotalLearners(Object.values(transformedData).reduce((sum, count) => sum + count, 0));
      setCountriesCount(Object.keys(transformedData).length);

      // Calculate the highest performing country
      const highestCountry = Object.keys(transformedData).reduce(
        (highest, country) =>
          transformedData[country] > (highest.count || 0)
            ? { name: country, count: transformedData[country] }
            : highest,
        {}
      );

      setHighestPerformingCountry(highestCountry);

    } catch (error) {
      console.error('Error:', error);
      setStudentsByCountry({});
      setTotalLearners(0);
      setCountriesCount(0);
      setHighestPerformingCountry(null);
    }
  };

  useEffect(() => {
    if (token) {
      getStudentsByCountries();
    }
  }, [token]);

  return (
    <div className="card mb-2 shadow mt-2">
      <div className="card-body d-flex flex-row justify-content-between py-4 me-5">
        <h5 className="card-title">Reach</h5>
        <p>Total learners joined: <strong>{totalLearners}</strong></p>
        <p>Different countries: <strong>{countriesCount}</strong></p>
        {highestPerformingCountry && (
          <p>
            Highest performing country: <strong>{highestPerformingCountry.name}</strong> 
            <em> ({Math.round((highestPerformingCountry.count / totalLearners) * 100)}%)</em>
          </p>
        )}
      </div>
    </div>
  );
};

export default Overview;
