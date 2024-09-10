import {useState, useEffect} from 'react';
import { useNavigate } from'react-router-dom';
import StatCard from './StatCard';
import BarChart from './BarChart';

import Overview from "./Overview";
import Enrollment from "./Enrollment";
import CommitmentInsight from "./CommitmentInsight";
import ContinentInsights from "./ContinentInsights";
import CountryInsights from "./CountryInsights";
function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/sign-in');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const getStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:4200/admin/coursesCategoriesEnrollment`, {
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
      setStudentData(jsonData.response);

    } catch (error) {
      console.error('Error:', error);
      setStudentData({}); // Set totalRows to an empty object on error
    }
  };

  useEffect(() => {
    if (token) {
      getStudentData();
    }
  }, [token]);

  console.log(studentData);
  const studentActivities = [
    { user: "John Doe", action: "uploaded a new 3D asset.", time: "3m ago" },
    { user: "Jane Smith", action: "enrolled in the Math course.", time: "5m ago" },
    { user: "Alice Johnson", action: "updated the Science course.", time: "10m ago" },
    { user: "Robert Brown", action: "added a new teacher profile.", time: "15m ago" },
  ];

  const stats = [
    { index: 1, title: "Students", value: "1,200", change: "5% increase", activities: studentActivities },
    { index: 2, title: "Courses", value: "50", change: "2% increase", activities: [] },
    { index: 3, title: "Teachers", value: "75", change: "1% increase", activities: [] },
    { index: 4, title: "3D Assets", value: "250", change: "8% increase", activities: [] },
  ];

  const studentDataa = [
    { category: 'Math', students: 200 },
    { category: 'Biology', students: 180 },
    { category: 'Mechanics', students: 220 },
    { category: 'Software', students: 150 },
  ];

  // Data for testing the dashboard components  
  const overViewData ={
    totalLearners:108554 ,
    countries:181,
    emergingEconomies : 49458
  };
  const enroollmentData = {
    labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    dataPoints : [50, 100, 150, 200, 120, 76, 350]
  }
  const commitementData = {
    complete: 120,
    audit: 45,
    uncommitted: 35,
  };
  const continentData = {
    
      "North America": 35,
      "Asia": 34,
      "Europe": 22,
      "South America": 5,
      "Africa": 2,
      "Oceania": 2
    
  };
  const countryData = {
    
    "USA": 35,
    "Canada": 34,
    "Morocco": 12,
    "France": 5,
    "Egypt": 2,
    "Maltas": 2,
    "Croatia": 5,
    "Netherlands": 2,
    "Congo": 5,
    "South Africa": 2,
  
  };
  return (
    <div className="dashboard bg-light">
      <h1 className='letter-spacing-5 mb-4'>DASHBOARD</h1>
      <div className="dashboard-stats d-flex justify-content-between mb-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.index}
            index={stat.index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            activities={stat.activities} 
          />
        ))}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <Overview totalLearners={overViewData.totalLearners} countries={overViewData.countries} emergingEconomies={overViewData.emergingEconomies} />
          </div>
          <div className="col-12 col-md-6">
            <h2>Enrollment</h2>
            <Enrollment labels={enroollmentData.labels} dataPoints={enroollmentData.dataPoints}></Enrollment>
          </div>
          <div className="col-12 col-md-6">
            <h2>Courses by category</h2>
            <div className="dashboard-main d-flex">
              <div className="dashboard-chart w-75">
                <BarChart data={studentData} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h2>Intent</h2>
            <CommitmentInsight complete={commitementData.complete} audit={commitementData.audit} uncommitted={commitementData.uncommitted}></CommitmentInsight>
          </div>
          <div className="col-12 col-md-6">
            <h2>Continents</h2>
            <ContinentInsights data={continentData}></ContinentInsights>
          </div>
          <div className="col-12 col-md-6">
            <h2>Countries</h2>
            <CountryInsights data={countryData}></CountryInsights>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
