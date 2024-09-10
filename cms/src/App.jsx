import React from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import './App.css'; 
import './css/style.css';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const showSidebar = !location.pathname.endsWith('/sign-in');

  return (
    <div className="container-fluid m-auto" data-bs-theme="light">
      {showSidebar && <Sidebar />}
      <div className='m-auto'>
        <div className={`${showSidebar && "content"} ${!showSidebar && "sign-in-content"}`}>
          <Outlet /> 
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
    </div>
  );
}

export default App;

