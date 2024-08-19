import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     
      <button className={`sidebar-toggle ${isOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
        <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </button>
      
  
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2 className="sidebar-title">Form Types</h2>
        <nav className="sidebar-nav">
          <Link to="/Devis" className="sidebar-link">Devis</Link>
          <Link to="/Rendezvous" className="sidebar-link">Rendezvous</Link>
          <Link to="/contact" className="sidebar-link">Contact</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

