// src/components/Sidebar/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Sidebar = () => (
  <div className="sidebar d-flex flex-column h-100">
    <div className="sidebar-logo mt-3">
      <a href="dashboard">
        <img src={logo} alt="logo" style={{ maxWidth: '40px' }} />
        <h2>Immerse CMS</h2>
      </a>
    </div>
    <nav className="sidebar-nav flex-fill">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link" activeClassName="active">
            <i className="bi bi-speedometer2"></i>
            <span className="ms-3">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/courses" className="nav-link" activeClassName="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
              <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/>
              <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z"/>
            </svg>
            <span className="ms-3">Courses</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/students" className="nav-link" activeClassName="active">
            <i className="bi bi-people-fill"></i>
            <span className="ms-3">Students</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teachers" className="nav-link" activeClassName="active">
            <i className="bi bi-person-lines-fill"></i>
            <span className="ms-3">Teachers</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/assets" className="nav-link" activeClassName="active">
            <i className="bi bi-folder-fill"></i>
            <span className="ms-3">Assets</span>
          </NavLink>
        </li>
      </ul>
    </nav>
    <div className="sidebar-signout mt-auto">
      <NavLink to="/sign-out" className="nav-link" activeClassName="active">
        <i className="bi bi-box-arrow-left"></i>
        <span className="ms-3">Sign out</span>
      </NavLink>
    </div>
  </div>
);

export default Sidebar;
