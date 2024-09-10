import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ index, title, value, change, activities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [totalRows, setTotalRows] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/sign-in');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const getAssets = async () => {
    try {
      const response = await fetch(`http://localhost:4200/admin/totalRows`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }

      const jsonData = await response.json();
      setTotalRows(jsonData.response);

    } catch (error) {
      console.error('Error:', error);
      setTotalRows({}); // Set totalRows to an empty object on error
    }
  };

  useEffect(() => {
    if (token) {
      getAssets();
    }
  }, [token]);

  console.log(totalRows);

  let color = "";
  let bg = "";

  if (index === 1) {
    color = "text-danger";
    bg = "bg-danger-subtle";
  } else if (index === 2) {
    color = "text-primary";
    bg = "bg-primary-subtle";
  } else if (index === 3) {
    color = "text-success";
    bg = "bg-success-subtle";
  } else if (index === 4) {
    color = "text-warning";
    bg = "bg-warning-subtle";
  }

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const getValueBasedOnIndex = () => {
    switch (index) {
      case 1:
        return totalRows.totalStudents || "N/A";
      case 2:
        return totalRows.totalCourses  || "N/A";
      case 3:
        return totalRows.totalTeachers || "N/A";
      case 4:
        return totalRows.totalAssets || "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <div className={`stat-card bg-light shadow`}>
      <h3 className={`stat-card-title d-flex justify-content-between ${color}`}>
        <div>{title}</div>
        <div>
          {(index === 1) ? (<i className="bi bi-people-fill"></i>) : ""}
          {(index === 2) ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mortarboard" viewBox="0 0 16 16">
              <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
              <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
            </svg>
          ) : ""}
          {(index === 3) ? (<i className="bi bi-person-lines-fill"></i>) : ""}
          {(index === 4) ? (<i className="bi bi-folder-fill"></i>) : ""}
        </div>
      </h3>
      <p className={`stat-card-value ${color}`}>{getValueBasedOnIndex()}</p>
    </div>
  );
};

export default StatCard;
