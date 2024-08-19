import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Msit-forms</h1>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link">Home</Link>
            </li>
            
            <li className="nav-item">
              <Link to="/createForm.js" className="nav-link">CreateForm</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
