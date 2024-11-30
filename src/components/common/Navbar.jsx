import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteName } from '../../res/prop';
import './Navbar.scss';

export default function () {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="nav">
			<div className="logo">{siteName}</div>
			<button className="menu-button" onClick={() => setIsOpen(!isOpen)}>☰</button>
			<div className={`nav-links ${isOpen ? 'open' : ''}`}>
				<Link onClick={() => setIsOpen(false)} to="/">Home</Link>
				<Link onClick={() => setIsOpen(false)} to="/users">Users</Link>
				<Link onClick={() => setIsOpen(false)} to="/login">Login</Link>
				<Link onClick={() => setIsOpen(false)} to="/logout">Logout</Link>
				<Link onClick={() => setIsOpen(false)} to="/setup/user">Register</Link>
			</div>
		</nav>
	);
};