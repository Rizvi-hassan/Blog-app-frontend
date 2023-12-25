import React from 'react'
import Navbar from './Navbar'


const Header = () => {


    return (
        <div className="header">
            <Navbar/>
            <div className="content-main">
                <i className="fa-solid fa-quote-right" style={{color:'white'}}></i>
                <div className="content-quote">
                Insights about my personal and work life, and the in-betweens
                </div>
                <div className="content-author"> &#8213; Author name</div>
            </div>
        </div>
    )
}

export default Header
