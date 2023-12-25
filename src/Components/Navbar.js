import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext';


const Navbar = () => {
  const context = useContext(userContext);
  const { name } = context;

  const navigate = useNavigate();

  const showHide = () => {
    document.getElementById('name').classList.toggle('show')
  }

  const goToAdd = () => {
    navigate('/add-blog')
  }

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/auth/login');
  }

  return (
    <div className="nav-bar">
      <div className="title">B_LOG</div>
      <div className="links">
        <ul>
          <li><Link className="hover transition" to="/">Home</Link></li>
          <li><Link className="hover transition" to="/personal">Personal Blogs</Link></li>
          {/* <li><Link className="hover transition" to="/">Tutorials</Link></li>
          <li><Link className="hover transition" to="/">About</Link></li> */}
        </ul>
      </div>
      <div className="search-box">
        {!localStorage.getItem('blog-token') ? <>
          <button className="btn-primary transition" onClick={() => navigate('/auth/register')}>Register</button>
          <button className="btn-primary transition" onClick={() => navigate('/auth/login')}>Login</button>
        </> : <>
          <button className="btn-primary transition" onClick={goToAdd}>Add Blog <i className="fa-solid fa-plus icon" style={{ padding: '0' }}></i></button>
          <div className="user" id="user" onClick={showHide}>
            <div className="user-icon"><i className="fa-solid fa-user" style={{ color: 'white', fontSize: '1.5rem' }}></i></div>
            <div className="name" id="name" >{name}
              <button className="btn-danger transition" onClick={handleLogOut} >Logout</button>
            </div>
          </div>
        </>
        }

      </div>
    </div>
  )
}

export default Navbar
