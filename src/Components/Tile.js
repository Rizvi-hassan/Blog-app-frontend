import React from 'react'
import {Link} from 'react-router-dom'


const Tile = () => {
  // const navigate = useNavigate();
  
  return (
    <div className="tile">

        <div className="tile-body">
          <div className="content">
            
          <span className="tag">DESIGN TOOLS</span>
            <span className="date">August 13, 2023</span>
            <h3>10 Hilarious Cartoons That Depict Real-Life Problems of Programmers</h3>
            <p className="desc">Redefined the user acquisition and redesigned the onboarding experience, all within 3 working weeks.</p>
            <Link to='/blog-page' className='link'>Read More</Link>
          </div>
          <div className="image">

          </div>
        </div>

      </div>
  )
}

export default Tile
