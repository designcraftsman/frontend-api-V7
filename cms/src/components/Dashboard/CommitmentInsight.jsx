import {useState, useEffect} from 'react';

const CommitmentInsight = () => {

  const [token, setToken] = useState('');  
  const [transformedData, setTransformedData] = useState({
    complete: 0,
    audit: 0,
    uncommitted: 0
  });

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const getCoursesCommitment = async () => {
    try {
      const response = await fetch(`http://localhost:4200/courses/enrolledCourses/commitment`, {
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
      // Assuming the API response structure matches what you want
      setTransformedData({
        complete: jsonData.response.complete || 0,
        audit: jsonData.response.audit || 0,
        uncommitted: jsonData.response.uncommitted || 0,
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getCoursesCommitment();
    }
  }, [token]);

  const total = transformedData.complete + transformedData.audit + transformedData.uncommitted;
  const getPercentage = (value) => {
    return ((value / total) * 100).toFixed(2);
  };

  return (
    <div className="card mb-4 shadow">
      <div className="card-body">
        <h5 className="card-title">Intent</h5>
        <div className="mb-3">
          <p>Committed to Complete: <strong>{transformedData.complete.toLocaleString()}</strong></p>
          <div className="progress mb-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${getPercentage(transformedData.complete)}%`, backgroundColor:"#6b2b99" }}
              aria-valuenow={getPercentage(transformedData.complete)}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <p>Committed to Audit: <strong>{transformedData.audit.toLocaleString()}</strong></p>
          <div className="progress mb-3">
            <div
              className="progress-bar "
              role="progressbar"
              style={{ width: `${getPercentage(transformedData.audit)}%` , backgroundColor:"#ab78cf"}}
              aria-valuenow={getPercentage(transformedData.audit)}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <p>Uncommitted: <strong>{transformedData.uncommitted.toLocaleString()}</strong></p>
          <div className="progress mb-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${getPercentage(transformedData.uncommitted)}%` , backgroundColor:"#c6aae6"}}
              aria-valuenow={getPercentage(transformedData.uncommitted)}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentInsight;
