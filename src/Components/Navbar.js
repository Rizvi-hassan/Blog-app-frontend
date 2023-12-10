import React from 'react'

const Navbar = () => {
  return (
    <div className="nav-bar">
        <div className="title">B_LOG</div>
        <div className="links">
            <ul>
                <li><a className="hover transition" href="/">Home</a></li>
                <li><a className="hover transition" href="/">Daily updates</a></li>
                <li><a className="hover transition" href="/">Tutorials</a></li>
                <li><a className="hover transition" href="/">About</a></li>
            </ul>
        </div>
        <div className="search-box">
            <button className="btn-primary transition">Subscribe</button>
        </div>
    </div>
  )
}

export default Navbar
