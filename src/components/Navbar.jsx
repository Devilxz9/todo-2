import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
       <nav className="navbar">
      <h2 className="logo">My Task</h2>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">My Tasks</a></li>
        <li><a href="#">Create Tasks</a></li>
      </ul>
    </nav>
  )
}

export default Navbar