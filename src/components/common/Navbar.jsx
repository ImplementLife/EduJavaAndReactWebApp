import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteName } from '../../res/prop';
import './Navbar.scss';

export default function() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="logo">{siteName}</div>
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>☰</button>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/setup/user">Register</Link>
      </div>
    </nav>
  );
};