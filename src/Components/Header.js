import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return (
        <div className="header">
            <Navbar/>
            <div className="content-main">
                Insights about my personal and work life, and the in-betweens
            </div>
        </div>
    )
}

export default Header
